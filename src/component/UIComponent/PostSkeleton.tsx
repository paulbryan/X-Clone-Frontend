import type { User } from "../../types/User";
import { useCurrentUser } from "../Context/CurrentUserProvider";
import DisplayNameComponent from "../UserInfo/DisplayNameComponent";
import PostTextComponent from "../UserInfo/PostTextComponent";
import UsernameComponent from "../UserInfo/UsernameComponent";
import PostInteractionComponent from "./PostInteractionComponent";
import ProfilePic from "./ProfilePic";

function PostSkeleton () {

    return (

        <>
            <div className="h-fit w-full flex border-b-2 border-t-2 border-(--twitter-border)">

            <div className="flex w-full h-fitl px-4 pt-3">
                <div className="flex w-12 mr-2">
                    <div className="w-10 h-10">
                        <ProfilePic user={null}/>
                    </div>
                </div>

                <div className="pb-3 w-full h-fit">
                    <div className="w-full h-fit flex-col">
                        <div className="w-full h-5 flex gap-2 align-middle text-white mb-0.5">
                                    <DisplayNameComponent user={null}/>
                                <div className="text-(--twitter-text)">
                                    <UsernameComponent user={null}/>
                                </div>                        </div>
                        <div className="text-white max-h-32">
                            <PostTextComponent/>
                        </div>
                        <div>
                            <PostInteractionComponent/>
                        </div>
                    </div>

                </div>

            </div>

            </div>
        </>

    )

}

export default PostSkeleton;