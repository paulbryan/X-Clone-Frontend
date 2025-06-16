import { useContext, useEffect, useMemo, useState } from "react";
import ProfilePageOverview from "../UserInfo/ProfilePageOverview";
import TabList from "./TabList";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../hooks/queries/CurrentUserProvider";
import Feed from "./Feed";
import { HeaderContentContext } from "../../context/GlobalState/HeaderContentProvider";
import { useUser } from "../../hooks/queries/useUser";

function ProfilePage() {
    const tabs = ["Tweets", "Replies", "Liked", "Media"];
    const [activeTab, setActiveTab] = useState("Tweets");
  
    const { ID } = useParams();
    const pageUserID = Number(ID);
  
    const { currentUser } = useCurrentUser();
    const { setHeaderContent } = useContext(HeaderContentContext);  
    const isOwner = currentUser && currentUser?.id === pageUserID;
  
    const { data: pageUser } = useUser(pageUserID);
  
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
          return isOwner ? currentUser.posts : pageUser.posts;
        case "Replies":
          return isOwner ? currentUser.replies : pageUser.replies;
        case "Liked":
          return isOwner ? currentUser.likedPosts : pageUser.likedPosts;
        case "Media":
          return [];
        default:
          return [];
      }
    }, [activeTab, pageUser, isOwner]);

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