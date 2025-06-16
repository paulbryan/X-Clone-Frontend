import { useCurrentUser } from "../../hooks/CurrentUserProvider"
import type { Notification } from "../../types/Notification";
import LoadingIcon from "../UIComponent/LoadingIcon";
import NotificationTemplate from "../Notifications/NotificationTemplate";
import type { User } from "../../types/User";
import { useEffect, useState } from "react";
import { useNotifications } from "../../hooks/useNotifications";

type NotificationFeedProps = {
    tempUnreads?: number[];
}

function NotificationFeed ({tempUnreads} : NotificationFeedProps) {

    const {currentUser } = useCurrentUser()
    const [bufferedTimeOut, setBufferedTimeout] = useState(false);
    const { data: notifications = [] } = useNotifications(currentUser?.id);
    const isReady = notifications && notifications.length > 0;

    useEffect(() => {
        setTimeout(() => {
            setBufferedTimeout(true)
        }, 200)
    }, [])

    return (
        
        <div className='w-full'>
            {isReady ? (

                <div className="flex flex-col-reverse w-full">
                {notifications.map((notification) => (
                    <NotificationTemplate isTempUnseen={tempUnreads?.includes(notification.id)} notification={notification} />
                ))}
                </div>

            ) : (
                <div className="flex justify-center py-2 flex-col w-full">
                    <LoadingIcon />
                </div>
            )}
        </div>

    )

}

export default NotificationFeed;