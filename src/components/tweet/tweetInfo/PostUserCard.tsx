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

export function PostUserCard ({postId, postUserId, isReplyFeedPost, mainPost}: PostUserCardProps) {

    const { data: post } = usePost(postId);
  
    const { data: postUser } = useUser(postUserId ?? -1);

    

    return (
        <>
        {/* !MAINPOST */}
        <div className={` flex ${mainPost ? "flex-col" : "mb-0.5 gap-2 items-center"}  text-twitterText `}>
            {postUser && (
            <>
            <UserHoverWrapper userId={postUser.id}>
            <div className="font-bold">
                <DisplayNameComponent user={postUser} truncate={!mainPost}/>
            </div>
            </UserHoverWrapper>
            <UserHoverWrapper userId={postUser.id}>
                <div className="text-twitterTextAlt text-md">
                    <UsernameComponent truncate={!mainPost} user={postUser} />
                </div>
            </UserHoverWrapper>

            </>
            )}

        {!mainPost && post && (
            <>
            <p>•</p>
            <CreatedAtDisplay createdAt={post.createdAt} typeOfCreatedAt="timeago"/>
            </>  
        )}
        </div> 
        
        </>
    )

}