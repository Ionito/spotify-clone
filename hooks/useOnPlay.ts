import { Song } from "@/types/types";
import usePlayer from "./usePlayer";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "./useAuthModal";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const { user } = useUser();
  const authModal = useAuthModal();

  const onPlay = (id: string) => {
    if (!user) {
      authModal.onOpen();
      return;
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
