import { useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useCurrentUser } from "../../hooks/queries/CurrentUserProvider";

type InteractionButtonProps = {
  children: ReactNode;
  numberList: number[];
  buttonColor: string;

};

function InteractionButton({ children, numberList, buttonColor }: InteractionButtonProps) {

  const { currentUser } = useCurrentUser();

  const isMarked = useMemo(() => {
    if (!currentUser) return false;
    return numberList.includes(currentUser.id);
  }, [currentUser, numberList]);

  const count = numberList.length;


  if (isMarked) {
    return (
      <div className="">
      <div className={`h-5 flex text-${buttonColor} w-16 align-middle items-center gap-3`}>
      {children}
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
    );
  } else {
    return (
      <div className="h-5 flex w-16 align-middle items-center gap-3">
        {children}
        <motion.span
          key={count}
          initial={{ y: isMarked ? -15 : 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: isMarked ? 15 : -15, opacity: 0 }}
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