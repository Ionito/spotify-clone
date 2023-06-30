"use client";
import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "../hooks/usePlayer";
import useLoadSong from "@/hooks/useLoadSong";
import PlayerContent from "./PlayerContent";

interface PlayerProps {}

const Player: React.FC<PlayerProps> = ({}) => {
  const player = usePlayer();
  const { isLoading, song } = useGetSongById(player.activeId);
  const songUrl = useLoadSong(song);

  if (!song || !songUrl || !player.activeId) return null;

  return (
    <div className="fixed bottom-0 h-[80px] w-full bg-black px-4 py-2">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
