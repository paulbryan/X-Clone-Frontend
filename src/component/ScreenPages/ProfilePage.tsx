import { useEffect, useState } from "react";
import ProfilePageOverview from "../Profile/ProfilePageOverview";
import TabList from "../TabList";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../Context/CurrentUserProvider";
import type { User } from "../../types/User";
import { useUserCache } from "../Context/UserCacheProvider";
import Feed from "../Feed";

function ProfilePage () {

    const tabs = ["Tweets", "Liked", "Media"];
    const [activeTab, setActiveTab] = useState("Tweets");
    const [idsForFeed, setIdsForFeed] = useState<number[]>([]);

    const {ID} = useParams();
    const pageUserID = Number(ID);

    const {currentUser} = useCurrentUser();
    const {addToUserCache, getUserFromCache, fetchUsersFromServerById} = useUserCache();

    const [pageUser, setPageUser] = useState<User | null>(null);

    function determineArrayForTab () {
        if (pageUser) {
            switch (activeTab) {
                case "Tweets" : setIdsForFeed(pageUser.posts); break;
                case "Liked" : setIdsForFeed([0, 0, 0, 0]); break;
            }
        }
    }

    useEffect(() => {
        if (pageUser) {
            console.log("Page user is " + JSON.stringify(pageUser))
            determineArrayForTab();
        }
    }, [pageUser, activeTab])

    useEffect(() => {
        if (pageUserID) {
            determinePageUser();
        }
    }, [pageUserID])
    
    async function determinePageUser () {
        if (currentUser && pageUserID == currentUser.id) {
            setPageUser(currentUser);
        } else{

            const userInCache = getUserFromCache(pageUserID);

            if (userInCache) {
                setPageUser(userInCache);
            } else {
                const fetchedUser: User[] = await fetchUsersFromServerById([pageUserID]);
                console.log("Fetched user is " + JSON.stringify( fetchedUser[0]));
                addToUserCache(fetchedUser[0]);
                setPageUser(fetchedUser[0]);
            }

        }
    }

    return (
        <div className="flex flex-col h-full w-full flex-grow overflow-y-auto">

            <ProfilePageOverview pageUser={pageUser}/>

            <div>
                <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>

            <div className="mb-14">
                {pageUser && idsForFeed.length > 0 ? (
                <>
                <Feed key={activeTab} postIdsArray={idsForFeed}/>
                </>
                ) : (
                    null
                )}
            </div>

        </div>
    )

}

export default ProfilePage;