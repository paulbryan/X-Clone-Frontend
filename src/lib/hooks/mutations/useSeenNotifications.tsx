import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../../constants/env.ts";

export const useUnseenNotificationIds = (userId?: number) => {
  return useQuery<number[]>({
    queryKey: ["unseenNotifications", userId],
    queryFn: async () => {
        const res = await fetch(`${API_URL}/api/notifications/unseenIds/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch unseen notifications");
        return res.json();
    },
    enabled: !!userId,
    staleTime: 1000 * 30,
  });
};