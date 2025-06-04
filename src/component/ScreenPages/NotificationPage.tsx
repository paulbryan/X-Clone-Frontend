import { useEffect } from "react";
import { useCurrentUser } from "../Context/CurrentUserProvider";

function NotificationPage () {

    const {notifications, currentUser} = useCurrentUser();

    function markAllAsSeen () {
        fetch(`http://localhost:8080/api/notifications`);
    }

    useEffect(() => {
        if (notifications && notifications.length > 0 && currentUser) {
            markAllAsSeen();
        }
    }, [notifications])

    return (

        <div>

        </div>

    )

}

export default NotificationPage;