import { useQuery } from "@tanstack/react-query";
import type { Notification } from "../types/Notification";

export const useNotifications = (userId: number | undefined) =>
  useQuery<Notification[]>({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/api/notifications/getAllNotifications/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch notifications");
      return await res.json();
    },
    enabled: typeof userId === "number" && userId > 0,
    staleTime: 1000 * 60,
  });