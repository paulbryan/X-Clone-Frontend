import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useCurrentUser } from "../../../context/Auth/CurrentUserProvider.tsx";
import NotificationFeed from "../feed/NotificationFeed.tsx";
import { HeaderContentContext } from "../../../context/GlobalState/HeaderContentProvider.tsx";
import { useInfiniteFeed } from "../../../lib/hooks/queries/useInfiniteFeed.tsx";
import { useUnseenNotificationIds } from "../../../lib/hooks/mutations/useSeenNotifications.tsx";
import { useQueryClient } from "@tanstack/react-query";

function NotificationPage () {

    const { currentUser } = useCurrentUser();
    const { setHeaderContent } = useContext(HeaderContentContext);
  
    const {data: unseenIds = []} = useUnseenNotificationIds(currentUser?.id)
    const [tempUnread, setTempUnread] = useState<number[]>([]);

    const queryClient = useQueryClient();

    const setTempUnreadsAndMarkNotificationsAsSeen = () => {
      if (unseenIds && unseenIds.length > 0) {
        setTempUnread(unseenIds);
        queryClient.invalidateQueries({ queryKey: ["unseenNotifications", currentUser?.id] })
      }
    }

    useEffect(() => {
      setTempUnreadsAndMarkNotificationsAsSeen()
    }, [unseenIds])

    useEffect(() => {
      setHeaderContent("Notifications");
    }, []);

    const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
    } = useInfiniteFeed ("Notifications", currentUser?.id);

    const notificationIds = useMemo(() => {
      const seen = new Set<number>();
      return data?.pages.flatMap((page) =>
        page.posts.filter((id) => {
          if (seen.has(id)) return false;
          seen.add(id);
          return true;
        })
      ) ?? [];
    }, [data]);


    return (

        <div className="flex flex-col h-full w-full flex-grow overflow-y-auto">

            <div className="mb-14">
                <NotificationFeed tempUnreads={tempUnread} isLoading={isLoading} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} notificationIds={notificationIds}/>
            </div>

        </div>

    )

}

export default NotificationPage;