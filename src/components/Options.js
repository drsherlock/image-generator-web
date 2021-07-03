import React from "react";
import { HexColorPicker } from "react-colorful";

import { availableFonts } from "../availableFonts";

function Options(props) {
  const {
    handleFormSubmit,
    handleFileSelect,
    titleColor,
    setTitleColor,
    title,
    handleTitleSelectPeer,
    handleTitleSelectLocal,
    fonts,
    handleCheckboxSelect
  } = props;

  return (
    <div id="options">
      <form onSubmit={handleFormSubmit}>
        <div id="options-outer">
          <div className="options-inner">
            <div className="options-label">Select your file</div>
            <div id="file">
              <input type="file" onChange={handleFileSelect} />
            </div>
          </div>
          <div className="options-inner">
            <div className="options-label">Select your color</div>
            <HexColorPicker color={titleColor} onChange={setTitleColor} />
            <br />
          </div>
          <div className="options-inner">
            <div className="options-label">Select your title</div>
            <div id="title">
              <input
                type="text"
                value={title}
                onKeyDown={handleTitleSelectPeer}
                onChange={handleTitleSelectLocal}
              />
            </div>
          </div>
          <div className="options-inner">
            <div className="options-label">Select your font</div>
            {availableFonts.map(f => (
              <div id="checkbox">
                <label>
                  <input
                    type="checkbox"
                    value={f.key}
                    checked={fonts.includes(f.key)}
                    onChange={handleCheckboxSelect}
                    key={f.key}
                  />{" "}
                  {f.name}
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
  );
}

export default Options;
