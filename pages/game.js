import Head from "next/head";
import Link from "next/link";
import React from "react";
import Lobby from "../components/game/lobby";
import { io } from "socket.io-client";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER, {
      autoConnect: false,
    });
    this.test = "Test";
  }
  componentWillUnmount() {
    this.socket.disconnect();
  }
  render() {
    return (
      <div className="game fullscreen">
        <Head>
          <title>Game</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <header>
          <Link href="/">Home</Link>
        </header>
        <div>
          <h1>Game</h1>
          <Lobby title={this.test} socket={this.socket} />
        </div>
      </div>
    );
  }
}
