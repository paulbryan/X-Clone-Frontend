import { useEffect } from "react";
import { usePollChoices } from "../../hooks/queries/usePollChoices";
import { HeroIcon } from "../ui/icons/HeroIcon";
import { useHasVoted } from "../../hooks/queries/useHasVoted";
import { useVoteOnPoll } from "../../hooks/mutations/useVoteOnPoll";
import { useCurrentUser } from "../../context/Auth/CurrentUserProvider";

type PollProps = {

    pollId: number;

}

export function Poll ({pollId}: PollProps) {

    const {data: pollChoices} = usePollChoices(pollId);
    const {data: hasVoted} = useHasVoted(pollId);
    const {currentUser} = useCurrentUser()
    const hasAlreadyVoted = hasVoted && hasVoted != -1;
    const voteMutation = useVoteOnPoll(pollId);

    const handleVote = (choiceId: number) => {
      if (!currentUser || hasAlreadyVoted) return;
      voteMutation.mutate({ choiceId });
    };

    useEffect(() => {
        console.log("Poll id is: " + [pollId])
        if (pollChoices) {
            console.log(JSON.stringify(pollChoices))
        }
    }, [pollChoices])



    return (
        <div
        onClick={(e) => {
            if (!hasAlreadyVoted) {
                e.stopPropagation()
            }
        }}
        >

<div className="flex flex-col h-full w-full justify-center gap-2 my-2">
  {pollChoices &&
    (() => {
      const totalVotes = pollChoices.reduce((sum, c) => sum + c.voteCount, 0);

      return pollChoices.map((choice) => {
        const percent =
          totalVotes > 0 ? Math.round((choice.voteCount / totalVotes) * 100) : 0;

        return hasAlreadyVoted ? (
          <div
            key={choice.id}
            className="relative w-full text-sm rounded-xl overflow-hidden  h-12 px-4 flex items-center"
          >
            <div
              className="absolute top-0 left-0 h-full bg-twitterText opacity-20"
              style={{ width: `${percent}%` }}
            />

            <div className="flex text-sm text-twitterText w-full justify-between items-center relative z-10">
              <div className="flex gap-2 items-center">
                <p>{choice.choice}</p>
                {hasVoted === choice.id && (
                  <HeroIcon iconName="CheckCircleIcon" className="w-4 h-4" />
                )}
              </div>
              <p className="">{percent}%</p>
            </div>
          </div>
        ) : (
          <div
            key={choice.id}
            onClick={() => handleVote(choice.id)}
            className="w-full border-2 border-(--color-main) text-sm rounded-4xl h-12 px-4 flex items-center hover:bg-twitterBlue/10 cursor-pointer"
          >
            <p>{choice.choice}</p>
          </div>
        );
      });
    })()}
</div>

        <div>

        </div>


        </div>
    )

}