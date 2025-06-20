import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../types/Post.ts";

export const useLikePost = (
  postId: number,
  currentUserId: number | undefined,
  {
    onUpdate,
  }: { onUpdate?: (updatedPost: Post) => void } = {}
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ isLiked }: { isLiked: boolean }) => {
      const url = isLiked
        ? "/api/likes/deleteLike"
        : "/api/likes/createLike";


      const res = await fetch(`http://localhost:8080${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likerId: currentUserId, likedPostId: postId }),
      });

      if (!res.ok) throw new Error("Like toggle failed");
      return await res.json();
    },

    onMutate: async ({ isLiked }) => {
      await queryClient.cancelQueries({ queryKey: ["post", postId] });

      const previous = queryClient.getQueryData<Post>(["post", postId]);
      if (!previous) return { previous: null };

      const newLikedBy = isLiked
        ? previous.likedBy.filter(id => id !== currentUserId)
        : [...previous.likedBy, currentUserId!];

        console.log("Current post Likes is: " + JSON.stringify(previous.likedBy))

      const optimisticPost: Post = {
        ...previous,
        likedBy: newLikedBy,
      };

      console.log("Optimistic post Likes is: " + JSON.stringify(optimisticPost.likedBy))


      queryClient.setQueryData(["post", postId], optimisticPost);
      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["post", postId], context.previous);
      }
    },

    onSuccess: (updatedPost) => {
      onUpdate?.(updatedPost);
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};