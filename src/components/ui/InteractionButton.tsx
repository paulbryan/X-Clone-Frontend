import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCurrentUser } from "../../context/Auth/CurrentUserProvider.tsx";
import { HeroIcon, type IconName } from "./HeroIcon.tsx";
import { InteractionCounter } from "./InteractionCounter.tsx";
import { useModal } from "../../context/GlobalState/ModalProvider.tsx";

type InteractionButtonProps = {
  numberList: number[];
  buttonColor: string;
  mutationFunction:  () => void;
  iconName: IconName;

};

function InteractionButton({ numberList, buttonColor, mutationFunction, iconName }: InteractionButtonProps) {

  const { currentUser } = useCurrentUser();
  const {setModalType} = useModal();

  const canInteract = !!currentUser;

  const isMarked = useMemo(() => {
    if (!currentUser) return false;
    if (buttonColor == "notAColor") {
      return false;
    }
    return numberList.includes(currentUser.id);
  }, [currentUser, numberList]);

  const count = numberList.length;

  const handleMutation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (canInteract) {
      mutationFunction();
    } else {
      setModalType("signup")
    }
  };

  //TODO add hover on icon

  return (
    <div className="">
    <div className={`h-5 flex w-16 hover:cursor-pointer ${isMarked ? "text-" + buttonColor : ""} align-middle items-center gap-3`}>
    <div 
    onClick={(e) => handleMutation(e)}
    >
      <HeroIcon iconName={iconName} solid={isMarked} className={`h-6 w-6`}/>
    </div>      
    <InteractionCounter count={count}/>
    </div>
    </div>
  )
}

export default InteractionButton;