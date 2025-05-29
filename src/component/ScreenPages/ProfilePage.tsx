import ProfilePageOverview from "../Profile/ProfilePageOverview";
import TabList from "../TabList";

const tabList = ["Tweets", "Liked", "Media"];

function ProfilePage () {

    return (
        <div className="h-full">


            <ProfilePageOverview/>

            <div>
                <TabList tabs={tabList} activeTab={tabList[0]}/>
            </div>

            <div className="h-full">

            </div>

        </div>
    )

}

export default ProfilePage;