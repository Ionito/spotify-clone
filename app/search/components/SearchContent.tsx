"use client";
import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types/types";
import { on } from "events";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
        No songs found
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col gap-y-2 px-6">
      {songs.map((item) => (
        <div key={item.id} className="flex w-full items-center gap-x-4">
          <div className="flex-1">
            <MediaItem data={item} onClick={onPlay} />
          </div>
          <LikeButton songId={item.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
