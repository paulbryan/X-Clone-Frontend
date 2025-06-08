import FollowersFollowing from "../UserInfo/FollowersFollowing";
import ProfilePic from "../UserInfo/ProfilePic";
import {CiHome, CiUser, CiBookmark, CiBellOn, CiCircleQuestion, CiPower, CiPickerHalf } from "react-icons/ci";
import DrawerNavigationPair from "./DrawerNavigationPair";
import TextSetter from "./TextSetter";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useCurrentUser } from "../../context/currentUser/CurrentUserProvider";
import UsernameComponent from "../UserInfo/UsernameComponent";
import DisplayNameComponent from "../UserInfo/DisplayNameComponent";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type MobileMainDrawerProps = {
    setDrawerOpen:Dispatch<SetStateAction<boolean>>
}

function MobileMainDrawer ( {setDrawerOpen}: MobileMainDrawerProps ) {

    const {currentUser} = useCurrentUser();
    const drawerVariant = {
        initial: { x: "-100%" },
        animate: { x: 0, transition: { type: "spring", bounce: 0.2 } },
        exit: { x: "-100%", transition: { duration: 0.2 } }
      };
    const navigate = useNavigate();

    useEffect(() => {
        console.log("curriser " + JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <motion.div
        className="absolute z-60 top-0 w-full h-full backdrop-blur-sm"
        variants={drawerVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={() => setDrawerOpen(false)}>

            <div
            onClick={(e) => e.stopPropagation()}
            className="w-5/6 p-4 border-r flex flex-col border-(--twitter-border) h-full bg-(--background-main)">
                
                <div className="w-full h-fit ">
                    <div onClick={() => navigate(`/profile/${currentUser?.id}`)} className="w-12 h-12">
                        <ProfilePic user={currentUser}/>
                    </div>
                    <div className="text-(--twitter-text)">
                        <div className="text-(--text-main) text-xl">
                            <DisplayNameComponent user={currentUser}/>
                        </div>
                    <UsernameComponent user={currentUser}/>
                    </div>

                    <div className="flex gap-4 mt-2">
                        {currentUser && (
                            <FollowersFollowing pageUser={currentUser}/>
                        )}
                    </div>

                </div>

                <div className="flex w-full h-fit flex-col">

                    <DrawerNavigationPair name={"Home"} routePath="/" setDrawerOpen={setDrawerOpen}>
                        <CiHome/>
                    </DrawerNavigationPair>

                    <DrawerNavigationPair name={"Profile"} routePath={`/profile/${currentUser?.id}`} setDrawerOpen={setDrawerOpen}>
                        <CiUser/>
                    </DrawerNavigationPair>

                    <DrawerNavigationPair name={"Notifications"} setDrawerOpen={setDrawerOpen}>
                        <CiBellOn/>
                    </DrawerNavigationPair>

                    <DrawerNavigationPair name={"Bookmarks"} routePath="/bookmarks" setDrawerOpen={setDrawerOpen}>
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

        </motion.div>
    )

}

export default MobileMainDrawer;