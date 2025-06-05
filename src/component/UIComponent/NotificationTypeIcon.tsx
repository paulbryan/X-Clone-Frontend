import type { ReactNode } from "react";
import type { NotificationType } from "../../types/NotificationType";

import { FaHeart, FaUser } from "react-icons/fa";

type NotificationTypeIconProps = {
    notificationType: NotificationType;
}

function NotificationTypeIcon ({notificationType}: NotificationTypeIconProps) {

    function decideIcon (nType: NotificationType) :ReactNode {

        switch (nType) {

            case "like" :
                return <FaHeart className="text-(--twitter-red)"/>
            case "follow" :
                return <FaUser className="text-(--twitter-blue)"/>

        }

        return null;

    }

    const icon = decideIcon(notificationType);

    return (

        <>
            {icon}
        </>

    )


}

export default NotificationTypeIcon;