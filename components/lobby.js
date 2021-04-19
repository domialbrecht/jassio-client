import React from "react";
import { io } from "socket.io-client";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER, {
      autoConnect: false,
    });
  }

  componentDidMount() {
    this.socket.connect();
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return <div>Chat</div>;
  }
}

export default Lobby;
