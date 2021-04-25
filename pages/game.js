import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "../styles/game.module.css";
import Lobby from "../components/game/lobby";
import Board from "../components/game/Board";
import { io } from "socket.io-client";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameRunning: false,
    };
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
        <header className="absolute h-10 bg-theme-chroma w-full flex items-center px-5 justify-between text-white">
          <Link href="/">Leave</Link>
          <Link href="/">Infos</Link>
        </header>
        <div className="pt-10 px-5">{this.gameState()}</div>
      </div>
    );
  }
}
