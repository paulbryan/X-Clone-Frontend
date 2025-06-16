import { useContext, useEffect, useState } from "react";
import { useCurrentUser } from "../../hooks/queries/CurrentUserProvider";
import NotificationFeed from "../Feed/NotificationFeed";
import { HeaderContentContext } from "../../context/GlobalState/HeaderContentProvider";
import { useNotifications } from "../../hooks/queries/useNotifications";
import { useMarkNotificationsAsSeen } from "../../hooks/mutations/useMarkNotificationsAsSeen";

function NotificationPage () {

    const { currentUser } = useCurrentUser();
    const { setHeaderContent } = useContext(HeaderContentContext);
  
    const { data: notifications = [] } = useNotifications(currentUser?.id);
    const markSeenMutation = useMarkNotificationsAsSeen();
  
    const [tempUnread, setTempUnread] = useState<number[]>([]);
  
    const unreadNotifications = notifications.filter(n => !n.seen).map(n => n.id);
  
    useEffect(() => {
      setHeaderContent("Notifications");
    }, []);
  
    useEffect(() => {
      if (
        notifications.length > 0 &&
        currentUser &&
        unreadNotifications.length > 0 &&
        !markSeenMutation.isPending
          ) {
        setTempUnread(unreadNotifications);
        markSeenMutation.mutate(currentUser.id);
      }
    }, [notifications]);

    return (

        <div className="flex flex-col h-full w-full flex-grow overflow-y-auto">

            <div className="mb-14">
                <NotificationFeed tempUnreads={tempUnread}/>
            </div>

        </div>

    )

}

export default NotificationPage;