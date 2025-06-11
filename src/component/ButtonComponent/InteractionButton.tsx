import { useEffect, useState, type ReactNode } from "react";
import { useCurrentUser } from "../../context/currentUser/CurrentUserProvider";
import { motion } from "framer-motion";

type InteractionButtonProps = {
  children: ReactNode;
  checkOfIds?: number[]; 
  postId: number;
  numberList: number[];
  buttonColor: string;

};

function InteractionButton({ children, checkOfIds, postId, numberList, buttonColor }: InteractionButtonProps) {

  const {currentUser} = useCurrentUser();
  const [isMarked, setIsMarked] = useState<boolean>(currentUser && checkOfIds && checkOfIds.includes(postId) ? true : false); 
  const [previousCount, setPreviousCount] = useState(numberList.length);




  useEffect(() => {

    if (currentUser && checkOfIds) {

      console.log("Checking marked " + JSON.stringify(checkOfIds))

      if (checkOfIds.includes(postId)) {
        setIsMarked(true);
      } else {
        setIsMarked(false);
      }

    }

  }, [currentUser, checkOfIds, postId])

  useEffect(() => {
    setPreviousCount(numberList.length);
  }, [numberList.length]);

  const countChanged = numberList.length !== previousCount;
  const direction = numberList.length > previousCount ? -15 : 15;

  if (isMarked) {
    return (
      <div>
      <div className={`h-5 flex text-${buttonColor} w-16 align-middle items-center gap-3`}>
      {children}
      <motion.span
        key={numberList.length}
        initial={{ y: direction, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -direction, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {numberList.length}
      </motion.span>
      </div>
      </div>
    );
  } else {
    return (
      <div className="h-5 flex w-16 align-middle items-center gap-3">
        {children}
        <motion.span
        key={numberList.length}
        initial={{ y: direction, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -direction, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {numberList.length > 0 ? (
          <>
          {numberList.length}
          </>
        ) : (
          ""
        )}
      </motion.span>
      </div>
    );
  }
}

export default InteractionButton;