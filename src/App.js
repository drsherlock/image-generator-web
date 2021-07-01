import React, { useState, useEffect, useCallback, useRef } from "react";
import { connect } from "react-redux";
import Peer from "peerjs";
import Automerge from "automerge";

import { selectImage, generateImage } from "./actions";

import Options from "./components/Options";
import Image from "./components/Image";
import Connect from "./components/Connect";

import "./App.css";

function App(props) {
  const { onImageSelect, onImageGenerate, imageId, images } = props;
  const [title, setTitle] = useState("");
  const [titleColor, setTitleColor] = useState("");
  const [fonts, setFonts] = useState([]);
  const [fileSrc, setFileSrc] = useState(null);

  const [peerId, setPeerId] = useState("");
  const [conn, setConn] = useState(null);

  const peer = new Peer();

  const [localState, setLocalState] = useState(Automerge.init());

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

  const connect = () => {
    const connection = peer.connect(peerId);
    setConn(connection);
    connection.on("open", () => {
      connection.on("data", onData);
      // connection.send("hi");
      const state = Automerge.change(
        localState,
        "Initial Update",
        s => (s.title = new Automerge.Text())
      );
      setLocalState(state);
      connection.send(JSON.stringify(Automerge.getAllChanges(state)));
    });
  };

  const onData = useCallback(
    changes => {
      let newState = Automerge.applyChanges(
        refValue.current,
        JSON.parse(changes)
      );
      setLocalState(newState);
      setTitle(newState.title.toString());
      // let finalState = Automerge.merge(localState, peerState);
    },
    [localState]
  );

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

  const handleTitleSelect = useCallback(
    e => {
      const newState = Automerge.change(localState, "Update title", s => {
        s.title.insertAt(localState.title.length, e.key);
      });
      let changes = Automerge.getChanges(localState, newState);
      conn.send(JSON.stringify(changes));
      setLocalState(newState);
      setTitle(title + e.key);
    },
    [localState, conn]
  );

  const handleFileSelect = async e => {
    const file = e.target.files[0];
    if (file.size / 1024 > 5120) {
      alert("Maximum file size exceeded");
      return;
    }

    setFileSrc(URL.createObjectURL(file));

    let request = new FormData();
    request.append("image", file);

    onImageSelect(request);
  };

  const handleCheckboxSelect = e => {
    if (fonts.includes(e.target.value)) {
      setFonts(fonts.filter(f => f !== e.target.value));
    } else {
      setFonts([...fonts, e.target.value]);
    }
  };

  const handleMouseClick = e => {
    console.log(e.target);
  };

  return (
    <>
      <header>Image Generator</header>
      <section id="app">
        <Options
          handleFormSubmit={handleFormSubmit}
          handleFileSelect={handleFileSelect}
          titleColor={titleColor}
          setTitleColor={setTitleColor}
          title={title}
          handleTitleSelect={handleTitleSelect}
          fonts={fonts}
          handleCheckboxSelect={handleCheckboxSelect}
        />

        <Image
          fileSrc={fileSrc}
          images={images}
          handleMouseClick={handleMouseClick}
        />
      </section>
      <Connect peerId={peerId} setPeerId={setPeerId} connect={connect} />
      <footer>Copyright &copy; 2021 drsherlock</footer>
    </>
  );
}

const mapStateToProps = state => {
  return {
    imageId: state.imageId,
    images: state.images
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onImageSelect: request => {
      dispatch(selectImage(request));
    },
    onImageGenerate: request => {
      dispatch(generateImage(request));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
