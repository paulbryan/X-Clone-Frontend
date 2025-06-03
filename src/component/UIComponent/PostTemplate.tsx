import { useEffect, useState } from "react";
import type { Post } from "../../types/Post";
import type { User } from "../../types/User";
import { useCurrentUser } from "../Context/CurrentUserProvider";
import { usePostCache } from "../Context/PostCacheProvider";
import UsernameComponent from "../UserInfo/UsernameComponent";
import PostInteractionComponent from "./PostInteractionComponent";
import ProfilePic from "./ProfilePic";
import { useUserCache } from "../Context/UserCacheProvider";
import DisplayNameComponent from "../UserInfo/DisplayNameComponent";

type PostTemplateProps = {
    post: Post;
    currentPostUser?: User;
}

function PostTemplate ({post, currentPostUser} : PostTemplateProps) {

    const {currentUser} = useCurrentUser();
    const {getUserFromCache} = useUserCache();
    const [postUser, setPostUser] = useState<User | undefined>(currentPostUser);

    useEffect(() => {
        if (!currentPostUser) {
            if (currentUser && currentUser.id == post.userId) {
                setPostUser(currentUser);
            } else {
                const userToGet = getUserFromCache(post.userId);
                if (userToGet) {
                    setPostUser(userToGet);
                }
            }
        }
    }, [post])

    useEffect(() => {
        console.log("Hi im a post")
        if (postUser) {
            console.log("My user is : " + JSON.stringify(postUser))
        }
        if (post) {
            console.log("My post is: " + JSON.stringify(post))
        }

    }, [post])

    return (


        <>
            <div className="h-fit w-full flex border-b-2 border-(--twitter-border)">

            <div className="flex w-full h-fitl px-4 pt-3">
                <div className="flex w-12 mr-2">
                    <div className="w-10 h-10">
                        <ProfilePic user={postUser}/>
                    </div>
                </div>

                <div className="pb-3 w-full h-fit">
                    <div className="w-full h-fit flex-col">
                        <div className="w-full h-5 flex gap-2 align-middle text-white mb-0.5">
                                <div> 
                                    <DisplayNameComponent user={postUser}/>
                                </div>
                                <div className="text-(--twitter-text)">
                                    <UsernameComponent user={postUser}/>
                                </div>
                                <p>·</p>
                                <p>Feb 5</p>
                        </div>
                        <div className="text-white max-h-32">
                            <p>
                            {post.text}
                            </p>
                        </div>
                        <div>
                            <PostInteractionComponent postId={post.id} likeList={post.likedBy}/>
                        </div>
                    </div>

                </div>

            </div>

            </div>
        </>

    )

}

export default PostTemplate;