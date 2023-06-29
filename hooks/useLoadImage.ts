import { Song } from "@/types/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (song: Song) => {
  const supabase = useSupabaseClient();

  if (!song.image_path || !song) {
    return "/images/default-song-cover.jpg";
  }

  const { data: imageData } = supabase.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;
