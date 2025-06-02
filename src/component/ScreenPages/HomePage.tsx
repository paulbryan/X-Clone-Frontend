import { useEffect, useState } from "react";
import MainFeed from "../Feed";
import TabList from "../TabList";
import { useCurrentUser } from "../Context/CurrentUserProvider";
import Feed from "../Feed";
import { useFeedContext } from "../Context/FeedContext";

function HomePage () {

    const tabs = ["For You", "Following"];
    const [activeTab, setActiveTab] = useState("For You");
    const {currentUser} = useCurrentUser();
    const {forYouFeedIds, getForYouFeedIds} = useFeedContext();

    return (

        
        <div className="h-full w-full overflow-hidden mb-14">
            {currentUser && (
            <div>
                <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>
            )}
            <div className="h-full flex grow w-full overflow-y-auto">
                <Feed postIdsArray={forYouFeedIds}/>
            </div>
        </div>

    )


}

export default HomePage;