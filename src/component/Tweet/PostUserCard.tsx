import { usePost } from "../../hooks/queries/usePost";
import { useUser } from "../../hooks/queries/useUser";
import CreatedAtDisplay from "../UIComponent/CreatedAtDisplay";
import DisplayNameComponent from "../UserInfo/DisplayNameComponent";
import UsernameComponent from "../UserInfo/UsernameComponent";

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
        <div className={` flex ${fullPost ? "flex-col" : "mb-0.5 gap-2 items-center"}  text-(--text-main) `}>
            <div className="font-bold">
            <DisplayNameComponent user={postUser}/>
            </div>
        <div className="text-(--twitter-text) text-md">
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