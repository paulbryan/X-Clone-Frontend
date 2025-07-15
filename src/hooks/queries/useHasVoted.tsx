import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../constants/env";

export const useHasVoted = (pollId: number) =>
  useQuery<number>({
    queryKey: ["poll_votes", pollId],
    queryFn: async () => {
      const token = localStorage.getItem("jwt");

      const response = await fetch(`${API_URL}/api/polls/${pollId}/getPollVote`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) throw new Error("Failed to fetch poll vote");
      return response.json();
    },
    enabled: typeof pollId === "number" && pollId > 0,
    staleTime: 1000 * 60 * 5,
  });