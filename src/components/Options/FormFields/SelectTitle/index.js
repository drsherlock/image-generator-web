import React from "react";

function SelectTitle(props) {
  const { title, handleTitleSelectPeer, handleTitleSelectLocal } = props;

  return (
    <>
      <div className="options-label">Select your title</div>
      <div id="title">
        <input
          type="text"
          value={title}
          onKeyDown={handleTitleSelectPeer}
          onChange={handleTitleSelectLocal}
          data-testid="input-testid"
        />
      </div>
    </>
  );
}

export default SelectTitle;
