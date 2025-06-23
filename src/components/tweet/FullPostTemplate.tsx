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
import { AnimatePresence, motion, type Variants } from "framer-motion";

type FullPostTemplateProps = {
    postId: number;
    isReplyFeedPost?: boolean;
    showLine?: boolean;
    isModal?: boolean;
    isMainPost?: boolean;
    isTweetsFeedPost? : boolean;
    isParentPost? : boolean;
  };
  
  function FullPostTemplate({
    postId,
    isMainPost,
    isModal,
    isReplyFeedPost,
    isTweetsFeedPost,
    isParentPost,

  }: FullPostTemplateProps) {

    const { data: post } = usePost(postId);
  
    const { data: postUser } = useUser(post?.userId ?? -1);
    const { currentUser } = useCurrentUser();

    
  


    useEffect(() => {
        if (post && post.id == 47) {
            console.log("Post is: " + JSON.stringify(post))

        }    
    }, [post])

    const variants: Variants = {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.8 } },
      exit: { opacity: 0, transition: { duration: 0.2 } }
    };



    const retweeted = currentUser?.retweets.includes(postId);

    const navigate = useNavigate();

    const navigateToPost = () => {
        if (!isMainPost) {
            navigate("/tweet/" + postId)
        }
    }


    return (

        
        <>
        {post && (
            <motion.div
            {...(!isModal ? { ...variants, layout: 'position' } : {})}
            animate={{
              ...variants.animate,
              ...(post.parentId && !isMainPost && { transition: { duration: 0.2 } })
            }}
            >
            <div onClick={() => navigateToPost()} className={`flex flex-col w-full border-gray-700 ${!isParentPost || (!isMainPost) ? "border-b" : ""}`}>

                {post.parentId && (isReplyFeedPost || isMainPost) && !isParentPost && (
                    <FullPostTemplate
                    postId={post.parentId}
                    showLine={true}
                    isParentPost={true}
                    />
                )}

                <div className={`grid ${!isMainPost && "hover:cursor-pointer hover:bg-twitterTextAlt/20"} px-4 pt-3 grid-cols-[auto_1fr] border-twitterBorder gap-x-3 w-full`}>    
                    
                    {/* NOT TWEETS POST */}
                    {retweeted && isTweetsFeedPost && (
                        <YouReposted reposterId={currentUser?.id}/>
                    )}
                
                {/* TOP ROW */}
                <div className="relative w-12 flex justify-center">
                    <div className="w-12 h-12">
                        <ProfilePic userId={postUser?.id} />
                    </div>
                    
                    {isParentPost && (
                        <div className="absolute top-12 bottom-0 w-px bg-gray-600" />
                    )}
                </div>

                <div className="flex flex-col w-full">
                    
                    <div className="flex flex-col">
                    <PostUserCard postId={postId} postUserId={postUser?.id} mainPost={isMainPost}/>
                    {/* Reply feed Post!!!!! */}
                    {isReplyFeedPost && post.parentId && <ReplyingTo adjustGridCol={false} parentId={post.parentId} postUserId={postUser?.id}/>}
                    </div> 
                    {/* !MainPost!!!!! */}
                    {!isMainPost && (
                    <div className={`text-twitterText whitespace-pre-line break-words mb-2`}>
                    <p onClick={() => navigate("/tweet/"+postId)}>{post.text}</p>
                    </div>
                    )}
                </div>


                {/* SECOND ROW */}
                {/* !MainPost!!!!! */}
                {isMainPost && (<ReplyingTo adjustGridCol={false} parentId={post.parentId} postUserId={postUser?.id}/>)}                    

                {/* THIRD ROW ROW */}
                {/* !MainPost!!!!! */}
                {isMainPost && (
                    <div className="pl-2 col-span-2 flex flex-col gap-2 my-2 whitespace-pre-line break-words text-xl">
                    <p className="">{post.text}</p>
                    </div> 
                )}

                {/* parentPost!!!!! */}
                {isParentPost && post.postMedia?.length > 0 && <PostLine showLine={isParentPost}/>}

                {/* FOURTH ROW */}
                {post.postMedia?.length > 0 && (
                    <>
                    <div className={`${isMainPost ? "col-span-2" : "col-start-2"}`}>
                    <ImagePreviewGrid mediaIds={post.postMedia}/>
                    </div>

                    </>
                )}
                
                {/* parentPost!!!!! */}
                <PostLine showLine={isParentPost}/>
                {/* FIFTH ROW */}
                {!isModal ? (
                  <>
                  <div className={`w-full ${isMainPost ? "col-span-2" : "col-start-2"}  text-lg border-twitterBorder`}>
                    <PostInteractionComponent
                        showPadding={isMainPost}
                        postId={post.id}
                    />
                  </div> 
                    </>
                ) : (
                    <div className="text-twitterTextAlt">
                        <p>Replying to <span className="text-(--color-main)">@{postUser?.username}</span></p>
                    </div>    
                )}



                </div>
                </div>

            </motion.div>
        )}

        


        </>

    )

}

export default React.memo(FullPostTemplate);