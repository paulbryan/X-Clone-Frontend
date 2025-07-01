import { useEffect, useState } from "react";
import FollowersFollowing from "../../../user/FollowersFollowing.tsx";
import ProfilePic from "../../../user/ProfilePic.tsx";
import { FaRegCalendar } from "react-icons/fa6";
import type { User } from "../../../../lib/types/User.ts";
import BannerComponent from "../../../user/BannerComponent.tsx";
import UsernameComponent from "../../../user/UsernameComponent.tsx";
import DisplayNameComponent from "../../../user/DisplayNameComponent.tsx";
import BioComponent from "../../../user/BioComponent.tsx";
import LoadingIcon from "../../../ui/LoadingIcon.tsx";
import CreatedAtDisplay from "../../../ui/CreatedAtDisplay.tsx";
import FollowButton from "../../../ui/FollowButton.tsx";
import { useCurrentUser } from "../../../../context/Auth/CurrentUserProvider.tsx";
type ProfilePageOverviewProps = {
    pageUser?: User | null;
  };
  
  function ProfilePageOverview({ pageUser }: ProfilePageOverviewProps) {
    const { currentUser } = useCurrentUser();
    const [isOwnPage, setIsOwnPage] = useState(false);
  
    useEffect(() => {
      setIsOwnPage(!!(currentUser && pageUser && currentUser.id === pageUser.id));
    }, [pageUser, currentUser]);
  

    if (pageUser) {
        return (
            <div className="h-fit">

                <div className="w-full h-40 relative">

                    <div className="opacity-100 h-32 w-full">
                        <BannerComponent userId={pageUser.id}/>
                    </div>

                    <div className="absolute w-20 h-20 left-5 bottom-0 rounded-full">
                        <ProfilePic disableNavigation={true} userId={pageUser.id}/>
                    </div>

                    <div className="w-full h-12 flex justify-end items-center px-4">
                        <div className="w-28 hover:cursor-pointer h-auto flex items-center justify-center align-middle rounded-2xl border border-twitterText text-twitterText">
                            {isOwnPage ? (
                                <p>Edit Profile</p>
                            ) : (
                                <FollowButton pageUser={pageUser}/>
                            )}
                        </div>
                    </div>



                </div>

                <div className="w-full h-full px-4 text-twitterText flex flex-col">

                    <div className="w-full h-12 mt-1 mb-3 flex flex-col">
                        <div className="font-bold text-xl text-twitterText"><DisplayNameComponent user={pageUser}/></div>
                        <div className="text-twitterTextAlt"><UsernameComponent user={pageUser}/></div>
                    </div>

                    <div className="flex w-full h-fit gap-0.5 flex-col">

                        <div className="text-twitterText">
                            <BioComponent user={pageUser}/>
                        </div>
                        
                        <div className="h-fit w-full text-twitterTextAlt">
                            <div className="flex items-center gap-2">
                                <FaRegCalendar />
                                <CreatedAtDisplay typeOfCreatedAt="date" createdAt={pageUser.createdAt}/>
                            </div>
                        </div>

                        <div className="h-fit w-full flex items-center gap-4 mb-0.5 text-twitterTextAlt">
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