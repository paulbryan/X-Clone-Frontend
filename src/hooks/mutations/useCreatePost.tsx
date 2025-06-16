import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewPost } from "../types/NewPost";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPost: NewPost): Promise<void> => {
      const res = await fetch("http://localhost:8080/api/posts/createPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      if (!res.ok) throw new Error("Failed to post");
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["foryoufeed"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      if (variables.parentId) {
        queryClient.invalidateQueries({ queryKey: ["post", variables.parentId] });
      }
    },
  });
};