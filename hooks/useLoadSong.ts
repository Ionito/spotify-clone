import { Song } from "@/types/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSong = (song?: Song) => {
  const supabase = useSupabaseClient();

  if (!song || !song.song_path) {
    return undefined;
  }

  const { data: songData } = supabase.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return songData.publicUrl;
};

export default useLoadSong;
