import React from "react";
import Waiting from "./waiting";
import Character from "./character";
import socket from "../../..//lib/socket";

interface MyProps {
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
  self: boolean;
  id: string;
  name: string;
  teamRed: boolean;
};

type State = {
  setupComplete: boolean;
  clientIsHost: boolean;
  hostSettings: HostSetting;
  players: Player[];
  joinKey: string;
  nameInput: string;
};

class Lobby extends React.Component<MyProps, State> {
  state: State = {
    setupComplete: false,
    clientIsHost: false,
    joinKey: "",
    nameInput: "",
    hostSettings: {
      winAmount: 1000,
      enableWise: true,
    },
    players: [],
  };
  constructor(props: MyProps) {
    super(props);
    this.state.joinKey = props.jkey;
  }
  handleHost = (myName: string) => {
    this.setState({
      clientIsHost: true,
      nameInput: myName,
    });
    this.serverConnect(myName, true, "");
  };
  handleJoin = (myName: string, key: string) => {
    if (key) {
      this.setState({
        nameInput: myName,
      });
      this.serverConnect(myName, false, key);
      return;
    }
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
  serverConnect(username: string, host: boolean, key: string) {
    socket.auth = { username, host, key };
    socket.connect();
  }
  componentDidMount() {
    socket.on("hosted", (key: string) => {
      this.setState({
        joinKey: window.location.origin + "/game?key=" + key,
        setupComplete: true
      });
    });
    socket.on("players", (players) => {
      let newPlayers: Player[] = this.state.players.concat(
        players.map((p: { id: any; name: any; }, i: number) => {
          return {
            self: p.id == p.id,
            id: p.id,
            name: p.name,
            teamRed: i > 1,
          }
        })
      )
      this.setState({
        players: newPlayers,
      });
    });
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        this.setState({
          nameInput: "",
          players: []
        });
      }
    });
  }
}

export default Lobby;
