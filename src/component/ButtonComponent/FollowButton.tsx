import { useEffect, useState } from "react";
import type { User } from "../../types/User";
import { useCurrentUser } from "../../context/currentUser/CurrentUserProvider";
import { useUserCache } from "../../context/cache/UserCacheProvider";


type FollowButtonProps = {
    pageUser: User;
}

function FollowButton ({pageUser}: FollowButtonProps) {

    const {currentUser, addToFollowing, removeFromFollowing} = useCurrentUser();

    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const {addToFollowers, removeFromFollowers} = useUserCache();

    useEffect(() => {

        if (currentUser) {
            if (currentUser.following.includes(pageUser.id)) {
                setIsFollowing(true);
            } else {
                setIsFollowing(false);
            }
        } else {
            setIsFollowing(false);
        }

    }, [currentUser])

    function handleFollow () {

        if (pageUser && currentUser) {

            if (currentUser.following.includes(pageUser.id)) {
                
                removeFromFollowers(pageUser.id, currentUser.id);
                removeFromFollowing(pageUser.id);

                const newFollow = {
                    followerId: currentUser.id,
                    followedId: pageUser.id
                }

                fetch("http://localhost:8080/api/follows/unfollowUser", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newFollow),
                  })
                  .then(res => res.text())
                  .then(data => {
                    console.log("Data res is " + data)
                    if (data != "SUCCESS") {
                        addToFollowers(pageUser.id, currentUser.id);
                        addToFollowing(pageUser.id)
                    }
                  });


            } else {
                addToFollowers(pageUser.id, currentUser.id);
                addToFollowing(pageUser.id)
                const newFollow = {
                    followerId: currentUser.id,
                    followedId: pageUser.id
                }
                
                console.log("Sending: " + JSON.stringify(newFollow))
    
                fetch("http://localhost:8080/api/follows/followUser", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newFollow),
                  })
                  .then(res => res.text())
                  .then(data => {
                    console.log("Data res is " + data)
                    if (data != "SUCCESS") {
                        removeFromFollowers(pageUser.id, currentUser.id);
                        removeFromFollowing(pageUser.id);                    }
                  });
            }


        }

    }


    return (
        <>
            {isFollowing ? (
                <p onClick={() => handleFollow()}> Following </p>
            ) : (
                <p onClick={() => handleFollow()}> Follow </p>
            )}
        </>
    )

}

export default FollowButton;