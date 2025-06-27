import { FaXTwitter } from "react-icons/fa6";
import DrawerNavigationPair from "../../modal/drawer/DrawerNavigationPair";
import { HeroIcon } from "../../ui/HeroIcon";
import { useModal } from "../../../context/GlobalState/ModalProvider";
import { useCurrentUser } from "../../../context/Auth/CurrentUserProvider";
import { useLocation } from "react-router-dom";

export function RightDesktopLayout () {

    const {setModalType} = useModal();
    const {currentUser} = useCurrentUser();
    const location = useLocation();


    return (
        <div className="hidden md:pl-30 md:flex md:flex-col md:w-2/3 py-3 bg-(--background-main)">

            <FaXTwitter className="text-white text-4xl"/>
            
            <div className="flex w-full h-fit flex-col py-2">

                <DrawerNavigationPair name={"Home"} routePath="/">
                    <HeroIcon iconName="HomeIcon" className="h-7 w-7" solid={location.pathname === `/`}/>
                </DrawerNavigationPair>

                <DrawerNavigationPair name={"Profile"} routePath={`/profile/${currentUser?.id}`}>
                    <HeroIcon iconName="UserIcon" className="h-7 w-7" solid={location.pathname === `/profile/${currentUser?.id}`}/>
                </DrawerNavigationPair>

                <DrawerNavigationPair name={"Notifications"} routePath="/notifications">
                    <HeroIcon iconName="BellIcon" className="h-7 w-7" solid={location.pathname === `/notifications`}/>
                </DrawerNavigationPair>

                <DrawerNavigationPair name={"Bookmarks"} routePath="/bookmarks">
                    <HeroIcon iconName="BookmarkIcon" className="h-7 w-7" solid={location.pathname === `/bookmarks`}/>
                </DrawerNavigationPair>

                <DrawerNavigationPair name={"About"} routePath="/about">
                    <HeroIcon iconName="QuestionMarkCircleIcon" className="h-7 w-7" solid={false}/>
                </DrawerNavigationPair>

                <div onClick={() => setModalType("changeColor")}>
                    <DrawerNavigationPair name={"Set Theme"} >
                    <HeroIcon iconName="PaintBrushIcon" className="h-7 w-7" solid={false}/>
                    </DrawerNavigationPair>
                </div>

                <DrawerNavigationPair name={"Log Out"}>
                    <HeroIcon iconName="PowerIcon" className="h-7 w-7" solid={false}/>
                </DrawerNavigationPair>

                </div>

        </div>
    )

}