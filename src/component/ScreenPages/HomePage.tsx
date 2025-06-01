import { useState } from "react";
import MainFeed from "../Feed";
import TabList from "../TabList";

function HomePage () {

    const tabs = ["For You", "Following"];
    const [activeTab, setActiveTab] = useState("For You");

    return (

        
        <div className="h-full w-full">
            <div>
                <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>
            <div className="h-full flex grow w-full">
            </div>
        </div>

    )


}

export default HomePage;