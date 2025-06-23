import { act, useContext, useEffect, useMemo, useState } from "react";
import ProfilePageOverview from "./ProfilePageOverview.tsx";
import TabList from "../TabList.tsx";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../../../context/Auth/CurrentUserProvider.tsx";
import Feed from "../../feed/Feed.tsx";
import { HeaderContentContext } from "../../../../context/GlobalState/HeaderContentProvider.tsx";
import { useUser } from "../../../../lib/hooks/queries/useUser.tsx";
import { useInfiniteFeed } from "../../../../lib/hooks/queries/useInfiniteFeed.tsx";
import type { FeedType } from "../../../../lib/types/FeedType.ts";

function ProfilePage() {
    const tabs : FeedType[] = ["Tweets", "Replies", "Liked", "Media"];
    const [activeTab, setActiveTab] = useState<FeedType>("Tweets");
  
    const { ID } = useParams();
    const pageUserID = Number(ID);
  
    const { currentUser } = useCurrentUser();
    const { setHeaderContent } = useContext(HeaderContentContext);  
    const isOwner = currentUser && currentUser?.id === pageUserID;
  
    const { data: pageUser } = useUser(pageUserID);

    const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
    } = useInfiniteFeed (activeTab, pageUser?.id);

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
      if (pageUser) {
        setHeaderContent(
          <div className="flex flex-col gap-0.5 justify-center w-full">
            <p>{pageUser.displayName}</p>
            <div className="flex items-center gap-1 text-sm text-twitterTextAlt">
              <p>{pageUser.posts.length}</p>
              <p>Posts</p>
            </div>
          </div>
        );
      }
    }, [pageUser]);
  

    return (
        <div className="flex flex-col h-full w-full flex-grow overflow-y-auto">
            <ProfilePageOverview  pageUser={pageUser}/>

            <div className="">
                <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            <div className="mb-14">
                <Feed userId={pageUser?.id} isLoading={isLoading} key={activeTab} postIdsArray={postIds} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} tabType={activeTab}/>
            </div>        
        </div>
    );
}

export default ProfilePage;