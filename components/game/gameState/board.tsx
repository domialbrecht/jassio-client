import React from "react";
import styles from "../../../styles/game/board.module.css";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
};
type State = {};
class Board extends React.Component<Props, State> {
  state: State = {};
  render() {
    return (
      <div className={styles.gameContainer}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default Board;
