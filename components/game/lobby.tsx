import React from "react";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
};
type State = {
  setupComplete: boolean;
};
class Lobby extends React.Component<Props, State> {
  state: State = {
    setupComplete: false,
  };
  renderCharacter() {
    return <div>Character</div>;
  }
  renderCreation() {
    return <div>Creation</div>;
  }
  charReady() {
    if (this.state.setupComplete) {
      return this.renderCreation();
    }
    return this.renderCharacter();
  }
  render() {
    return (
      <div>
        Lobby
        <div>{this.charReady()}</div>
      </div>
    );
  }
}

export default Lobby;
