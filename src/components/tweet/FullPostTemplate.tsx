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
import { motion, type Variants } from "framer-motion";
import type { PostType } from "../../lib/types/PostType.ts";
import { TweetMainRow } from "./TweetLayout/TweetMainRow.tsx";
import { ExtraMainTweetRows } from "./TweetLayout/ExtraMainTweetRows.tsx";
import { TweetImagesRow } from "./TweetLayout/TweetImagesRow.tsx";

type FullPostTemplateProps = {
    postId: number;
    isModal?: boolean;
    isParentPost? : boolean;
    postType?: PostType;
  };
  
  function FullPostTemplate({
    postId,
    isModal,
    isParentPost,
    postType

  }: FullPostTemplateProps) {

    const { data: post } = usePost(postId);
  
    const { data: postUser } = useUser(post?.userId ?? -1);
    const { currentUser } = useCurrentUser();

    const retweeted = currentUser?.retweets.includes(postId);

    const isMainPost = postType == "MainPost";
    const isReplyFeedPost = postType == "ReplyFeedPost";
    const isTweetsFeedPost = retweeted && (postType == "TweetFeedPost");
    const hasImages = post && post.postMedia?.length > 0;

    const variants: Variants = {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.8 } },
      exit: { opacity: 0, transition: { duration: 0.2 } }
    };


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
            <div onClick={() => navigateToPost()} className={`flex flex-col w-full border-gray-700 ${!isParentPost ? "border-b" : ""}`}>

                {post.parentId && (isReplyFeedPost || isMainPost) && !isParentPost && (
                    <FullPostTemplate
                    postId={post.parentId}
                    isParentPost={true}
                    />
                )}

                <div className={`grid ${!isMainPost && "hover:cursor-pointer hover:bg-twitterTextAlt/20"} px-4 pt-3 grid-cols-[auto_1fr] border-twitterBorder gap-x-3 w-full`}>    
                
                {/* SEPERATE ROW FOR YOU REPOSTED - ONLY ON "TWEETS" FEED POSTS     */}
                {isTweetsFeedPost && (<YouReposted reposterId={currentUser?.id}/>)}
                
                {/* CORE ROW - SHOWS PROFILE PIC, User's names, and optionally post text */}
                <TweetMainRow post={post} postUser={postUser} isMainPost={isMainPost} isParentPost={isParentPost}/>

                {/* EXTRA ROW - ONLY FOR MAIN POSTS, shows post text on seperate rows */}
                {isMainPost && <ExtraMainTweetRows post={post} postUser={postUser}/>}

                {/* FOURTH ROW - SHOWS IMAGES */}
                {hasImages && <TweetImagesRow post={post} isParentPost={isParentPost} isMainPost={isMainPost}/>}
                
                <PostLine showLine={isParentPost}/>
                
                {/* FIFTH ROW - SHOWS POST INTERACTIONS IF NOT A REPLY */}
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