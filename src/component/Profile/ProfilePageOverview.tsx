import { useEffect, useState } from "react";
import { useCurrentUser } from "../Context/CurrentUserProvider";
import FollowersFollowing from "../UIComponent/FollowersFollowing";
import ProfilePic from "../UIComponent/ProfilePic";
import { FaRegCalendar } from "react-icons/fa6";
import type { User } from "../../types/User";
import BannerComponent from "../UserInfo/BannerComponent";
import { useParams } from "react-router-dom";
import { useUserCache } from "../Context/UserCacheProvider";
import UsernameComponent from "../UserInfo/UsernameComponent";
import DisplayNameComponent from "../UserInfo/DisplayNameComponent";
import BioComponent from "../UserInfo/BioComponent";
import LoadingIcon from "../UIComponent/LoadingIcon";

type ProfilePageOverviewProps = {
    pageUser?: User | null;
}

function ProfilePageOverview ({pageUser} : ProfilePageOverviewProps) {

    const {currentUser, addToFollowing, removeFromFollowing} = useCurrentUser();
    const [isOwnPage, setIsOwnPage] = useState<boolean>(false);
    const {addToFollowers, removeFromFollowers} = useUserCache();


    useEffect(() => {
        if (currentUser && pageUser && currentUser.id == pageUser.id) {
            setIsOwnPage(true);
        } else {
            setIsOwnPage(false);
        }
    }, [pageUser, currentUser])

    

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

    if (pageUser) {
        return (
            <div className="h-fit">

                <div className="w-full h-40 relative">

                    <div className="opacity-100 h-32 w-full">
                        <BannerComponent user={pageUser}/>
                    </div>

                    <div className="absolute w-20 h-20 left-5 bottom-0 rounded-full">
                        <ProfilePic user={pageUser}/>
                    </div>

                    <div className="w-full h-12 flex justify-end items-center px-4">
                        <div className="w-28 h-auto flex items-center justify-center align-middle rounded-2xl border border-(--text-main) text-(--text-main)">
                            {isOwnPage ? (
                                <p>Edit Profile</p>
                            ) : (
                                <p onClick={() => handleFollow()}>Follow</p>
                            )}
                        </div>
                    </div>



                </div>

                <div className="w-full h-full px-4 text-(--text-main) flex flex-col">

                    <div className="w-full h-12 mt-1 mb-3 flex flex-col">
                        <div className="font-bold text-xl"><DisplayNameComponent user={pageUser}/></div>
                        <div className="text-(--twitter-text)"><UsernameComponent user={pageUser}/></div>
                    </div>

                    <div className="flex w-full h-fit gap-0.5 flex-col">

                        <div className="text-(--text-main)">
                            <BioComponent user={pageUser}/>
                        </div>
                        
                        <div className="h-fit w-full text-(--twitter-text)">
                            <div className="flex items-center gap-2">
                            <FaRegCalendar />
                            <p>Joined December 2024</p>
                            </div>
                        </div>

                        <div className="h-fit w-full flex items-center gap-4 mb-0.5 text-(--twitter-text)">
                        <FollowersFollowing pageUser={pageUser}/>
                        </div>

                    </div>

                </div>

            </div>
    )
    } else {
        return (
            <div className="w-full h-80 flex items-center">
                <LoadingIcon/>
            </div>
        )
    }

}

export default ProfilePageOverview;