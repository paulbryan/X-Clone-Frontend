import { useMemo, type MouseEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useCurrentUser } from "../../hooks/queries/CurrentUserProvider";
import { HeroIcon, type IconName } from "../../types/HeroIcon";

type InteractionButtonProps = {
  numberList: number[];
  buttonColor: string;
  mutationFunction:  () => void;
  iconName: IconName;

};

function InteractionButton({ numberList, buttonColor, mutationFunction, iconName }: InteractionButtonProps) {

  const { currentUser } = useCurrentUser();

  const isMarked = useMemo(() => {
    if (!currentUser) return false;
    return numberList.includes(currentUser.id);
  }, [currentUser, numberList]);

  const count = numberList.length;

  const handleMutation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    mutationFunction();
  };

  return (
    <div className="">
    <div className={`h-5 flex w-16 ${isMarked ? "text-" + buttonColor : ""} align-middle items-center gap-3`}>
    <div onClick={(e) => handleMutation(e)}>
      <HeroIcon iconName={iconName} solid={isMarked} className={`h-6 w-6`}/>
    </div>      
    <motion.span
        key={count}
        initial={{ y: isMarked ? -15 : 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: isMarked ? 15 : -15, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {numberList.length}
    </motion.span>
    </div>
    </div>
  )
}

export default InteractionButton;