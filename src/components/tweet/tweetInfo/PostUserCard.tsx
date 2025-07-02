import { usePost } from "../../../lib/hooks/queries/usePost.tsx";
import { useUser } from "../../../lib/hooks/queries/useUser.tsx";
import CreatedAtDisplay from "../../ui/CreatedAtDisplay.tsx";
import { UserHoverWrapper } from "../../ui/UserHoverWrapper.tsx";
import DisplayNameComponent from "../../user/DisplayNameComponent.tsx";
import UsernameComponent from "../../user/UsernameComponent.tsx";

type PostUserCardProps = {
    postId: number;
    mainPost?: boolean;
    isReplyFeedPost?: boolean;
    postUserId?: number;
}

export function PostUserCard ({postId, postUserId, mainPost}: PostUserCardProps) {

    const { data: post } = usePost(postId);
  
    const { data: postUser } = useUser(postUserId ?? -1);

    return (
        <>
          <div
            className={`flex ${
              mainPost ? "flex-col" : "mb-0.5 items-center justify-between"
            } text-twitterText w-full`}
          >
            {postUser && (
              <div className="flex items-center gap-1 w-full min-w-0 overflow-hidden">
                <UserHoverWrapper userId={postUser.id}>
                  <div className="font-bold truncate min-w-0">
                    <DisplayNameComponent user={postUser} truncate={!mainPost} />
                  </div>
                </UserHoverWrapper>
                <UserHoverWrapper userId={postUser.id}>
                  <div className="text-twitterTextAlt text-md truncate min-w-0">
                    <UsernameComponent truncate={!mainPost} user={postUser} />
                  </div>
                </UserHoverWrapper>
      
                {!mainPost && post && (
                  <div className="flex-shrink-0 text-twitterTextAlt text-sm whitespace-nowrap flex items-center gap-1">
                    <p>•</p>
                    <CreatedAtDisplay
                      createdAt={post.createdAt}
                      typeOfCreatedAt="timeago"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      );

}