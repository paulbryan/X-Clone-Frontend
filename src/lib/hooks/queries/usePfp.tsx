import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../../constants/env";

export const usePfp = (userId: number | undefined) => {
  return useQuery<string>({
    queryKey: ["pfp", userId],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/users/getProfilePic?id=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch profile picture");
      return await res.text();
    },
    enabled: typeof userId === "number" && userId > 0,
    staleTime: 1000 * 60 * 10,
  });
};