import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../constants/env.ts";
import type { PollChoice } from "../../types/PollChoice.ts";

export const useVoteOnPoll = (
  pollId: number,
  choiceId: number,
  { onUpdate }: { onUpdate?: (updatedPollChoices: PollChoice[]) => void } = {}
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({  }: { hasVoted: boolean }) => {
      const url = "/api/polls/submit-vote";

      const token = localStorage.getItem("jwt");

      const res = await fetch(`${API_URL}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ pollId: pollId }),
      });

      if (!res.ok) throw new Error("Like toggle failed");
      return await res.json();
    },

    onMutate: async ({ hasVoted }) => {
      await queryClient.cancelQueries({ queryKey: ["poll_votes", pollId] });
      queryClient.setQueryData(["poll_votes", pollId], choiceId);

      return { hasVoted };
    },

    onError: (_err, _vars) => {
        queryClient.setQueryData(["poll_votes", pollId], 0);
    },

    onSuccess: (updatedPollChoices) => {
      onUpdate?.(updatedPollChoices);
      queryClient.invalidateQueries({ queryKey: ["poll_choices", pollId] });
      queryClient.invalidateQueries({ queryKey: ["poll_votes", pollId] });
    }

    });
};
