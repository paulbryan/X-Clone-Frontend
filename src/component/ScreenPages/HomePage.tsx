import { useState } from "react";
import MainFeed from "../Feed";
import TabList from "../TabList";
import { useCurrentUser } from "../Context/CurrentUserProvider";

function HomePage () {

    const tabs = ["For You", "Following"];
    const [activeTab, setActiveTab] = useState("For You");
    const {currentUser} = useCurrentUser();

    return (

        
        <div className="h-full w-full">
            {currentUser && (
            <div>
                <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>
            )}
            <div className="h-full flex grow w-full">
            </div>
        </div>

    )


}

export default HomePage;