import React, { useState } from "react";
import axios from "axios";

import { config } from "./config";

import Options from "./components/Options";
import Image from "./components/Image";

import "./App.css";

function App(props) {
  const [fileId, setFileId] = useState(null);
  const [title, setTitle] = useState("");
  const [titleColor, setTitleColor] = useState("");
  const [fonts, setFonts] = useState([]);
  const [fileSrc, setFileSrc] = useState(null);
  const [images, setImages] = useState([]);

  const handleFormSubmit = async e => {
    e.preventDefault();

    const request = {
      fileId: fileId,
      title: title,
      titleColor: titleColor,
      fonts: fonts
    };

    const response = await axios.post(`${config.API}/generate`, request, {
      headers: {
        "Content-Type": "application/json"
      }
      // responseType: "blob"
    });
    setImages(response.data.images);
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

    setImages([]);
    setFileSrc(URL.createObjectURL(file));

    let formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(`${config.API}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    setFileId(response.data.id.toString());
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

export default App;
