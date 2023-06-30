import { Song } from "@/types/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayer from "../hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => {
      setIsPlaying(true);
    },
    onend: () => {
      setIsPlaying(false);
    },
    onpause: () => {
      setIsPlaying(false);
    },
    format: ["mp3"],
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  useEffect(() => {
    sound?.play();

    return () => sound?.unload();
  }, [sound]);

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const toggleMute = () => {
    if (volume !== 0) {
      setVolume(0);
    } else {
      setVolume(1);
    }
  };

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    } else {
      const currentIndex = player.ids.findIndex((id) => id === player.activeId);
      const nextSong = player.ids[currentIndex + 1];

      if (!nextSong) {
        return;
      } else {
        player.setId(nextSong);
      }
    }
  };

  const onPlayPrev = () => {
    if (player.ids.length === 0) {
      return;
    } else {
      const currentIndex = player.ids.findIndex((id) => id === player.activeId);
      const prevSong = player.ids[currentIndex - 1];

      if (!prevSong) {
        return;
      } else {
        player.setId(prevSong);
      }
    }
  };

  return (
    <div className="grid h-full grid-cols-2 md:grid-cols-3 ">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="col-auto flex w-full items-center justify-end md:hidden">
        <div
          onClick={togglePlay}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="hidden h-full w-full max-w-[722px] flex-row items-center justify-center gap-x-6 md:flex">
        <AiFillStepBackward
          onClick={onPlayPrev}
          size={30}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
        />
        <div
          onClick={togglePlay}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
        />
      </div>
      <div className="hidden w-full justify-end md:flex">
        <div className="flex w-[120px] items-center gap-x-2">
          <VolumeIcon
            className="cursor-pointer"
            onClick={toggleMute}
            size={30}
          />
          <Slider
            onChange={(newVol: number) => {
              setVolume(newVol);
            }}
            value={volume}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
