import React from "react";

function SelectFile(props) {
  const { handleFileSelectLocal, handleFileSelectPeer } = props;

  return (
    <>
      <div className="options-label">Select your file</div>
      <div id="file">
        <input
          type="file"
          onChange={e => {
            handleFileSelectLocal(e);
            handleFileSelectPeer(e);
          }}
          data-testid="file-input-testid"
        />
      </div>
    </>
  );
}

export default SelectFile;
