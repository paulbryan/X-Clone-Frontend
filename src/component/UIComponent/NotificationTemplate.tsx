import type { Post } from "../../types/Post"
import type { User } from "../../types/User";
import type { Notification } from "../../types/Notification"
import ProfilePic from "./ProfilePic";
import { useNavigate } from "react-router-dom";
import DisplayNameComponent from "../UserInfo/DisplayNameComponent";
import UsernameComponent from "../UserInfo/UsernameComponent";

type NotificationTemplateProps = {

    post?: Post;
    sender: User;
    notification: Notification;

}

function NotificationTemplate ({post, sender, notification}: NotificationTemplateProps)  {

    const navigate = useNavigate();
    const displayMessage = determineDisplayMessage();

    function determineDisplayMessage (): string {

        switch (notification.type) {

            case "like" : 
            return "liked your post";
            
            case "follow" :
            return "followed you";

        } 

        return "";

    }

    return (
        <>
        <div className="h-fit w-full flex border-b-2 border-(--twitter-border)">

        <div className="flex flex-col w-full h-fit px-4 pt-3">

            <div className="w-full h-fit">
            <div className="flex w-12 mr-2">
                <div className="w-10 h-10" onClick={() => navigate(`/profile/${sender.id}`)}>
                    <ProfilePic user={sender}/>
                </div>
            </div>
            </div>

            <div className="pb-3 w-full h-fit">
                <div className="w-full h-fit flex-col">
                    <div className="w-full h-5 flex gap-2 align-middle text-white mb-0.5">
                            <div> 
                                <DisplayNameComponent user={sender}/>
                                <p> {displayMessage}</p>
                            </div>
                    </div>
                    {post && (
                    <div className="text-white max-h-32">
                        <p>
                            {post.text.slice(0, 20)}{post.text.length > 20 ? "..." : ""}
                        </p>
                    </div>
                    )}
                </div>

            </div>

        </div>

        </div>
    </>
    )


}