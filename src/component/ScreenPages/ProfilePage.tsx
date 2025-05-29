import { useState } from "react";
import ProfilePageOverview from "../Profile/ProfilePageOverview";
import TabList from "../TabList";

function ProfilePage () {

    const tabs = ["Tweets", "Liked", "Media"];
    const [activeTab, setActiveTab] = useState("Tweets");

    return (
        <div className="h-full">


            <ProfilePageOverview/>

            <div>
                <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>

            <div className="h-full">

            </div>

        </div>
    )

}

export default ProfilePage;