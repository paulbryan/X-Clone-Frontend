import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../../constants/env";

export const useMarkNotificationsAsSeen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      const res = await fetch(`${API_URL}/api/notifications/markAsSeen/${userId}`);
      if (!res.ok) throw new Error("Failed to mark as seen");
    },
    onSuccess: (_data, userId) => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    },
  });
};