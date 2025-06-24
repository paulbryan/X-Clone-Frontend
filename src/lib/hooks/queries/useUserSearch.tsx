import { useQuery } from "@tanstack/react-query";

export function useUserSearch(query: string) {
  return useQuery({
    queryKey: ["userSearch", query],
    queryFn: async () => {
      if (!query) return [];
      const res = await fetch(`http://localhost:8080/api/users/searchUsers?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    enabled: !!query,
    staleTime: 1000 * 10,
  });
}