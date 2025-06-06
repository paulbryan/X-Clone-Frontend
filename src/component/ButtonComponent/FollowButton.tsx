import { useEffect, useState } from "react";
import { useUserCache } from "../../context/cache/UserCacheProvider";
import { useCurrentUser } from "../../context/currentUser/CurrentUserProvider";
import type { User } from "../../types/User";

type handleFollowProps = {
    pageUser?: User | null;
    setNewUser: (user: User) => void;
};

function FollowButton({ pageUser, setNewUser }: handleFollowProps) {
    const { currentUser, addToFollowing, removeFromFollowing } = useCurrentUser();
    const { addToUserCache } = useUserCache();
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (pageUser) {
            console.log("page user followers is: " + JSON.stringify(pageUser.followers))
        }

        if (!currentUser || !pageUser) return setIsFollowing(false);
        setIsFollowing(pageUser.followers.includes(currentUser.id));
    }, [pageUser, currentUser]);



    async function handleFollow() {
        if (!currentUser || !pageUser) return;

        const endpoint = isFollowing ? "unfollowUser" : "followUser";

        console.log("EndPoint: " + endpoint)
        console.log("Current pageUser Followers: " + JSON.stringify(pageUser.followers))
        console.log("Is following?: " + isFollowing)

        try {
            const res = await fetch(`http://localhost:8080/api/follows/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    followerId: currentUser.id,
                    followedId: pageUser.id,
                }),
            });

            if (!res.ok) throw new Error("Failed follow update");

            const updatedUser: User = await res.json();
            console.log("UpdatedUser Followers: " + JSON.stringify(updatedUser.followers))

            addToUserCache(updatedUser);
            
            setNewUser(updatedUser);

            if (isFollowing) {
                removeFromFollowing(pageUser.id);
            } else {
                addToFollowing(pageUser.id);
            }

            console.log("Setting isFollowing to " + !isFollowing)

        } catch (err) {
            console.error("Follow error:", err);
        }
    }

    if (!pageUser) return null;

    return (
        <p onClick={handleFollow}>
            {isFollowing ? "Following" : "Follow"}
        </p>
    );
}

export default FollowButton;