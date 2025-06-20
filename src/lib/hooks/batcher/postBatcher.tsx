import { create, windowScheduler } from "@yornaath/batshit";
import type { Post } from "../../types/Post.ts";

export const postBatcher = create<Post, number>({
  fetcher: async (ids: number[]) => {
    const res = await fetch("http://localhost:8080/api/posts/getPosts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids),
    });

    if (!res.ok) throw new Error("Failed to fetch posts");
    return await res.json();
  },

  resolver: (results, id) => {
    if (!Array.isArray(results)) {
      throw new Error("Expected array of posts");
    }
    const match = results.find((p) => p.id === id);
    if (!match) throw new Error("Post not found for id: " + id);
    return match;
  },

  scheduler: windowScheduler(10),
});