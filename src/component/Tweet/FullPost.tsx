import { useParams } from "react-router-dom";
import FullPostTemplate from "./FullPostTemplate";
import { useCurrentUser } from "../../hooks/queries/CurrentUserProvider";
import { usePost } from "../../hooks/queries/usePost";
import ComposeTweet from "./ComposeTweet";
import Feed from "../Layout/Feed";

function FullPost() {
  const { postId } = useParams();
  const numericPostId = Number(postId);
  const { currentUser } = useCurrentUser();

  if (!postId || isNaN(numericPostId)) {
    return <div className="text-white">Invalid post ID.</div>;
  }

  const { data: post } = usePost(parseInt(postId));
  

  return (
    <div className="flex flex-col w-full text-white">

      {post && (
        <>
        {post.parentId && (
            <FullPostTemplate
              postId={post.parentId}
              showLine={true}
            />
        )}

        <FullPostTemplate key={postId} mainPost={true} fullPost={true} postId={numericPostId} />

          {currentUser && (
            <ComposeTweet parentId={post.id} parentUsername="placeholder"/>
          )}
          
          {post && post.replies.length > 0 && (
            <Feed postIdsArray={post.replies} showAsMainPost={false}/>

          )}
        </>
      )}

    </div>
  );
}

export default FullPost;