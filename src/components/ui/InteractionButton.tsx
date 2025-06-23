import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCurrentUser } from "../../context/Auth/CurrentUserProvider.tsx";
import { HeroIcon, type IconName } from "./HeroIcon.tsx";

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

  const [prevCount, setPrevCount] = useState(numberList.length);
  const [move, setMove] = useState(0);

  useEffect(() => {
    const newCount = numberList.length;
    const diff = newCount > prevCount ? -15 : 15;
    setMove(diff);
    setPrevCount(newCount);
  }, [numberList.length]);

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

        <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={numberList.length}
          initial={{ y: move, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -move, opacity: 0 }}
          transition={{ type: "spring", stiffness: 600, damping: 40 }}
          className="block text-sm"
        >
          {numberList.length}
        </motion.span>
      </AnimatePresence>
    </div>
    </div>
  )
}

export default InteractionButton;