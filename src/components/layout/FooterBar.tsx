
import ComposePostMobileButton from "../ui/ComposePostMobileButton.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../context/Auth/CurrentUserProvider.tsx";
import { useNotifications } from "../../lib/hooks/queries/useNotifications.tsx";
import { useMemo } from "react";
import { HeroIcon } from "../ui/HeroIcon.tsx";



function FooterBar () {

    const navigate = useNavigate();
    const {currentUser} = useCurrentUser();
    const { data: notifications = [] } = useNotifications(currentUser?.id);
    const location = useLocation();

    const areUnread = useMemo(() => {
    return notifications.some(notification => !notification.seen);
    }, [notifications]);

    return (

        <>
            <div className="h-14 w-full bg-(--background-main) text-2xl text-white border-t border-t-twitterBorder flex items-center justify-around">

                <div className="w-full h-full flex items-center justify-center">
                    <div onClick={() => navigate("/")}>
                        <HeroIcon iconName="HomeIcon" className="w-7 h-7" solid={location.pathname === `/`}/>
                    </div>
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    <div onClick={() => navigate("/explore")}>
                        <HeroIcon iconName="MagnifyingGlassIcon" className="w-7 h-7" solid={location.pathname === `/explore`}/>
                    </div>
                </div>
                <div className="w-full h-full flex relative items-center justify-center">
                    <div onClick={() => currentUser ? navigate("/notifications") : null}>
                    <HeroIcon iconName="BellIcon" className="w-7 h-7" solid={location.pathname === `/notifications`}/>
                    </div>
                    {currentUser && areUnread && (
                        <div className="w-4 rounded-full h-4 absolute z-40 bg-(--color-main) top-2 right-9">  </div>
                    )}
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    <HeroIcon iconName="EnvelopeIcon" className="w-7 h-7" solid={location.pathname === `/messages`}/>
                </div>

                {currentUser && (
                <ComposePostMobileButton/>
                )}
            </div>

            
        </>

    )

}

export default FooterBar;