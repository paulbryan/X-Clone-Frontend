import type { ReactNode } from "react";
import type { NotificationType } from "../../types/NotificationType";

import { FaHeart, FaUser } from "react-icons/fa";
import { HeroIcon } from "../../types/HeroIcon";

type NotificationTypeIconProps = {
    notificationType: NotificationType;
}

function NotificationTypeIcon ({notificationType}: NotificationTypeIconProps) {

    function decideIcon (nType: NotificationType) :ReactNode {

        switch (nType) {

            case "like" :
                return <HeroIcon iconName="HeartIcon" solid={true} className="text-(--twitter-red) w-7 h-7"/>
            case "follow" :
                return <HeroIcon iconName="UserIcon" solid={true} className="text-(--twitter-blue) w-7 h-7"/>
            case "reply" :
                return <HeroIcon iconName="ChatBubbleOvalLeftIcon" solid={true} className="text-(--twitter-blue) w-7 h-7"/>
            case "repost" :
                return <HeroIcon iconName="ArrowPathRoundedSquareIcon" solid={true} className="text-(--twitter-green) w-7 h-7"/>
    
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