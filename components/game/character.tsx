import React from "react";
type Props = {
  characterName: string;
  onConfirm: Function;
  onNameSet: Function;
};
type State = {};
class Character extends React.Component<Props, State> {
  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.props.onNameSet(e.currentTarget.value);
  };

  onClick = (e: React.FormEvent<HTMLButtonElement>): void => {
    this.props.onConfirm();
  };

  render() {
    return (
      <div className="flex items-center justify-between flex-col py-16 h-full">
        <div className="bg-white rounded-3xl h-full mb-6 w-1/2 border-theme-highlight border-4 flex items-center">
          Character Visualizer
        </div>
        <div className="flex items-center flex-col">
          <div className="mb-10">
            <label className="flex flex-col items-center">
              <span className="text-3xl mb-5">Name igä</span>
              <input
                type="text"
                className="mt-0 block w-full px-0.5 text-xl text-center border-0 border-b-2 bg-transparent border-theme-highlight focus:ring-0 focus:border-white"
                value={this.props.characterName}
                onChange={this.onChange}
              />
            </label>
          </div>
          <button
            onClick={this.onClick}
            className="px-8 py-3 text-2xl text-white tracking-widest bg-theme-highlight hover:bg-theme-contrast uppercase"
          >
            Witer
          </button>
        </div>
      </div>
    );
  }
}

export default Character;
