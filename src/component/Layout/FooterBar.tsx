
import { FaHouse } from "react-icons/fa6";
import { FaSearch, FaRegBell } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import ComposePostMobileButton from "../ButtonComponent/ComposePostMobileButton";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/queries/CurrentUserProvider";
import { useNotifications } from "../../hooks/queries/useNotifications";
import { useMemo } from "react";



function FooterBar () {

    const navigate = useNavigate();
    const {currentUser} = useCurrentUser();
    const { data: notifications = [] } = useNotifications(currentUser?.id);
    
    const areUnread = useMemo(() => {
    return notifications.some(notification => !notification.seen);
    }, [notifications]);

    return (

        <>
            <div className="h-14 w-full bg-(--background-main) absolute bottom-0 text-2xl text-white border-t border-t-(--twitter-border) flex items-center justify-around">

                <div className="w-full h-full flex items-center justify-center">
                    
                    <FaHouse className="hover:cursor-pointer" onClick={() => navigate("/")}/>
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    <FaSearch />
                </div>
                <div className="w-full h-full flex relative items-center justify-center">
                    <FaRegBell onClick={() => {
                        if (currentUser) {
                            navigate("/notifications")
                        }
                    }} />
                    {currentUser && areUnread && (
                        <div className="w-4 rounded-full h-4 absolute z-40 bg-(--color-main) top-2 right-9">  </div>
                    )}
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    <FiMail />
                </div>

                {currentUser && (
                <ComposePostMobileButton/>
                )}
            </div>

            
        </>

    )

}

export default FooterBar;