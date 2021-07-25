import React from "react";

function Connect(props) {
  const { peerId, setPeerId, connect } = props;

  return (
    <div id="connect">
      <input
        type="text"
        value={peerId}
        onChange={e => setPeerId(e.target.value)}
        data-testid="my-input"
      />
      <button onClick={() => connect()} type="button" data-testid="my-button">
        Connect
      </button>
    </div>
  );
}

export default Connect;
