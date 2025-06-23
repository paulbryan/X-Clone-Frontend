import type { Post } from "../../../lib/types/Post"
import type { User } from "../../../lib/types/User";
import { ImagePreviewGrid } from "../../layout/media/ImagePreviewGrid";
import { PostLine } from "../tweetInfo/PostLine";
import { ReplyingTo } from "../tweetInfo/ReplyingTo";

type TweetImagesRowProps = {
    post : Post;
    isParentPost?: boolean;
    isMainPost?: boolean;
}

export function TweetImagesRow ({post, isParentPost, isMainPost}: TweetImagesRowProps ) {

    return (
        <>
            {isParentPost && <PostLine showLine={isParentPost}/>}
            <div className={`${isMainPost ? "col-span-2" : "col-start-2"}`}>
                <ImagePreviewGrid mediaIds={post.postMedia}/>
            </div>
        </>
    )

}