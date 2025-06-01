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
    const dummyIds : number[] = [0, 0, 0, 0, 0];

    useEffect(() => {
        if (forYouFeedIds.length < 1) {
            getForYouFeedIds()
        }
    }, [])

    return (

        
        <div className="h-full w-full overflow-hidden mb-14">
            {currentUser && (
            <div>
                <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>
            )}
            <div className="h-full flex grow w-full overflow-y-auto">
                {forYouFeedIds.length > 0 && (
                    <Feed postIdsArray={forYouFeedIds}/>
                )}
            </div>
        </div>

    )


}

export default HomePage;