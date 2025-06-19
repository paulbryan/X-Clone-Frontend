import { useContext, useEffect, useMemo, useState } from "react";
import TabList from "./TabList";
import { useCurrentUser } from "../../hooks/queries/CurrentUserProvider";
import Feed from "./Feed";
import { HeaderContentContext } from "../../context/GlobalState/HeaderContentProvider";
import { useInfiniteFeed } from "../../hooks/queries/useInfiniteFeed";
import type { FeedType } from "../../types/FeedType";

function HomePage () {

    const tabs : FeedType[] = ["foryou", "following"];
    const [activeTab, setActiveTab] = useState<FeedType>("foryou");
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

        
        <div className="h-full w-full overflow-hidden">
            {currentUser && !isLoading && (
            <div>
                <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>
            )}
            <div className="h-full flex grow w-full overflow-y-auto">
                <Feed fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isLoading={isLoading} isFetchingNextPage={isFetchingNextPage} key={activeTab} postIdsArray={postIds}/>
            </div>
        </div>

    )


}

export default HomePage;