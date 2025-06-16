import { useCurrentUser } from "../../hooks/queries/CurrentUserProvider";
import LoadingIcon from "../UIComponent/LoadingIcon";
import NotificationTemplate from "../Notifications/NotificationTemplate";
import { useNotifications } from "../../hooks/queries/useNotifications";
type NotificationFeedProps = {
    tempUnreads?: number[];
}

function NotificationFeed ({tempUnreads} : NotificationFeedProps) {

    const {currentUser } = useCurrentUser()
    const { data: notifications = [] } = useNotifications(currentUser?.id);
    const isReady = notifications && notifications.length > 0;


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