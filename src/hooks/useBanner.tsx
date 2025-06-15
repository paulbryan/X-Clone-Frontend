import { useQuery } from "@tanstack/react-query";

export const useBanner = (userId: number | undefined) =>
  useQuery({
    queryKey: ["banner", userId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/api/users/getBannerImage?id=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch banner");
      return await res.text();
    },
    enabled: typeof userId === "number" && userId > 0,
    staleTime: 1000 * 60 * 10,
  });