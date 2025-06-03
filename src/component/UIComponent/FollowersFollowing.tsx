import { useEffect, useState } from "react";
import type { User } from "../../types/User";
import { useUserCache } from "../Context/UserCacheProvider";
import { useCurrentUser } from "../Context/CurrentUserProvider";

type FollowersFollowingProps = {
    pageUser: User;
}

function FollowersFollowing ({pageUser} : FollowersFollowingProps) {

    const {userCache, getUserFromCache} = useUserCache();
    const [freshPageUser, setFreshPageUser] = useState(pageUser);
    const {currentUser} = useCurrentUser();

    useEffect(() => {
        if (pageUser && currentUser && pageUser.id != currentUser.id) {
            console.log("getting fresh user")
            const userInCache = getUserFromCache(pageUser.id);
            if (userInCache) {
                console.log("New User from cache: " + JSON.stringify(userInCache))
                setFreshPageUser(userInCache)
            }
        }
    }, [userCache, currentUser])

    return (
        <>
        
        <div className="flex text-(--twitter-text)">
            <p> <span className="font-bold text-(--text-main)">{freshPageUser.followers.length}</span> Followers</p>
        </div>
        <div className="flex text-(--twitter-text)">
            <p> <span className="font-bold  text-(--text-main)">{freshPageUser.following.length}</span> Following</p>
        </div>
        
        </>
    )

}

export default FollowersFollowing;