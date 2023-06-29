"use client";

import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import { Song } from "@/types/types";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) return onClick(data.id);
    //TODO: turn on player
  };

  return (
    <div className="flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50">
      <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
        <Image src={imageUrl} fill className="object-cover" alt="media image" />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="truncate text-white">{data.title}</p>
        <p className="truncate text-sm text-neutral-400">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
