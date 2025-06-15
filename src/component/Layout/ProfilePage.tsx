import { useContext, useEffect, useMemo, useState } from "react";
import ProfilePageOverview from "../UserInfo/ProfilePageOverview";
import TabList from "./TabList";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../hooks/CurrentUserProvider";
import type { User } from "../../types/User";
import { useUserCache } from "../../context/cache/UserCacheProvider";
import Feed from "./Feed";
import { useFeedContext } from "../../context/feed/FeedContext";
import { HeaderContentContext } from "../../context/misc/HeaderContentProvider";
import { useUser } from "../../hooks/useUser";

function ProfilePage() {
    const tabs = ["Tweets", "Replies", "Liked", "Media"];
    const [activeTab, setActiveTab] = useState("Tweets");
  
    const { ID } = useParams();
    const pageUserID = Number(ID);
  
    const { currentUser } = useCurrentUser();
    const { setHeaderContent } = useContext(HeaderContentContext);
    const { currentUserPostsIds, currentUserLikedIds, currentUserReplies } = useFeedContext();
  
    const isOwner = currentUser?.id === pageUserID;
  
    const { data: pageUser, isLoading } = useUser(pageUserID);
  
    useEffect(() => {
      if (pageUser) {
        setHeaderContent(
          <div className="flex flex-col gap-0.5 justify-center w-full">
            <p>{pageUser.displayName}</p>
            <div className="flex items-center gap-1 text-sm text-(--twitter-text)">
              <p>{pageUser.posts.length}</p>
              <p>Posts</p>
            </div>
          </div>
        );
      }
    }, [pageUser]);
  
    const postIdsToRender = useMemo(() => {
      if (!pageUser) return [];
  
      switch (activeTab) {
        case "Tweets":
          return isOwner ? currentUserPostsIds : pageUser.posts;
        case "Replies":
          return isOwner ? currentUserReplies : pageUser.replies;
        case "Liked":
          return isOwner ? currentUserLikedIds : pageUser.likedPosts;
        case "Media":
          return []; // implement when media supported
        default:
          return [];
      }
    }, [activeTab, pageUser, isOwner, currentUserPostsIds, currentUserLikedIds, currentUserReplies]);

    return (
        <div className="flex flex-col h-full w-full flex-grow overflow-y-auto">
            <ProfilePageOverview  pageUser={pageUser}/>

            <div className="">
                <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            <div className="mb-14">
                <Feed showAsMainPost={true} key={activeTab} postIdsArray={postIdsToRender} />
            </div>        
        </div>
    );
}

export default ProfilePage;