import { useEffect, useState, type ReactNode } from "react";
import { useCurrentUser } from "../Context/CurrentUserProvider";

type InteractionButtonProps = {
  children: ReactNode;
  checkOfIds?: number[]; 
  postId: number;
  numberList: number[];

};

function InteractionButton({ children, checkOfIds, postId, numberList }: InteractionButtonProps) {

  const {currentUser} = useCurrentUser();
  const [isMarked, setIsMarked] = useState<boolean>(currentUser && checkOfIds && checkOfIds.includes(postId) ? true : false); 




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

  if (isMarked) {
    return (
      <div>
      <div className="h-5 flex text-(--color-main) w-16 align-middle items-center gap-2">
        {children}
        <p className="align-middle">{numberList.length}</p>
      </div>
      </div>
    );
  } else {
    return (
      <div className="h-5 flex w-16 align-middle items-center gap-2">
        {children}
        <p className="align-middle">{numberList.length}</p>
      </div>
    );
  }
}

export default InteractionButton;