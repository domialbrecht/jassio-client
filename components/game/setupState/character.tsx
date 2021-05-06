import React from "react";
type Props = {
  jKey: string;
  onHost: Function;
  onJoin: Function;
};
type State = {
  playerName: string;
  joinKey: string;
};
class Character extends React.Component<Props, State> {
  state: State = {
    playerName: "",
    joinKey: "",
  };
  constructor(props: Props) {
    super(props);
    this.state.joinKey = props.jKey;
  }
  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    let v = e.currentTarget.value;
    if (!v) {
      return;
    }
    this.setState({ playerName: e.currentTarget.value });
  };
  onChangeKey = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ joinKey: e.currentTarget.value });
  };
  onHost = (): void => {
    if (!this.state.playerName) return;
    this.props.onHost(this.state.playerName);
  };
  onJoin = (): void => {
    if (!this.state.playerName) return;
    this.props.onJoin(this.state.playerName, this.state.joinKey);
  };

  render() {
    return (
      <div className="flex items-center justify-between flex-col py-16 h-full">
        <div className="bg-white rounded-3xl h-full mb-6 w-1/2 border-theme-highlight border-4 flex justify-center items-center">
          <span className="text-theme-darker">WIP Avatar apasse</span>
        </div>
        <div className="flex items-center flex-col w-1/2">
          <div className="mb-10">
            <label className="flex flex-col items-center">
              <input
                type="text"
                className="mt-0 block w-full px-0.5 text-xl placeholder-gray-200 text-center border-0 border-b-2 bg-transparent border-theme-highlight focus:ring-0 focus:border-white"
                placeholder="Name igä.."
                value={this.state.playerName}
                onChange={this.onChange}
              />
            </label>
          </div>
          <div className="flex justify-between w-full">
            <div>
              <button
                onClick={this.onHost}
                className="px-8 py-3 text-2xl text-white tracking-widest bg-theme-accent hover:bg-theme-skylight uppercase"
              >
                Host
              </button>
            </div>
            <div className="flex">
              <input
                type="text"
                className="mt-0 block w-full px-0.5 text-theme-darker text-xl text-center border-0 focus:ring-0 focus:border-white"
                value={this.state.joinKey}
                onChange={this.onChangeKey}
              />
              <button
                onClick={this.onJoin}
                className="px-8 py-3 text-2xl text-white tracking-widest bg-theme-highlight hover:bg-theme-contrast uppercase"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Character;
