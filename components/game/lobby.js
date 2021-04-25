import React from "react";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setupComplete: false,
    };
  }

  renderCharacter() {
    return <div>Character</div>;
  }

  renderCreation() {
    return <div>Creation</div>;
  }

  charReady() {
    if (this.state.setupComplete) {
      return this.renderCreation();
    }
    return this.renderCharacter();
  }

  render() {
    return (
      <div>
        Lobby
        <div>{this.charReady()}</div>
      </div>
    );
  }
}

export default Lobby;
