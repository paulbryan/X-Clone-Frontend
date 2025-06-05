import { useEffect, useState } from "react";
import { useCurrentUser } from "../../context/currentUser/CurrentUserProvider";
import NotificationFeed from "../Feed/NotificationFeed";

function NotificationPage () {

    const {notifications, currentUser, clearRead, unreadNotifications} = useCurrentUser();

    const [tempUnread, setTempUnread] = useState<number[]>([]);

    function markAllAsSeen (id: number) {
        
        fetch(`http://localhost:8080/api/notifications/markAsSeen/${id}`);
        clearRead();
    }

    useEffect(() => {
        if (notifications && notifications.length > 0 && currentUser && unreadNotifications.length > 0) {
            setTempUnread(unreadNotifications);
            markAllAsSeen(currentUser.id);
        }
    }, [notifications])

    return (

        <div className="flex flex-col h-full w-full flex-grow overflow-y-auto">

            <div className="mb-14">
                <NotificationFeed tempUnreads={tempUnread}/>
            </div>

        </div>

    )

}

export default NotificationPage;