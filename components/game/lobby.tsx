import React from "react";
import { Socket } from "socket.io-client";
import Creation from "./creation";
import Character from "./character";

export type HostSetting = {
  winAmount: number;
  enableWise: boolean;
};
type Props = {
  socket: Socket;
};
type State = {
  setupComplete: boolean;
  hostSettings: HostSetting;
  characterName: string;
};
class Lobby extends React.Component<Props, State> {
  state: State = {
    setupComplete: false,
    hostSettings: {
      winAmount: 1000,
      enableWise: true,
    },
    characterName: "",
  };
  handleNameSet = (name: string) => {
    this.setState({ characterName: name });
  };
  handleNameConfirm = () => {
    this.setState({ setupComplete: true });
  };
  renderCharacter() {
    return (
      <Character
        characterName={this.state.characterName}
        onConfirm={this.handleNameConfirm}
        onNameSet={this.handleNameSet}
      />
    );
  }
  renderCreation() {
    return (
      <Creation
        hostSettings={this.state.hostSettings}
        characterName={this.state.characterName}
      />
    );
  }
  charReady() {
    if (!this.state.setupComplete) return this.renderCharacter();
    return this.renderCreation();
  }
  render() {
    return (
      <div className="flex items-center h-full relative">
        <div className="absolute w-16 h-16 bg-theme-contrast top-20"></div>
        <div className="absolute w-16 h-16 bg-theme-deep right-0 top-80"></div>
        <div className="absolute w-16 h-16 bg-theme-contrast bottom-80"></div>
        <div className="absolute w-16 h-16 bg-theme-deep right-0 bottom-20"></div>
        <div
          className="container bg-theme-dark text-white h-4/5 mx-auto"
          style={{ borderRadius: "40px" }}
        >
          {this.charReady()}
        </div>
      </div>
    );
  }
}

export default Lobby;
