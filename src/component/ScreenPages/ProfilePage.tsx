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

    const {ID} = useParams();
    const pageUserID = Number(ID);

    const {currentUser} = useCurrentUser();
    const {addToUserCache, getUserFromCache, fetchUsersFromServerById} = useUserCache();

    const [pageUser, setPageUser] = useState<User | null>(null);

    useEffect(() => {
        determinePageUser();
    }, [pageUserID])
    
    async function determinePageUser () {
        if (currentUser && pageUserID == currentUser.id) {
            setPageUser(currentUser);
        } else {

            const userInCache = getUserFromCache(pageUserID);

            if (userInCache) {
                setPageUser(userInCache);
            } else {
                const singleArray : number[] = [pageUserID];
                const fetchedUser: User[] = await fetchUsersFromServerById(singleArray);
                addToUserCache(fetchedUser[0])
                const newUserInCache = getUserFromCache(pageUserID);
                if (newUserInCache) {
                    setPageUser(newUserInCache);
                }            
            }

        }
    }

    return (
        <div className="h-full">

            <ProfilePageOverview pageUser={pageUser}/>

            <div>
                <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>

            <div className="h-full w-full">
                {pageUser ? (
                    <Feed postIdsArray={pageUser.posts}/>
                ) : (
                    <p className="text-red text-4xl bg-red-600">Loading Feed</p>
                )}
            </div>

        </div>
    )

}

export default ProfilePage;