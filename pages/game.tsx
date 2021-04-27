import Head from "next/head";
import Link from "next/link";
import React from "react";
import Lobby from "../components/game/lobby";
import Board from "../components/game/board";
import { io, Socket } from "socket.io-client";

type Props = {};
type GameState = {
  gameRunning: boolean;
};

export default class Game extends React.Component<Props, GameState> {
  state: GameState = {
    gameRunning: false,
  };
  socket: Socket;
  constructor(props: Props) {
    super(props);
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
    return <Lobby socket={this.socket} />;
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
