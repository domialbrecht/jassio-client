import Head from "next/head";
import Link from "next/link";
import React from "react";
import Lobby from "../../components/game/setupState/lobby";
import Board from "../../components/game/gameState/board";
import { io, Socket } from "socket.io-client";

interface myProps {}
type GameState = {
  gameRunning: boolean;
  jkey: string;
};

class Game extends React.Component<myProps, GameState> {
  state: GameState = {
    gameRunning: false,
    jkey: "",
  };
  socket: Socket;
  constructor(props: myProps) {
    super(props);
    if (typeof window !== "undefined") {
      const key = new URLSearchParams(window.location.search).get("key");
      if (key && typeof key === "string") {
        this.state.jkey = key;
      }
    }
    this.socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER, {
      autoConnect: false,
    });
  }
  componentWillUnmount() {
    this.socket.disconnect();
  }
  gameState() {
    if (this.state.gameRunning) {
      return <Board socket={this.socket} />;
    }
    return <Lobby jkey={this.state.jkey} socket={this.socket} />;
  }
  render() {
    return (
      <div className="game fullscreen relative h-screen">
        <Head>
          <title>Game</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <header className="absolute h-10 bg-theme-dark w-full flex items-center px-5 justify-between text-white">
          <Link href="/">Leave</Link>
          <Link href="/">INFO</Link>
        </header>
        <div className="pt-10 px-5 h-full">{this.gameState()}</div>
      </div>
    );
  }
}
export default Game;
