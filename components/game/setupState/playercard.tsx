import { Player } from "./lobby";
import PlayerAvatar from "./playerAvatar";

type PlayerProps = {
  player: Player;
};

const PlayerCard = ({ player }: PlayerProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-5">
        <PlayerAvatar player={player} />
      </div>
      <div className="text-2xl uppercase">{player.name}</div>
    </div>
  );
};

export default PlayerCard;
