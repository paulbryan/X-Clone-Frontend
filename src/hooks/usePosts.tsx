import { useQuery } from "@tanstack/react-query";
import type { Post } from "../types/Post";

const fetchPosts = async (ids: number[]): Promise<Post[]> => {
  const res = await fetch("http://localhost:8080/api/posts/getPost", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ids),
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return await res.json();
};

export const usePosts = (ids: number[], enabled: boolean = true) =>
  useQuery({
    queryKey: ["posts", ids],
    queryFn: () => fetchPosts(ids),
    enabled: enabled && ids.length > 0,
    staleTime: 1000 * 60 * 5,
  });