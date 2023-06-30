import { Song } from "@/types/types";
import usePlayer from "./usePlayer";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "./useAuthModal";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const { user } = useUser();
  const authModal = useAuthModal();

  const onPlay = (id: string) => {
    console.log("🚀 ~ file: useOnPlay.ts:12 ~ onPlay ~ id:", id);

    if (!user) {
      authModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
