import { useEffect } from "react";
import { usePollChoices } from "../../hooks/queries/usePollChoices";
import { HeroIcon } from "../ui/icons/HeroIcon";

type PollProps = {

    pollId: number;

}

export function Poll ({pollId}: PollProps) {

    const {data: pollChoices} = usePollChoices(pollId);

    useEffect(() => {
        console.log("Poll id is: " + [pollId])
        if (pollChoices) {
            console.log(JSON.stringify(pollChoices))
        }
    }, [pollChoices])

    return (
        <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full z-40 bg-(--background-main) hover:cursor-default hover:bg-(--background-main) h-full flex flex-col gap-2 px-4 pt-4 border border-twitterBorder rounded-2xl`}>

        <div className="flex flex-col w-full gap-4 mb-4">
          { pollChoices && pollChoices.map((choice, index) => (
              <div
                className="w-full flex items-center border border-twitterBorder focus:outline-none focus:ring-0 rounded-xl px-4 h-12"
              >
                <p>{choice.choice}</p>
              </div>  

          ))}
        </div>

        <div>

        </div>


        </div>
    )

}