import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../constants/env";

export const useChoiceVote = (pollId: number) =>
    useQuery<number>({
      queryKey: ["poll_votes", pollId],
      queryFn: async () => {
        const response = await fetch(`${API_URL}/api/polls/${pollId}/getPollVote`);
        if (!response.ok) throw new Error("Failed to fetch poll vote");
        return response.json();
      },
      enabled: typeof pollId === "number" && pollId > 0,
      staleTime: 1000 * 60 * 5,
    });