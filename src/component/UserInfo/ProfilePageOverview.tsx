import { useEffect, useState } from "react";
import { useCurrentUser } from "../../context/currentUser/CurrentUserProvider";
import FollowersFollowing from "./FollowersFollowing";
import ProfilePic from "./ProfilePic";
import { FaRegCalendar } from "react-icons/fa6";
import type { User } from "../../types/User";
import BannerComponent from "./BannerComponent";
import { useParams } from "react-router-dom";
import { useUserCache } from "../../context/cache/UserCacheProvider";
import UsernameComponent from "./UsernameComponent";
import DisplayNameComponent from "./DisplayNameComponent";
import BioComponent from "./BioComponent";
import LoadingIcon from "../UIComponent/LoadingIcon";
import CreatedAtDisplay from "../UIComponent/CreatedAtDisplay";
import FollowButton from "../ButtonComponent/FollowButton";

type ProfilePageOverviewProps = {
    pageUser?: User | null;
}

function ProfilePageOverview ({pageUser} : ProfilePageOverviewProps) {

    const {currentUser} = useCurrentUser();
    const [isOwnPage, setIsOwnPage] = useState<boolean>(false);


    useEffect(() => {
        if (currentUser && pageUser && currentUser.id == pageUser.id) {
            setIsOwnPage(true);
        } else {
            setIsOwnPage(false);
        }
    }, [pageUser, currentUser])

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
                                <FollowButton pageUser={pageUser}/>
                            )}
                        </div>
                    </div>



                </div>

                <div className="w-full h-full px-4 text-(--text-main) flex flex-col">

                    <div className="w-full h-12 mt-1 mb-3 flex flex-col">
                        <div className="font-bold text-xl text-(--text-main)"><DisplayNameComponent user={pageUser}/></div>
                        <div className="text-(--twitter-text)"><UsernameComponent user={pageUser}/></div>
                    </div>

                    <div className="flex w-full h-fit gap-0.5 flex-col">

                        <div className="text-(--text-main)">
                            <BioComponent user={pageUser}/>
                        </div>
                        
                        <div className="h-fit w-full text-(--twitter-text)">
                            <div className="flex items-center gap-2">
                                <FaRegCalendar />
                                <CreatedAtDisplay typeOfCreatedAt="date" createdAt={pageUser.createdAt}/>
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