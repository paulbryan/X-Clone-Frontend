import { useState } from "react";
import { useCurrentUser } from "../Context/CurrentUserProvider";
import FollowersFollowing from "../UIComponent/FollowersFollowing";
import ProfilePic from "../UIComponent/ProfilePic";
import { FaRegCalendar } from "react-icons/fa6";
import type { User } from "../../types/User";
import BannerComponent from "../UserInfo/BannerComponent";


function ProfilePageOverview () {

    const {currentUser} = useCurrentUser();

    const [pageUser, setPageUser] = useState<User | null>(currentUser);


    return (
            <div className="h-fit">

                <div className="w-full h-40 relative">

                    <div className="opacity-100 h-32 w-full">
                        <BannerComponent user={pageUser}/>
                    </div>

                    <div className="absolute w-20 h-10 left-5 bottom-10 rounded-full">
                        <ProfilePic user={pageUser}/>
                    </div>

                    <div className="w-full h-12 flex justify-end items-center px-4">
                        <div className="w-28 h-auto flex items-center justify-center align-middle rounded-2xl border border-(--text-main) text-(--text-main)">
                            <p>Follow</p>
                        </div>
                    </div>



                </div>

                <div className="w-full h-full px-4 text-(--text-main) flex flex-col">

                    <div className="w-full h-12 mt-1 mb-3 flex flex-col">
                        <p className="font-bold text-xl">Jokerhut</p>
                        <p className="text-(--twitter-text)">@TheJokerHut</p>
                    </div>

                    <div className="flex w-full h-fit gap-0.5 flex-col">

                        <div>
                            <p className="text-(--text-main)">
                            21 year old on my web development journey. Main languages are Java and ReactJS.
                            </p>
                        </div>
                        
                        <div className="h-fit w-full text-(--twitter-text)">
                            <div className="flex items-center gap-2">
                            <FaRegCalendar />
                            <p>Joined December 2024</p>
                            </div>
                        </div>

                        <div className="h-fit w-full flex items-center gap-4 mb-0.5 text-(--twitter-text)">
                        <FollowersFollowing/>
                        </div>

                    </div>

                </div>

            </div>
    )

}

export default ProfilePageOverview;