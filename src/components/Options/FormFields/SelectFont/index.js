import React from "react";

import { availableFonts } from "./availableFonts";

function SelectFont(props) {
  const { fonts, handleFontsSelectLocal, handleFontsSelectPeer } = props;

  return (
    <>
      <div className="options-label">Select your font</div>
      {availableFonts.map(f => (
        <div id="checkbox" key={f.key}>
          <label>
            <input
              type="checkbox"
              value={f.key}
              checked={fonts.includes(f.key)}
              onChange={e => {
                handleFontsSelectLocal(e);
                handleFontsSelectPeer(e);
              }}
            />{" "}
            {f.name}
          </label>
        </div>
      ))}
    </>
  );
}

export default SelectFont;
