import { useQuery } from "@tanstack/react-query";

export const useForYouFeedIds = () =>
  useQuery<number[]>({
    queryKey: ["foryoufeed"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8080/api/posts/getAllPostIds");
      if (!res.ok) throw new Error("Failed to fetch feed IDs");
      return await res.json();
    },
    staleTime: 1000 * 60,
  });