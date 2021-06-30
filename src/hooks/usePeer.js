import { useState, useEffect } from "react";

function usePeer(peer, setPeerId) {
  const [conn, setConn] = useState(null);

  useEffect(() => {
    peer.on("open", id => {
      console.log("connected: ", id);
      setPeerId(id);
    });

    peer.on("connection", connection => {
      setConn(connection);
      connection.on("data", data => {
        console.log("Received", data);
      });
      connection.on("open", () => {
        connection.send("hello!");
      });
    });
  }, [setPeerId]);

  return [conn, setConn];
}

export default usePeer;
