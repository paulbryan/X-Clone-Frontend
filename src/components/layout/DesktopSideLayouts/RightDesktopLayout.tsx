import { FaXTwitter } from "react-icons/fa6";
import DrawerNavigationPair from "../../modal/drawer/DrawerNavigationPair";
import { HeroIcon } from "../../ui/HeroIcon";
import { useModal } from "../../../context/GlobalState/ModalProvider";
import { useCurrentUser } from "../../../context/Auth/CurrentUserProvider";
import { useLocation } from "react-router-dom";
import { useUnseenNotificationIds } from "../../../lib/hooks/mutations/useSeenNotifications";

export function RightDesktopLayout () {

    const {setModalType} = useModal();
    const {currentUser} = useCurrentUser();
    const location = useLocation();
    const { data: unseenIds = [] } = useUnseenNotificationIds(currentUser?.id);



    return (
        <div className="hidden lg:flex justify-end lg:w-2/3 py-3">

        <div className="lg:flex lg:flex-col lg:w-2/3 py-3">


            <FaXTwitter className="text-white text-4xl"/>
            
            <div className="flex w-full h-fit flex-col gap-2 py-2">

                <DrawerNavigationPair name={"Home"} routePath="/">
                    <HeroIcon iconName="HomeIcon" className="h-7 w-7" solid={location.pathname === `/`}/>
                </DrawerNavigationPair>

                <DrawerNavigationPair name={"Explore"} routePath={`/explore`}>
                    <HeroIcon iconName="MagnifyingGlassIcon" className="h-7 w-7" solid={location.pathname === `/explore`}/>
                </DrawerNavigationPair>

                <DrawerNavigationPair name={"Notifications"} routePath="/notifications">
                    <HeroIcon iconName="BellIcon" className="h-7 w-7" solid={location.pathname === `/notifications`}/>
                    {currentUser && unseenIds.length > 0 && (
                        <div className="w-4 rounded-full h-4 absolute left-3 z-40 bg-(--color-main) top-3 right-9">  </div>
                    )}
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

                <DrawerNavigationPair name={"Profile"} routePath={`/profile/${currentUser?.id}`}>
                    <HeroIcon iconName="UserIcon" className="h-7 w-7" solid={location.pathname === `/profile/${currentUser?.id}`}/>
                </DrawerNavigationPair>

                <DrawerNavigationPair name={"Log Out"}>
                    <HeroIcon iconName="PowerIcon" className="h-7 w-7" solid={false}/>
                </DrawerNavigationPair>

                </div>
            </div>
        </div>
    )

}