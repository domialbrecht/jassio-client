import React from "react";
import styles from "../../../styles/game/board.module.css";

type Props = {

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
