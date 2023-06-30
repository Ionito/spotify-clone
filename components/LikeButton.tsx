"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  const handleClick = async () => {
    if (!user) {
      authModal.onOpen();
      return;
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient
        .from("liked_songs")
        .insert({ user_id: user.id, song_id: songId });
      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Song added!");
      }
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (data && !error) {
        setIsLiked(true);
      }
    };
    fetchData();
  }, [songId, supabaseClient, user]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div>
      <button className="transition hover:opacity-75" onClick={handleClick}>
        <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
      </button>
    </div>
  );
};

export default LikeButton;
