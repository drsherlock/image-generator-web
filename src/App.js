import React, { useState } from "react";
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
      }
    });
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

  const handleRadioSelect = e => {
    setTitleColor(e.target.value);
  };

  const handleCheckboxSelect = e => {
    if (fonts.includes(e.target.value)) {
      setFonts(fonts.filter(f => f !== e.target.value));
    } else {
      setFonts([...fonts, e.target.value]);
    }
  };

  const availableColors = ["Red", "Blue", "Green"];
  const availableFonts = ["BebasNeue-Regular", "JuliusSansOne-Regular"];

  return (
    <>
      <header>Image Generator</header>
      <section id="app">
        <div id="options">
          <form onSubmit={handleFormSubmit}>
            <h4>Select your file:</h4>
            <div id="file">
              <input type="file" onChange={handleFileSelect} />
            </div>

            <br />

            <h4>Select your title:</h4>
            <div id="title">
              <input type="text" value={title} onChange={handleTitleSelect} />
            </div>

            <br />

            <h4>Please select your color:</h4>
            {availableColors.map(c => (
              <div id="radio">
                <label>
                  <input
                    type="radio"
                    value={c}
                    checked={titleColor === c}
                    onChange={handleRadioSelect}
                    key={c}
                  />
                  {c}
                </label>
              </div>
            ))}

            <br />

            <h4>Select your font:</h4>
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

            <br />

            <input type="submit" value="Submit" />
          </form>
        </div>

        <div id="image">
          {fileSrc ? <img src={fileSrc} alt="your image" /> : null}
        </div>
      </section>
      <footer>Copyright &copy; 2021 drsherlock</footer>
    </>
  );
}

export default App;
