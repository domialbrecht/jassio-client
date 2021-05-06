import React from "react";
import { HostSetting, Player } from "./lobby";
import PlayerCard from "./playercard";

type Props = {
  hostSettings: HostSetting;
  players: Player[];
  isHost: boolean;
  joinKey: string;
};
type State = {};
class Waiting extends React.Component<Props, State> {
  state: State = {
    setupComplete: false,
  };
  playerList() {
    return this.props.players.map((p) => <PlayerCard key={p.id} player={p} />);
  }
  openSpots() {
    let rm = 4 - this.props.players.length;
    let r = [];
    for (let index = 0; index < rm; index++) {
      r.push(
        <div key={index} className="flex flex-col items-center">
          <div className="mb-5 flex-grow bg-white w-full rounded-full"></div>
          <div>Läär</div>
        </div>
      );
    }
    return r;
  }
  render() {
    return (
      <div
        className={`w-3/4 mx-auto py-16 h-full flex flex-col justify-between items-center`}
      >
        <div className="">
          <div>Settings 1</div>
          <div>Settings 1</div>
          <div>Settings 1</div>
          <div>Settings 1</div>
        </div>
        <div className="grid grid-cols-4 gap-12">
          {this.playerList()}
          {this.openSpots()}
        </div>
        {this.props.isHost && (
          <div className="flex justify-between w-full">
            <div>
              <span>Iladigslink</span>
              <input
                type="text"
                className="cursor-pointer mt-0 block px-0.5 text-theme-darker text-xl text-center border-0 focus:ring-0 focus:border-white"
                value={this.props.joinKey}
                readOnly
                onClick={() => {
                  navigator.clipboard.writeText(this.props.joinKey);
                }}
              />
            </div>
            <button className="px-8 py-3 text-2xl text-white tracking-widest bg-theme-accent hover:bg-theme-skylight uppercase">
              Starte
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Waiting;
