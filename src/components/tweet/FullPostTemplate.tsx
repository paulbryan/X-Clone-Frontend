import PostInteractionComponent from "./PostInteractionComponent.tsx";
import ProfilePic from "../user/ProfilePic.tsx";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { usePost } from "../../lib/hooks/queries/usePost.tsx";
import { useUser } from "../../lib/hooks/queries/useUser.tsx";
import { useCurrentUser } from "../../context/Auth/CurrentUserProvider.tsx";
import { ImagePreviewGrid } from "../layout/media/ImagePreviewGrid.tsx";
import { YouReposted } from "./tweetInfo/YouReposted.tsx";
import { backdropMotionProps, modalMotionProps } from "../../lib/animations/motionAnimations.ts";
import { PostUserCard } from "./tweetInfo/PostUserCard.tsx";
import { ReplyingTo } from "./tweetInfo/ReplyingTo.tsx";
import { PostLine } from "./tweetInfo/PostLine.tsx";

type FullPostTemplateProps = {
    postId: number;
    fullPost?: boolean;
    showLine?: boolean;
    modalReplyChild?: boolean;
    mainPost?: boolean;
    feedPost? : boolean;
  };
  
  function FullPostTemplate({
    mainPost,
    postId,
    fullPost,
    showLine,
    modalReplyChild,
    feedPost
  }: FullPostTemplateProps) {

    const { data: post } = usePost(postId);
  
    const { data: postUser } = useUser(post?.userId ?? -1);
    const { currentUser } = useCurrentUser();
  


    useEffect(() => {
        if (post && post.id == 47) {
            console.log("Post is: " + JSON.stringify(post))

        }    
    }, [post])



    const retweeted = currentUser?.retweets.includes(postId);

    const navigate = useNavigate();

    const navigateToPost = () => {
        if (!fullPost) {
            navigate("/tweet/" + postId)
        }
    }


    return (

        
        <>
        {post && (
            <>
            {/* check this out do i need border //TODO*/}
            <div onClick={() => navigateToPost()} className={`flex flex-col w-full border-gray-700 ${!showLine || (!mainPost && fullPost) ? "border-b pb-1" : ""}`}>

                {post.parentId && feedPost && (
                    <FullPostTemplate
                    postId={post.parentId}
                    showLine={true}
                    />
                )}

                <div className={`grid ${!fullPost && "hover:cursor-pointer hover:bg-twitterTextAlt/20"} px-4 pt-3 grid-cols-[auto_1fr] border-twitterBorder gap-x-3 w-full`}>    
                    
                    {retweeted && !fullPost && (
                        <YouReposted reposterId={currentUser?.id}/>
                    )}
                
                {/* LEFT COLUMN: Profile Pic */}
                <div className="relative w-12 flex justify-center">
                    <div className="w-12 h-12">
                        <ProfilePic userId={postUser?.id} />
                    </div>
                    
                    {showLine && (
                        <div className="absolute top-12 bottom-0 w-px bg-gray-600" />
                    )}
                </div>

                <div className="flex flex-col w-full">
                    
                    <div className="flex flex-col">
                    <PostUserCard postId={postId} postUserId={postUser?.id} fullPost={mainPost}/>
                    {/* {fullPost && (<ReplyingTo parentId={post.parentId} postUserId={postUser?.id}/>)} */}

                    </div> 
                    {!fullPost && (
                    <div className={`text-twitterText whitespace-pre-line break-words mb-2`}>
                    <p onClick={() => navigate("/tweet/"+postId)}>{post.text}</p>
                    </div>
                    )}
                </div>
                {mainPost && <div></div>}
                {/* {mainPost && (<ReplyingTo adjustGridCol={true} parentId={post.parentId} postUserId={postUser?.id}/>)}  */}
                
                {mainPost && (
                    <div className="pl-2 col-span-2 flex flex-col gap-2 my-2">
                        {mainPost && (<ReplyingTo adjustGridCol={false} parentId={post.parentId} postUserId={postUser?.id}/>)}                    
                    <div className={`text-twitterText col-span-2 whitespace-pre-line break-words text-xl`}>
                    <p className="">{post.text}</p>
                    </div>
                    </div> 
                )}

                <PostLine showLine={showLine}/>

                {post.postMedia?.length > 0 && (
                    <>
                    <div className={`${fullPost ? "col-span-2" : "col-start-2"}`}>
                    <ImagePreviewGrid mediaIds={post.postMedia}/>
                    </div>

                    <div>
                    </div>

                    </>
                )}
                
                {!modalReplyChild ? (
                    <div className={`w-full ${mainPost ? "col-span-2" : ""}  text-lg border-twitterBorder`}>
                    <PostInteractionComponent
                        showPadding={mainPost && fullPost && true}
                        postId={post.id}
                    />
                    </div> 
                ) : (
                    <div className="text-twitterTextAlt">
                        <p>Replying to <span className="text-(--color-main)">@{postUser?.username}</span></p>
                    </div>    
                )}



                </div>

                </div>

            </>
        )}

        


        </>

    )

}

export default React.memo(FullPostTemplate);