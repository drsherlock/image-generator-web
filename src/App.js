import React, { useState, useEffect, useCallback, useRef } from "react";
import { connect } from "react-redux";
import Peer from "peerjs";
import Automerge from "automerge";

import {
  selectImage,
  setImageId,
  generateImage,
  updateLocalState
} from "./actions";

import * as am from "./am";

import Options from "./components/Options";
import Image from "./components/Image";
import Connect from "./components/Connect";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { CHARACTERS } from "./keyMap";

import "./App.css";

function App(props) {
  const {
    onImageSelect,
    onImageGenerate,
    onImageIdReceive,
    onLocalStateChange,
    imageId,
    images,
    localState
  } = props;
  const [title, setTitle] = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const [titleColor, setTitleColor] = useState("");
  const [fonts, setFonts] = useState([]);
  const [fileSrc, setFileSrc] = useState(null);

  const [peerId, setPeerId] = useState("");
  const [conn, setConn] = useState(null);

  const peer = new Peer();

  const refValue = useRef(localState);
  useEffect(() => {
    refValue.current = localState;
  }, [localState]);

  useEffect(() => {
    peer.on("open", id => {
      setPeerId(id);
    });

    peer.on("connection", connection => {
      setConn(connection);
      connection.on("open", () => {
        // connection.send("hello!");
        connection.on("data", onData);
      });
    });
  }, []);

  useEffect(() => {
    if (conn) {
      const newState = am.change(localState, "Update image id", s => {
        s.imageId = imageId;
      });
      handleNewState(newState);
    }
  }, [imageId]);

  const connect = () => {
    const connection = peer.connect(peerId);
    setConn(connection);
    connection.on("open", () => {
      alert("Connected!");
      connection.on("data", onData);
      // connection.send("hi");
      const state = am.change(localState, "Initial Update", s => {
        s.title = new Automerge.Text();
        s.fonts = [];
        s.titleColor = "";
        s.fileSrc = null;
        s.imageId = "";
      });
      onLocalStateChange(state);
      connection.send(JSON.stringify(am.getAllChanges(state)));
    });
  };

  const onData = changes => {
    const newState = am.applyChanges(refValue.current, JSON.parse(changes));
    onLocalStateChange(newState);

    setTitle(newState.title.toString());
    setCursorPos(newState.title.length);
    setFonts(newState.fonts);
    setTitleColor(newState.titleColor);
    setFileSrc(newState.fileSrc);
    onImageIdReceive(newState.imageId);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    const request = {
      fileId: imageId,
      title: title,
      titleColor: titleColor,
      fonts: fonts
    };

    onImageGenerate(request);
    // const url = window.URL.createObjectURL(new Blob([response.data]));
    // const link = document.createElement("a");
    // link.href = url;
    // link.setAttribute("download", `${fileId}.zip`); //or any other extension
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
  };

  const handleTitleSelectPeer = useCallback(
    e => {
      if (conn) {
        const newState = am.change(localState, "Update title", s => {
          if (e.key === "Backspace") {
            s.title.deleteAt(cursorPos - 1);
            setCursorPos(cursorPos - 1);
          } else if (CHARACTERS.includes(e.key)) {
            s.title.insertAt(cursorPos, e.key);
            setCursorPos(cursorPos + 1);
          } else if (e.key === "ArrowLeft") {
            setCursorPos(Math.max(cursorPos - 1, 0));
          } else if (e.key === "ArrowRight") {
            setCursorPos(Math.min(cursorPos + 1, s.title.length));
          }
        });
        handleNewState(newState);
      }
    },
    [localState, conn, title, cursorPos]
  );

  // useEffect(() => {
  //   console.log("loc-", cursorPos);
  // }, [cursorPos]);

  const handleTitleSelectLocal = useCallback(e => {
    setTitle(e.target.value);
  }, []);

  const handleFileSelectLocal = async e => {
    const file = e.target.files[0];
    if (file.size / 1024 > 5120) {
      alert("Maximum file size exceeded");
      return;
    }

    const onloadend = reader => () => {
      const base64data = reader.result;
      setFileSrc(base64data);
    };
    handleBlob(file, onloadend);

    const request = new FormData();
    request.append("image", file);

    onImageSelect(request);
  };

  const handleFileSelectPeer = async e => {
    if (conn) {
      const file = e.target.files[0];

      const onloadend = reader => () => {
        const base64data = reader.result;
        const newState = am.change(localState, "Update file", s => {
          s.fileSrc = base64data;
        });
        handleNewState(newState);
      };
      handleBlob(file, onloadend);
    }
  };

  const handleBlob = (file, onloadend) => {
    const blob = new Blob([file], { type: file.type });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = onloadend(reader);
  };

  const handleFontsSelectLocal = e => {
    if (fonts.includes(e.target.value)) {
      setFonts(fonts.filter(f => f !== e.target.value));
    } else {
      setFonts([...fonts, e.target.value]);
    }
  };

  const handleFontsSelectPeer = e => {
    if (conn) {
      const newState = am.change(localState, "Update fonts", s => {
        if (s.fonts.includes(e.target.value)) {
          s.fonts = fonts.filter(f => f !== e.target.value);
        } else {
          s.fonts = [...fonts, e.target.value];
        }
      });
      handleNewState(newState);
    }
  };

  const handleTitleColorSelectLocal = c => {
    setTitleColor(c);
  };

  const handleTitleColorSelectPeer = c => {
    if (conn) {
      const newState = am.change(localState, "Update title color", s => {
        s.titleColor = c;
      });
      handleNewState(newState);
    }
  };

  const handleNewState = newState => {
    const changes = am.getChanges(localState, newState);
    conn.send(JSON.stringify(changes));
    onLocalStateChange(newState);
  };

  const handleMouseClick = e => {
    console.log(e.target);
  };

  return (
    <>
      <Header />
      <section id="app">
        <Options
          handleFormSubmit={handleFormSubmit}
          handleFileSelectLocal={handleFileSelectLocal}
          handleFileSelectPeer={handleFileSelectPeer}
          titleColor={titleColor}
          handleTitleColorSelectLocal={handleTitleColorSelectLocal}
          handleTitleColorSelectPeer={handleTitleColorSelectPeer}
          title={title}
          handleTitleSelectPeer={handleTitleSelectPeer}
          handleTitleSelectLocal={handleTitleSelectLocal}
          fonts={fonts}
          handleFontsSelectLocal={handleFontsSelectLocal}
          handleFontsSelectPeer={handleFontsSelectPeer}
        />

        <Image
          fileSrc={fileSrc}
          images={images}
          handleMouseClick={handleMouseClick}
        />
      </section>
      <Connect peerId={peerId} setPeerId={setPeerId} connect={connect} />
      <Footer />
    </>
  );
}

const mapStateToProps = state => {
  return {
    imageId: state.image.imageId,
    images: state.image.images,
    localState: state.automerge.localState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onImageSelect: request => {
      dispatch(selectImage(request));
    },
    onImageIdReceive: id => {
      dispatch(setImageId(id));
    },
    onImageGenerate: request => {
      dispatch(generateImage(request));
    },
    onLocalStateChange: state => {
      dispatch(updateLocalState(state));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
