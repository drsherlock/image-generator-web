import React from "react";

import { SelectFile, SelectColor, SelectTitle, SelectFont } from "./FormFields";

function Options(props) {
  const {
    handleFormSubmit,
    handleFileSelectLocal,
    handleFileSelectPeer,
    titleColor,
    handleTitleColorSelectLocal,
    handleTitleColorSelectPeer,
    title,
    handleTitleSelectPeer,
    handleTitleSelectLocal,
    fonts,
    handleFontsSelectLocal,
    handleFontsSelectPeer
  } = props;

  return (
    <div id="options">
      <form onSubmit={handleFormSubmit}>
        <div id="options-outer">
          <div className="options-inner">
            <SelectFile
              handleFileSelectLocal={handleFileSelectLocal}
              handleFileSelectPeer={handleFileSelectPeer}
            />
          </div>
          <div className="options-inner">
            <SelectColor
              titleColor={titleColor}
              handleTitleColorSelectLocal={handleTitleColorSelectLocal}
              handleTitleColorSelectPeer={handleTitleColorSelectPeer}
            />
          </div>
          <div className="options-inner">
            <SelectTitle
              title={title}
              handleTitleSelectLocal={handleTitleSelectLocal}
              handleTitleSelectPeer={handleTitleSelectPeer}
            />
          </div>
          <div className="options-inner">
            <SelectFont
              fonts={fonts}
              handleFontsSelectLocal={handleFontsSelectLocal}
              handleFontsSelectPeer={handleFontsSelectPeer}
            />
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
