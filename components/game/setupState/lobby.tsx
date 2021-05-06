import React from "react";
import { Socket } from "socket.io-client";
import Waiting from "./waiting";
import Character from "./character";

interface MyProps {
  socket: Socket;
  jkey: string;
}

export enum PlayerColor {
  BLUE = "#abe2f5",
  RED = "#F73859",
}
export type HostSetting = {
  winAmount: number;
  enableWise: boolean;
};
export type Player = {
  id: number;
  name: string;
  color: PlayerColor;
  teamA: boolean;
};

type State = {
  setupComplete: boolean;
  clientIsHost: boolean;
  hostSettings: HostSetting;
  players: Player[];
  joinKey: string;
};

class Lobby extends React.Component<MyProps, State> {
  state: State = {
    setupComplete: false,
    clientIsHost: false,
    joinKey: "",
    hostSettings: {
      winAmount: 1000,
      enableWise: true,
    },
    players: [{ id: 1, name: "Stifu", color: PlayerColor.RED, teamA: true }],
  };
  constructor(props: MyProps) {
    super(props);
    this.state.joinKey = props.jkey;
  }
  createPlayer(n: string) {
    return {
      id: 0,
      name: n,
      color: PlayerColor.BLUE,
      teamA: true,
    };
  }
  handleHost = (myName: string) => {
    let hostPlayer = this.createPlayer(myName);
    let host = "";
    if (typeof window !== "undefined") {
      host = window.location.origin + "/game?key=";
    }
    let key = host + this.makeKey();
    const players = this.state.players.concat(hostPlayer);
    this.setState({
      clientIsHost: true,
      players: players,
      setupComplete: true,
      joinKey: key,
    });
  };
  handleJoin = (myName: string, key: string) => {
    if (key === this.state.joinKey) {
      this.serverConnect(myName);
      return;
    }
    alert("Check key!");
    return;
  };
  renderCharacter() {
    return (
      <Character
        jKey={this.state.joinKey}
        onHost={this.handleHost}
        onJoin={this.handleJoin}
      />
    );
  }
  renderWaiting() {
    return (
      <Waiting
        joinKey={this.state.joinKey}
        isHost={this.state.clientIsHost}
        players={this.state.players}
        hostSettings={this.state.hostSettings}
      />
    );
  }
  charReady() {
    if (!this.state.setupComplete) return this.renderCharacter();
    return this.renderWaiting();
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
  serverConnect(name) {
    let newPlayer = this.createPlayer(myName);
    const players = this.state.players.concat(newPlayer);
    this.setState({ setupComplete: true });
  }
  makeKey() {
    let result = [];
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join("");
  }
}

export default Lobby;
