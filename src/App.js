import React, { useState } from "react";
import { connect } from "react-redux";

import { selectImage, generateImage } from "./actions";

import Options from "./components/Options";
import Image from "./components/Image";

import "./App.css";

function App(props) {
  const { onImageSelect, onImageGenerate, imageId, images } = props;
  const [title, setTitle] = useState("");
  const [titleColor, setTitleColor] = useState("");
  const [fonts, setFonts] = useState([]);
  const [fileSrc, setFileSrc] = useState(null);

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
