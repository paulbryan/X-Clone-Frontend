import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../context/Auth/CurrentUserProvider.tsx";
import { usePost } from "../../hooks/queries/usePost.tsx";
import ComposeTweet from "../input/ComposeTweet.tsx";
import Feed from "../feed/Feed.tsx";
import { useContext, useEffect } from "react";
import { HeaderContentContext } from "../../context/GlobalState/HeaderContentProvider.tsx";
import Tweet from "./Tweet.tsx";

function FullPost() {
  const { postId } = useParams();
  const numericPostId = Number(postId);
  const { currentUser } = useCurrentUser();

  if (!postId || isNaN(numericPostId)) {
    return <div className="text-white">Invalid post ID.</div>;
  }

  const { data: post } = usePost(parseInt(postId));

  const { setHeaderContent } = useContext(HeaderContentContext);
  useEffect(() => {
    if (post) {
      setHeaderContent(<p>{post.parentId ? "Thread" : "Tweet"}</p>);
      console.log("Post in render:", post.bookmarkedBy);
    }
  }, [post]);

  //make this a page?
  return (
    <div className="flex flex-col h-full w-full grow scrollbar-blue overflow-y-scroll text-white xl:border-x border-twitterBorder">
      {post && (
        <>
          <Tweet key={postId} postType={"MainPost"} postId={numericPostId} />

          {currentUser && <ComposeTweet parentId={post.id} />}

          {post && post.replies.length > 0 && (
            <Feed
              key={post.replies.length}
              postIdsArray={post.replies}
              reverseFeed={true}
            />
          )}
        </>
      )}
    </div>
  );
}

export default FullPost;
