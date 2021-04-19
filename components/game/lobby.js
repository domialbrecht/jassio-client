import React from "react";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Lobby
        <div>{this.props.title}</div>
      </div>
    );
  }
}

export default Lobby;
