import { act, useContext, useEffect, useMemo, useState } from "react";
import TabList from "./TabList.tsx";
import { useCurrentUser } from "../../../context/Auth/CurrentUserProvider.tsx";
import Feed from "../feed/Feed.tsx";
import { HeaderContentContext } from "../../../context/GlobalState/HeaderContentProvider.tsx";
import { useInfiniteFeed } from "../../../lib/hooks/queries/useInfiniteFeed.tsx";
import type { FeedType } from "../../../lib/types/FeedType.ts";
import ComposeTweet from "../../input/ComposeTweet.tsx";

function HomePage () {

    const tabs : FeedType[] = ["For You", "Following"];
    const [activeTab, setActiveTab] = useState<FeedType>("For You");
    const {currentUser} = useCurrentUser();
    const {setHeaderContent} = useContext(HeaderContentContext);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
      } = useInfiniteFeed (activeTab, currentUser?.id);
      
      const postIds = useMemo(() => {
        const seen = new Set<number>();
        return data?.pages.flatMap((page) =>
          page.posts.filter((id) => {
            if (seen.has(id)) return false;
            seen.add(id);
            return true;
          })
        ) ?? [];
      }, [data]);

      

    useEffect(() => {
        setHeaderContent(null);
    }, [])

    return (

        
        <div className="h-full w-full flex flex-col overflow-x-wrap lg:border-x border-twitterBorder">
            {currentUser && (
            <div className="h-fit">
                <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>
            )}
            <div className="h-full flex flex-col grow w-full scrollbar-blue overflow-y-scroll">
                {currentUser && (
                  <div className="hidden lg:flex lg:w-full">
                    <ComposeTweet />
                  </div>
                )}
                <Feed tabType={activeTab} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isLoading={isLoading} isFetchingNextPage={isFetchingNextPage} key={activeTab} postIdsArray={postIds}/>
            </div>
        </div>

    )


}

export default HomePage;