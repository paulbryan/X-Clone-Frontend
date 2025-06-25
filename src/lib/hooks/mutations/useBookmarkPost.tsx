import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../types/Post.ts";
import { API_URL } from "../../../constants/env.ts";

export const useBookmarkPost = (
    postId: number,
    currentUserId: number | undefined,
    {
      onUpdate,
    }: { onUpdate?: (updatedPost: Post) => void } = {}
  ) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({ isBookmarked }: { isBookmarked: boolean }) => {
        const url = isBookmarked
          ? "/api/bookmarks/deleteBookmark"
          : "/api/bookmarks/createBookmark";
  
        const res = await fetch(`${API_URL}${url}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookmarkedBy: currentUserId,
            bookmarkedPost: postId,
          }),
        });
  
        if (!res.ok) throw new Error("Bookmark request failed");
        return await res.json();
      },
  
      onMutate: async ({ isBookmarked }) => {
        await queryClient.cancelQueries({ queryKey: ["post", postId] });
  
        const previous = queryClient.getQueryData<Post>(["post", postId]);
        if (!previous) return { previous: null };
  
        const newBookmarkedBy = isBookmarked
          ? previous.bookmarkedBy.filter((id) => id !== currentUserId)
          : [...previous.bookmarkedBy, currentUserId!];
  
        const optimisticPost: Post = {
          ...previous,
          bookmarkedBy: newBookmarkedBy,
        };
  
        queryClient.setQueryData(["post", postId], optimisticPost);
  
        return { previous };
      },
  
      onError: (_err, _vars, context) => {
        if (context?.previous) {
          queryClient.setQueryData(["post", postId], context.previous);
        }
      },
  
      onSuccess: (updatedPost: Post) => {
        // queryClient.setQueryData(["post", postId], updatedPost);
        onUpdate?.(updatedPost);
        queryClient.invalidateQueries({ queryKey: ["post", postId] });
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      },
    });
  };