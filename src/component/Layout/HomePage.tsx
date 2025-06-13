import { useContext, useEffect, useState } from "react";
import MainFeed from "./Feed";
import TabList from "./TabList";
import { useCurrentUser } from "../../context/currentUser/CurrentUserProvider";
import Feed from "./Feed";
import { useFeedContext } from "../../context/feed/FeedContext";
import { HeaderContentContext } from "../../context/misc/HeaderContentProvider";

function HomePage () {

    const tabs = ["For You", "Following"];
    const [activeTab, setActiveTab] = useState("For You");
    const {currentUser} = useCurrentUser();
    const {forYouFeedIds, getForYouFeedIds} = useFeedContext();
    const {setHeaderContent} = useContext(HeaderContentContext);

    useEffect(() => {
        setHeaderContent(null);
    }, [])

    useEffect(() => {
        getForYouFeedIds()
    }, [])

    return (

        
        <div className="h-full w-full overflow-hidden">
            {currentUser && (
            <div>
                <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>
            )}
            <div className="h-full flex grow w-full overflow-y-auto mb-14">
                <Feed key={activeTab} postIdsArray={forYouFeedIds}/>
            </div>
        </div>

    )


}

export default HomePage;