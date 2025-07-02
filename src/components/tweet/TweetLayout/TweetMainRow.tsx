import { useNavigate } from "react-router-dom";
import type { Post } from "../../../lib/types/Post";
import type { User } from "../../../lib/types/User"
import ProfilePic from "../../user/ProfilePic";
import { PostUserCard } from "../tweetInfo/PostUserCard";
import { UserHoverWrapper } from "../../ui/UserHoverWrapper";
type TweetMainRowProps = {

    isParentPost?: boolean;
    isMainPost?: boolean;
    postUser?: User;
    post: Post;

}

export function TweetMainRow ({isParentPost, isMainPost, postUser, post}: TweetMainRowProps) {

    const navigate = useNavigate();
    

    return (
<>
                <div className="relative w-12 flex justify-center">
                <UserHoverWrapper userId={post.userId}>
                    <div className="w-12 h-12">
                        <ProfilePic userId={post.userId} />
                    </div>
                </UserHoverWrapper>
                    {isParentPost && (
                        <div className="absolute top-12 bottom-0 w-px bg-gray-600" />
                    )}
                </div>

                <div className="flex overflow-x-hidden flex-col">
                    
                    <div className="flex flex-col">
                    <PostUserCard postId={post.id} postUserId={postUser?.id} mainPost={isMainPost}/>
                    </div> 
                    {!isMainPost && (
                    <div className={`text-twitterText whitespace-pre-line w-full break-words mb-2`}>
                    <p className="break-words" onClick={() => navigate("/tweet/"+post.id)}>{post.text}</p>
                    </div>
                    )}
                </div>

</>


    )

}