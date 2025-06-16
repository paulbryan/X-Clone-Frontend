import { useMutation } from "@tanstack/react-query";
import type { NewPost } from "../types/NewPost";
import type { Post } from "../types/Post";


export const useCreatePost = () => {
  return useMutation({
    mutationFn: async (newPost: NewPost): Promise<Post[]> => {
      if (newPost.text.length <= 1 || newPost.text.length >= 180) {
        throw new Error("Invalid input");
      }

      const res = await fetch("http://localhost:8080/api/posts/createPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) throw new Error("Failed to post");

      return await res.json();
    },
  });
};