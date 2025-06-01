import { createContext, useContext, useState } from "react";
import type {ReactNode} from "react";

type FeedContextType = {
    forYouFeedIds: number[];
    addToForYouFeedIds: (id: number) => void;
    getForYouFeedIds: () => void;
  };

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const FeedProvider = ({ children }: { children: ReactNode }) => {
    
    const [forYouFeedIds, setForYouFeedIds] = useState<number[]>([]);

    function addToForYouFeedIds (id: number) {

        setForYouFeedIds([...forYouFeedIds, id])

    }

    function getForYouFeedIds () {

        fetch(`http://localhost:8080/api/posts/getAllPostIds`)
        .then(res => res.json())
        .then(data => {
            setForYouFeedIds(data);
        })

    }

    return (
      <FeedContext.Provider value={{forYouFeedIds, addToForYouFeedIds, getForYouFeedIds}}>
        {children}
      </FeedContext.Provider>
    );
  };
  
  export const useFeedContext = () => {
    const context = useContext(FeedContext);
    if (!context) throw new Error("useFeedContext must be used within a FeedProvider");
    return context;
  };