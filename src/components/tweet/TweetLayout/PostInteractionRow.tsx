import { useEffect } from "react";
import type { Post } from "../../../lib/types/Post"
import type { User } from "../../../lib/types/User";
import PostInteractionComponent from "../PostInteractionComponent";
import { PostLine } from "../tweetInfo/PostLine";
import { ReplyingTo } from "../tweetInfo/ReplyingTo";

type PostInteractionRowProps = {
    post : Post;
    isMainPost?: boolean;
    isParentPost?: boolean;
}

export function PostInteractionRow ({post, isMainPost, isParentPost}: PostInteractionRowProps ) {

    useEffect(() => {
        console.log("Post id " + post.id + "Replies list", post.replies)
    }, [])

    return (
        <>
        {isParentPost && <PostLine showLine={isParentPost}/>}
        <div className={`w-full ${isMainPost ? "col-span-2" : "col-start-2"}  text-lg border-twitterBorder`}>
          <PostInteractionComponent
              showPadding={isMainPost}
              postId={post.id}
          />
        </div> 
        </>
    )

}