import { useContext, useEffect, useState } from "react";
import { useCurrentUser } from "../../../context/Auth/CurrentUserProvider.tsx";
import NotificationFeed from "../feed/NotificationFeed.tsx";
import { HeaderContentContext } from "../../../context/GlobalState/HeaderContentProvider.tsx";
import { useNotifications } from "../../../lib/hooks/queries/useNotifications.tsx";
import { useMarkNotificationsAsSeen } from "../../../lib/hooks/mutations/useMarkNotificationsAsSeen.tsx";

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