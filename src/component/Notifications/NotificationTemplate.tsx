import type { Notification } from "../../types/Notification"
import ProfilePic from "../UserInfo/ProfilePic";
import { useNavigate } from "react-router-dom";
import DisplayNameComponent from "../UserInfo/DisplayNameComponent";
import NotificationTypeIcon from "../UIComponent/NotificationTypeIcon";
import { useUser } from "../../hooks/queries/useUser";
type NotificationTemplateProps = {

    notification: Notification;
    isTempUnseen?: boolean;

}

function NotificationTemplate ({notification, isTempUnseen}: NotificationTemplateProps)  {

    const navigate = useNavigate();
    const displayMessage = determineDisplayMessage();

    const { data: sender } = useUser(notification.senderId ?? -1);

    function determineDisplayMessage (): string {

        switch (notification.type) {

            case "like" :
            return "liked your post";
            
            case "follow" :
            return "followed you";

            case "repost" : 
            return "reposted your post";
            
            case "reply" :
            return "replied to your post";

        } 

        return "";

    }

    function navigateFromNotification () {
            if (notification.type == "follow") {
                navigate("profile/"+notification.senderId)
            } else {
                navigate("tweet/"+notification.referenceId)
            }
    }

    return (
        <>
        <div className={`h-fit w-full flex border-b-2 hover:bg-twitterTextAlt/20 border-twitterBorder ${
            isTempUnseen ? 'bg-twitterTextAlt/20' : ' '
        }`}
        onClick={() => navigateFromNotification()}
        >

        <div className="w-18 h-fit flex justify-center text-3xl pt-4 text-center">
            <NotificationTypeIcon notificationType={notification.type}/>
        </div>

        <div className="flex flex-col w-full h-fit pr-4 pt-3">

            <div className="w-full h-fit">
            <div className="flex w-12 pb-1">
                <div className={"w-10 h-10"}>
                    <ProfilePic userId={sender?.id}/>
                </div>
            </div>
            </div>

            <div className="pb-3 w-full h-fit">
                <div className="w-full h-fit flex-col">
                    <div className="w-full h-5 flex gap-1 align-middle text-white mb-0.5">
                            <div className="font-bold"> 
                                <DisplayNameComponent user={sender}/>
                            </div>
                            <p onClick={() => navigateFromNotification()}> {displayMessage}</p>
                    </div>

                    <div className="text-twitterTextAlt max-h-32">
                        <p onClick={() => navigateFromNotification()}>

                            {notification.text.slice(0, 30)}{notification.text.length > 30 ? "..." : ""}
                        </p>
                    </div>
                </div>

            </div>

        </div>

        </div>
    </>
    )


}

export default NotificationTemplate;