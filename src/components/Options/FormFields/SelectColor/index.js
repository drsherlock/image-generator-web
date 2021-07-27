import React from "react";
import { HexColorPicker } from "react-colorful";

function SelectColor(props) {
  const {
    titleColor,
    handleTitleColorSelectLocal,
    handleTitleColorSelectPeer
  } = props;

  return (
    <>
      <div className="options-label">Select your color</div>
      <HexColorPicker
        color={titleColor}
        onChange={c => {
          handleTitleColorSelectLocal(c);
          handleTitleColorSelectPeer(c);
        }}
        data-testid="color-picker-testid"
      />
      <br />
    </>
  );
}

export default SelectColor;
