import { useContext, useEffect, useState } from "react";
import { useCurrentUser } from "../../hooks/CurrentUserProvider";
import NotificationFeed from "../Feed/NotificationFeed";
import { HeaderContentContext } from "../../context/misc/HeaderContentProvider";
import { useNotifications } from "../../hooks/useNotifications";

function NotificationPage () {

    const {currentUser} = useCurrentUser();
    const { data: notifications = [] } = useNotifications(currentUser?.id);

    const [tempUnread, setTempUnread] = useState<number[]>([]);
    const {setHeaderContent} = useContext(HeaderContentContext);

    useEffect(() => {
        setHeaderContent("Notifications");
    }, [])

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