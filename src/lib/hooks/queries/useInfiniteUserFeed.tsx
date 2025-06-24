import { useInfiniteQuery } from "@tanstack/react-query";

type UserPage = {
  users: number[];
  nextCursor: number | null;
};

export function useInfiniteUsers() {
  return useInfiniteQuery<UserPage, Error>({
    queryKey: ["discoverUsers"],
    queryFn: async ({ pageParam = null }) => {
      const res = await fetch(`/api/users/discover?cursor=${pageParam ?? ""}&limit=10`);
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
  });
}