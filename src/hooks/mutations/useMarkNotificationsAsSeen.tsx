import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMarkNotificationsAsSeen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      const res = await fetch(`http://localhost:8080/api/notifications/markAsSeen/${userId}`);
      if (!res.ok) throw new Error("Failed to mark as seen");
    },
    onSuccess: (_data, userId) => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    },
  });
};