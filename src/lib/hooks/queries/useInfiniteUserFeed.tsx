import { useInfiniteQuery } from "@tanstack/react-query";
import { API_URL } from "../../../constants/env";

type UserPage = {
  users: number[];
  nextCursor: number | null;
};

export function useInfiniteUsers() {
  return useInfiniteQuery<UserPage, Error>({
    queryKey: ["discoverUsers"],
    queryFn: async ({ pageParam = 9999 }) => {
      const res = await fetch(`${API_URL}/api/users/getDiscoverFeed?cursor=${pageParam ?? ""}&limit=10`);
      if (!res.ok) throw new Error("Failed to fetch users");

      const result = await res.json();
      console.log("Got user feed:", result);
      return result;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 9999,
  });
}


