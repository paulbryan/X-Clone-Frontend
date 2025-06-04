import { useEffect } from "react";
import { useCurrentUser } from "../Context/CurrentUserProvider";
import NotificationFeed from "../Feed/NotificationFeed";

function NotificationPage () {

    const {notifications, currentUser, clearRead} = useCurrentUser();

    function markAllAsSeen (id: number) {
        fetch(`http://localhost:8080/api/notifications/markAsSeen/${id}`);
        clearRead();
    }

    useEffect(() => {
        if (notifications && notifications.length > 0 && currentUser) {
            markAllAsSeen(currentUser.id);
        }
    }, [notifications])

    return (

        <div className="flex flex-col h-full w-full flex-grow overflow-y-auto">

            <div className="mb-14">
                <NotificationFeed/>
            </div>

        </div>

    )

}

export default NotificationPage;