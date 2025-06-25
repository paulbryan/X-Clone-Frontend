import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../../constants/env";

export const useBanner = (userId: number | undefined) =>
  useQuery({
    queryKey: ["banner", userId],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/users/getBannerImage?id=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch banner");
      return await res.text();
    },
    enabled: typeof userId === "number" && userId > 0,
    staleTime: 1000 * 60 * 10,
  });