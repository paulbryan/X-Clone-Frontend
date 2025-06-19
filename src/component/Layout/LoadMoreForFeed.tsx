import { useEffect, useState } from "react";
import LoadingIcon from "../UIComponent/LoadingIcon";

type LoadMoreForFeedProps = {
    triggerRef: (node?: Element | null) => void;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
}

export function LoadMoreForFeed ({triggerRef, hasNextPage, isFetchingNextPage}: LoadMoreForFeedProps) {

    const [showEnd, setShowEnd] = useState(false);


      useEffect(() => {
    if (!hasNextPage && !isFetchingNextPage) {
      const timer = setTimeout(() => setShowEnd(true), 300); // wait a bit before showing
      return () => clearTimeout(timer);
    } else {
      setShowEnd(false); // reset if more pages arrive
    }
  }, [hasNextPage, isFetchingNextPage]);

    return  (
      
        <div className="w-full flex flex-col justify-center items-center h-20">
        <div ref={triggerRef} className="h-4 w-full" />
  
        {isFetchingNextPage && (
          <div className="flex justify-center items-center py-2">
            <LoadingIcon />
          </div>
        )}
  
        {showEnd && (
          <p className="border-(--color-main) border px-6 py-2 rounded-2xl">
            End of feed
          </p>
        )}
      </div>

    )

}