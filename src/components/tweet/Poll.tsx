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
        >

        <div className="flex flex-col w-full hover:cursor-default gap-2 mb-4">
          { pollChoices && pollChoices.map((choice, index) => (
              <div
                className="w-full flex items-center hover:cursor-pointer hover:bg-(--color-main)/10 border-2 border-(--color-main) focus:outline-none focus:ring-0 rounded-4xl px-4 h-12"
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