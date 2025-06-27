import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../constants/env";

export const useTopFiveUsers = () => {
  return useQuery<number[]>({
    queryKey: ["topFiveUsers"],
    queryFn: async () => {
        const res = await fetch(`${API_URL}/api/users/getTopFiveUsers`);
        if (!res.ok) throw new Error("Failed to fetch unseen notifications");
        return res.json();
    },
    enabled: true,
    staleTime: 1000 * 30,
  });
};