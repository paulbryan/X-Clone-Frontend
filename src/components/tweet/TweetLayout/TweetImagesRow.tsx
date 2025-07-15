import type { Post } from "../../../types/Post";
import { ImagePreviewGrid } from "../../layout/media/ImagePreviewGrid";
import { Poll } from "../Poll";
import { PostLine } from "../tweetInfo/PostLine";

type TweetImagesRowProps = {
  post: Post;
  isParentPost?: boolean;
  isMainPost?: boolean;
};

export function TweetImagesRow({
  post,
  isParentPost,
  isMainPost,
}: TweetImagesRowProps) {
  return (
    <>
      {isParentPost && <PostLine showLine={isParentPost} />}
      <div className={`${isMainPost ? "col-span-2" : "col-start-2"}`}>
        {post.pollId ? (
          <Poll pollId={post.pollId}/>
        ) : (
          <ImagePreviewGrid media={post.postMedia} />
        )}
      </div>
    </>
  );
}
