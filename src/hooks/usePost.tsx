// hooks/usePost.ts
import { useQuery } from "@tanstack/react-query";
import { postBatcher } from "./batcher/postBatcher";

export const usePost = (id: number) =>
  useQuery({
    queryKey: ["post", id],
    queryFn: () => postBatcher.fetch(id),
    enabled: typeof id === "number" && id > 0,
    staleTime: 1000 * 60 * 5,
  });