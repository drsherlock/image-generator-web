import React from "react";

function Connect(props) {
  const { peerId, setPeerId, connect } = props;

  return (
    <div id="connect">
      <input
        type="text"
        value={peerId}
        onChange={e => setPeerId(e.target.value)}
        data-testid="input-testid"
      />
      <button
        onClick={() => connect()}
        type="button"
        data-testid="button-testid"
      >
        Connect
      </button>
    </div>
  );
}

export default Connect;
