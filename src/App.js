import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import axios from "axios";

import { config } from "./config";

import "./App.css";

function App(props) {
  const [fileId, setFileId] = useState(null);
  const [title, setTitle] = useState("");
  const [titleColor, setTitleColor] = useState("");
  const [fonts, setFonts] = useState([]);
  const [fileSrc, setFileSrc] = useState(null);

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
      },
      responseType: "blob"
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileId}.zip`); //or any other extension
    document.body.appendChild(link);
    link.click();
    link.remove();
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

    let formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(`${config.API}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    setFileId(response.data.fileId.toString());
  };

  const handleCheckboxSelect = e => {
    if (fonts.includes(e.target.value)) {
      setFonts(fonts.filter(f => f !== e.target.value));
    } else {
      setFonts([...fonts, e.target.value]);
    }
  };

  const availableFonts = ["BebasNeue-Regular", "JuliusSansOne-Regular"];

  return (
    <>
      <header>Image Generator</header>
      <section id="app">
        <div id="options">
          <form onSubmit={handleFormSubmit}>
            <div id="options-outer">
              <div className="options-inner">
                <div className="options-label">Select your file:</div>
                <div id="file">
                  <input type="file" onChange={handleFileSelect} />
                </div>
              </div>
              <div className="options-inner">
                <div className="options-label">Select your color:</div>
                <HexColorPicker color={titleColor} onChange={setTitleColor} />

                <br />
              </div>
              <div className="options-inner">
                <div className="options-label">Select your title:</div>
                <div id="title">
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleSelect}
                  />
                </div>
              </div>
              <div className="options-inner">
                <div className="options-label">Select your font:</div>
                {availableFonts.map(f => (
                  <div id="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={f}
                        checked={fonts.includes(f)}
                        onChange={handleCheckboxSelect}
                        key={f}
                      />{" "}
                      {f}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="options-inner">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>

        <div id="image">
          {fileSrc ? <img src={fileSrc} alt="uploaded file" /> : null}
        </div>
      </section>
      <footer>Copyright &copy; 2021 drsherlock</footer>
    </>
  );
}

export default App;
