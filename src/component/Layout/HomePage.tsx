import { useContext, useEffect, useState } from "react";
import MainFeed from "./Feed";
import TabList from "./TabList";
import { useCurrentUser } from "../../hooks/CurrentUserProvider";
import Feed from "./Feed";
import { useFeedContext } from "../../context/feed/FeedContext";
import { HeaderContentContext } from "../../context/misc/HeaderContentProvider";
import { useForYouFeedIds } from "../../hooks/useForYouFeed";

function HomePage () {

    const tabs = ["For You", "Following"];
    const [activeTab, setActiveTab] = useState("For You");
    const {currentUser} = useCurrentUser();
    const {setHeaderContent} = useContext(HeaderContentContext);

    const { data: forYouFeedIds = [], isLoading, isError } = useForYouFeedIds();

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
            <div className="h-full flex grow w-full overflow-y-auto mb-14">
                <Feed key={activeTab} postIdsArray={forYouFeedIds}/>
            </div>
        </div>

    )


}

export default HomePage;