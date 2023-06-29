"use client";
import MediaItem from "@/components/MediaItem";
import { Song } from "@/types/types";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
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
            <MediaItem data={item} onClick={() => {}} />
            {/* TODO: Add like button here */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
