import { usePost } from "../../../lib/hooks/queries/usePost.tsx";
import { useUser } from "../../../lib/hooks/queries/useUser.tsx";
import CreatedAtDisplay from "../../ui/CreatedAtDisplay.tsx";
import DisplayNameComponent from "../../user/DisplayNameComponent.tsx";
import UsernameComponent from "../../user/UsernameComponent.tsx";

type PostUserCardProps = {
    postId: number;
    fullPost?: boolean;
    postUserId?: number;
}

export function PostUserCard ({postId, postUserId, fullPost}: PostUserCardProps) {

    const { data: post } = usePost(postId);
  
    const { data: postUser } = useUser(postUserId ?? -1);

    return (
        <>
        <div className={` flex ${fullPost ? "flex-col" : "mb-0.5 gap-2 items-center"}  text-twitterText `}>
            <div className="font-bold">
            <DisplayNameComponent user={postUser}/>
            </div>
        <div className="text-twitterTextAlt text-md">
            <UsernameComponent user={postUser} />
        </div>
        {!fullPost && post && (
            <>
            <p>•</p>
            <CreatedAtDisplay createdAt={post.createdAt} typeOfCreatedAt="timeago"/>
            </>  
        )}
        </div> 
        
        </>
    )

}