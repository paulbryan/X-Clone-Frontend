import FollowersFollowing from "../UIComponent/FollowersFollowing";
import ProfilePic from "../UIComponent/ProfilePic";
import {CiHome, CiUser, CiBookmark, CiBellOn, CiCircleQuestion, CiPower, CiPickerHalf } from "react-icons/ci";
import DrawerNavigationPair from "./DrawerNavigationPair";
import TextSetter from "./TextSetter";
import type { Dispatch, SetStateAction } from "react";
import { useCurrentUser } from "../Context/CurrentUserProvider";

type MobileMainDrawerProps = {
    setDrawerOpen:Dispatch<SetStateAction<boolean>>
}

function MobileMainDrawer ( {setDrawerOpen}: MobileMainDrawerProps ) {

    const {currentUser} = useCurrentUser();

    return (
        <div
        onClick={() => setDrawerOpen(false)}
        className="absolute z-20 top-0 w-full h-full backdrop-blur-sm">

            <div
            onClick={(e) => e.stopPropagation()}
            className="w-5/6 p-4 border-r flex flex-col border-(--twitter-border) h-full bg-(--background-main)">
                
                <div className="w-full h-fit mb-2">
                    <div className="w-12 h-12">
                        <ProfilePic user={currentUser}/>
                    </div>
                    <div>
                    <p className="font-bold text-xl text-(--text-main)">Jokerhut</p>
                    <p className="text-(--twitter-text)">
                        @Jokerhut
                    </p>
                    </div>

                    <div className="flex gap-4">
                        <FollowersFollowing/>
                    </div>

                </div>

                <div className="flex w-full h-fit flex-col">

                    <DrawerNavigationPair name={"Home"} routePath="/" setDrawerOpen={setDrawerOpen}>
                        <CiHome/>
                    </DrawerNavigationPair>

                    <DrawerNavigationPair name={"Profile"} routePath="/profile" setDrawerOpen={setDrawerOpen}>
                        <CiUser/>
                    </DrawerNavigationPair>

                    <DrawerNavigationPair name={"Notifications"} setDrawerOpen={setDrawerOpen}>
                        <CiBellOn/>
                    </DrawerNavigationPair>

                    <DrawerNavigationPair name={"Bookmarks"} setDrawerOpen={setDrawerOpen}>
                        <CiBookmark/>
                    </DrawerNavigationPair>

                    <DrawerNavigationPair name={"About"} setDrawerOpen={setDrawerOpen}>
                        <CiCircleQuestion/>
                    </DrawerNavigationPair>

                    <DrawerNavigationPair name={"Set Theme"} setDrawerOpen={setDrawerOpen}>
                        <CiPickerHalf/>
                    </DrawerNavigationPair>

                    <div className="flex flex-col w-full px-2">
                        <TextSetter/>
                    </div>

                    <DrawerNavigationPair name={"Log Out"} setDrawerOpen={setDrawerOpen}>
                        <CiPower/>
                    </DrawerNavigationPair>

                </div>



            </div>

        </div>
    )

}

export default MobileMainDrawer;