import PostInteractionComponent from "./PostInteractionComponent";
import ProfilePic from "../UserInfo/ProfilePic";
import { useNavigate } from "react-router-dom";
import ComposeTweet from "./ComposeTweet";
import { useModal } from "../../context/GlobalState/ModalProvider";
import { motion } from "framer-motion";
import { HeaderContentContext } from "../../context/GlobalState/HeaderContentProvider";
import React, { useContext, useEffect } from "react";
import { usePost } from "../../hooks/queries/usePost";
import { useUser } from "../../hooks/queries/useUser";
import { useCurrentUser } from "../../hooks/queries/CurrentUserProvider";
import { ImagePreviewGrid } from "../Layout/ImagePreviewGrid";
import { YouReposted } from "./YouReposted";
import { backdropMotionProps, modalMotionProps } from "../../lib/animations/motionAnimations";
import { PostUserCard } from "./PostUserCard";
import { ReplyingTo } from "./ReplyingTo";
import { PostLine } from "./PostLine";

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


    const {modalType, modalData, setModalType} = useModal();

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

                <div className={`grid ${!fullPost && "hover:cursor-pointer hover:bg-(--twitter-text)/20"} px-4 pt-3 grid-cols-[auto_1fr] border-(--twitter-border) gap-x-3 w-full`}>    
                    
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
                    <div className={`text-(--text-main) whitespace-pre-line break-words mb-2`}>
                    <p onClick={() => navigate("/tweet/"+postId)}>{post.text}</p>
                    </div>
                    )}
                </div>
                {mainPost && <div></div>}
                {/* {mainPost && (<ReplyingTo adjustGridCol={true} parentId={post.parentId} postUserId={postUser?.id}/>)}  */}
                
                {mainPost && (
                    <div className="pl-2 col-span-2 flex flex-col gap-2 my-2">
                        {mainPost && (<ReplyingTo adjustGridCol={false} parentId={post.parentId} postUserId={postUser?.id}/>)}                    
                    <div className={`text-(--text-main) col-span-2 whitespace-pre-line break-words text-xl`}>
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
                    <div className={`w-full ${mainPost ? "col-span-2" : ""}  text-lg border-(--twitter-border)`}>
                    <PostInteractionComponent
                        showPadding={mainPost && fullPost && true}
                        postId={post.id}
                    />
                    </div> 
                ) : (
                    <div className="text-(--twitter-text)">
                        <p>Replying to <span className="text-(--color-main)">@{postUser?.username}</span></p>
                    </div>    
                )}



                </div>

                </div>

                {modalType == "replying" && modalData == postId && !modalReplyChild && (
              <motion.div 
              key="backdrop"
              className="w-full z-10 h-full top-0 pt-16 px-4 fixed backdrop-blur-sm bg-red
              flex justify-center items-start"
              onClick={() => setModalType(null)} 
              {...backdropMotionProps}      
               >
      
                  <motion.div 
                    key="modal"
                    className="w-full h-fit"
                    {...modalMotionProps}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ComposeTweet parentId={postId} showParentPreview={true} setToggle={setModalType}/>
                  </motion.div>
      
              </motion.div>
            )}

            </>
        )}

        <ModalPort

        


        </>

    )

}

export default React.memo(FullPostTemplate);