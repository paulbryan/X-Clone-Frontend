import MainFeed from "../MainFeed";
import TabList from "../TabList";

function HomePage () {

    const tabs = ["For You", "Following"];

    return (

        
        <div className="h-full w-full">
            <div>
                <TabList tabs={tabs} activeTab={tabs[0]}/>
            </div>
            <div>
                <MainFeed/>
            </div>
        </div>

    )


}

export default HomePage;