import { useCurrentUser } from "../../../context/Auth/CurrentUserProvider.tsx";
import LoadingIcon from "../../ui/LoadingIcon.tsx";
import NotificationTemplate from "../../tweet/NotificationTemplate.tsx";
import { useNotifications } from "../../../lib/hooks/queries/useNotifications.tsx";
import { AnimatePresence, motion } from "framer-motion";

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
              <AnimatePresence>
                <div className="flex flex-col-reverse w-full">
                {notifications.map((notification) => (
                <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                layout
                >
                    <NotificationTemplate isTempUnseen={tempUnreads?.includes(notification.id)} notification={notification} />
                </motion.div>
                ))}
                </div>
              </AnimatePresence>

            ) : (
                <div className="flex justify-center py-2 flex-col w-full">
                    <LoadingIcon />
                </div>
            )}
        </div>

    )

}

export default NotificationFeed;