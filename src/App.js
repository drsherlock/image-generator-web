import React, { useState } from "react";
import { connect } from "react-redux";
import Peer from "peerjs";

import { selectImage, generateImage } from "./actions";

import { usePeer } from "./hooks";

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

  const peer = new Peer();
  const [conn, setConn] = usePeer(peer, setPeerId);

  const connect = () => {
    const connection = peer.connect(peerId);
    setConn(connection);
    connection.on("open", () => {
      connection.on("data", function(data) {
        console.log("Received", data);
      });
      connection.send("hi");
    });
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

  const handleTitleSelect = e => {
    // conn.send(e.target.value);
    setTitle(e.target.value);
  };

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
