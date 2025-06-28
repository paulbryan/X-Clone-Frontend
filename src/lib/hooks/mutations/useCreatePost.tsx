import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../../constants/env";
import { updateFirstPageFeed } from "./mutationHelpers/updateFirstPageFeed";

export const useCreatePost = (

  currentUserId: number | undefined,
  parentId?: number
) => {

  if (!currentUserId) return;

  const queryClient = useQueryClient();

  return useMutation({

    
    mutationFn: async (formData: FormData): Promise<number> => {
      const res = await fetch(`${API_URL}/api/posts/createPost`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to post");

      const result = await res.json();
      return result.id;

    },

    onSuccess: (newPostId, _variables) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      const isReply = !!parentId;

      if (isReply) {
        queryClient.invalidateQueries({ queryKey: ["post", parentId] });

        updateFirstPageFeed({
          queryClient,
          action: "Replies",
          currentUserId,
          postId: newPostId,
          isRemoving: false,
        });
      } else {
        ["For You", "Tweets"].forEach((feedType) => {
          updateFirstPageFeed({
            queryClient,
            action: feedType,
            currentUserId,
            postId: newPostId,
            isRemoving: false,
          });
        });
      }
    },
  });
};