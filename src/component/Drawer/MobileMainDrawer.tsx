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
import { useModal } from "../../context/misc/ModalProvider";

type MobileMainDrawerProps = {
    setDrawerOpen:Dispatch<SetStateAction<boolean>>
}

function MobileMainDrawer ( {setDrawerOpen}: MobileMainDrawerProps ) {


    const {setModalType} = useModal();
    const {currentUser} = useCurrentUser();
    const drawerVariant = {
        initial: { x: "-100%", opacity: 0 },
        animate: {
          x: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        exit: {
          x: "-100%",
          opacity: 0,
          transition: { duration: 0.2, ease: "easeInOut" }
        }
      };
    const navigate = useNavigate();

    useEffect(() => {
        console.log("curriser " + JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <motion.div
        className="absolute z-8 top-0 w-full h-full backdrop-blur-sm"
        variants={drawerVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={() => setDrawerOpen(false)}>

            <div
            onClick={(e) => e.stopPropagation()}
            className="w-2/3 min-w-[280px] max-w-[85vw] p-4 border-r flex flex-col border-(--twitter-border) h-full bg-(--background-main)">
                
                <div className="w-full h-fit ">
                    <div onClick={() => navigate(`/profile/${currentUser?.id}`)} className="w-12 h-12">
                        <ProfilePic user={currentUser}/>
                    </div>
                    <div className="text-(--twitter-text)">
                        <div className="text-(--text-main) text-xl font-bold">
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

                <div className="flex w-full h-fit flex-col py-2">

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

                    <DrawerNavigationPair name={"About"} routePath="/about" setDrawerOpen={setDrawerOpen}>
                        <CiCircleQuestion/>
                    </DrawerNavigationPair>

                    <div onClick={() => setModalType("changeColor")}>
                        <DrawerNavigationPair name={"Set Theme"} >
                            <CiPickerHalf/>
                        </DrawerNavigationPair>
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