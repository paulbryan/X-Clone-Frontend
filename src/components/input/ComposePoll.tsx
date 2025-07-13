import { useState } from "react";
import { HeroIcon } from "../ui/icons/HeroIcon";

type ComposePollProps = {

  pollChoices: string[],
  setPollChoices: React.Dispatch<React.SetStateAction<string[]>>;
  setIsPoll: React.Dispatch<React.SetStateAction<boolean>>;
  
}

export function ComposePoll ({setIsPoll, pollChoices, setPollChoices}: ComposePollProps) {


    const handleChoiceChange = (index: number, value: string) => {
      const updated = [...pollChoices];
      updated[index] = value;
      setPollChoices(updated);
    };

    const addChoice = () => {
      setPollChoices((prev) => [...prev, ""])
    }
    
    const canAddChoice = (index: number) : boolean => pollChoices.length < 4 && index == pollChoices.length - 1;

    return (
        <div className="w-full h-full flex flex-col gap-2 px-4 pt-4 border border-twitterBorder rounded-2xl mb-4">

        <div className="flex flex-col w-full gap-4 mb-4">
          {pollChoices.map((choice, index) => (
            <div className="flex w-full flex-col gap-2">
              <p className="pl-1 text-twitterTextAlt font-bold">
                Choice {index + 1}
              </p>
              <div className="w-full flex gap-2 items-center">

              <input
                value={choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
                className="w-full border border-twitterBorder focus:outline-none focus:ring-0 rounded-xl px-2 h-12"
              />
            <div className="w-16 flex items-center justify-center">
              {canAddChoice(index) && (
                <div onClick={() => addChoice()}>
                    <HeroIcon  iconName="PlusIcon" className="w-8 h-8 color-(--color-main)"/>
                </div>
              )}
            </div>
            </div>

            </div> 

          ))}
        </div>

        <hr className="text-twitterBorder"/>

        <div
        onClick={() => {
          setIsPoll(false)
          setPollChoices(["", ""])
        }}
        className={`hover:cursor-pointer text-red-500 flex items-center gap-2 justify-center h-10 rounded-full`}
      >
        <p className="">Remove Poll</p>
      </div>

        <div>

        </div>


        </div>
    )

}