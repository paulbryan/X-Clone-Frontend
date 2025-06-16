import UsernameComponent from "../UserInfo/UsernameComponent";
import PostInteractionComponent from "./PostInteractionComponent";
import ProfilePic from "../UserInfo/ProfilePic";
import DisplayNameComponent from "../UserInfo/DisplayNameComponent";
import CreatedAtDisplay from "../UIComponent/CreatedAtDisplay";
import { useNavigate } from "react-router-dom";
import ComposeTweet from "./ComposeTweet";
import { FaRepeat } from "react-icons/fa6";
import Feed from "../Layout/Feed";
import { useModal } from "../../context/GlobalState/ModalProvider";
import { motion } from "framer-motion";
import { HeaderContentContext } from "../../context/GlobalState/HeaderContentProvider";
import React, { useContext, useEffect } from "react";
import { usePost } from "../../hooks/queries/usePost";
import { useUser } from "../../hooks/queries/useUser";
import { useCurrentUser } from "../../hooks/queries/CurrentUserProvider";
import { ImagePreviewGrid } from "../Layout/ImagePreviewGrid";

type FullPostTemplateProps = {
    postId: number;
    fullPost?: boolean;
    showLine?: boolean;
    modalReplyChild?: boolean;
    mainPost?: boolean;
  };
  
  function FullPostTemplate({
    mainPost,
    postId,
    fullPost,
    showLine,
    modalReplyChild,
  }: FullPostTemplateProps) {

    const { data: post } = usePost(postId);
  
    const { data: postUser } = useUser(post?.userId ?? -1);
    const { currentUser } = useCurrentUser();
  
    useEffect(() => {
      if (fullPost && post) {
        setHeaderContent(<p>{post.parentId ? "Thread" : "Tweet"}</p>);
        console.log("Post in render:", post.bookmarkedBy);
      }
    }, [fullPost, post]);

    useEffect(() => {
        if (post && post.id == 47) {
            console.log("Post is: " + JSON.stringify(post))

        }    
    }, [post])


    const {modalType, modalData, setModalType} = useModal();

    const retweeted = currentUser?.retweets.includes(postId);

    const {setHeaderContent} = useContext(HeaderContentContext);

    const backdropVariant = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      };
      
      const modalVariant = {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.3 } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
      };

    const navigate = useNavigate();


    return (

        
        <>
        {post && (
            <>
            {/* check this out do i need border //TODO*/}
            <div className={`flex flex-col w-full border-gray-700 ${!showLine || (!mainPost && fullPost) ? "border-b pb-1" : ""}`}>


            {mainPost && post.parentId && (
                <FullPostTemplate
                    postId={post.parentId}
                    showLine={true}
                />
                )}

                <div className={`grid px-4 pt-3 grid-cols-[auto_1fr] border-(--twitter-border) gap-x-3 w-full`}>    
                    
                    {retweeted && fullPost && !mainPost && (
                        <>
                        <div>

                        </div>
                        <div className="flex h-6 items-center gap-2 text-(--twitter-text) w-full">
                            <FaRepeat/>
                            <p>You reposted</p>
                        </div>
                        
                        </>
                    )}
                
                            {/* LEFT COLUMN: Profile Pic */}
                <div className="relative w-12 flex justify-center">
                    <div
                        className="h-12 w-12 cursor-pointer"
                        onClick={() => navigate(`/profile/${post.userId}`)}
                    >
                        <ProfilePic userId={postUser?.id} />
                    </div>

                    {showLine && (
                        <div className="absolute top-12 bottom-0 w-px bg-gray-600" />
                    )}
                </div>

                <div className="flex flex-col w-full">
                    
                    <div className="flex flex-col">
                    <div className={`flex ${fullPost ? "flex-col" : "mb-0.5 gap-2 items-center"}  text-(--text-main) `}>
                        <div className="font-bold">
                        <DisplayNameComponent user={postUser}/>
                        </div>
                    <div className="text-(--twitter-text) text-md">
                        <UsernameComponent user={postUser} />
                    </div>
                    {!fullPost && (
                      <>
                        <p>•</p>
                        <CreatedAtDisplay createdAt={post.createdAt} typeOfCreatedAt="timeago"/>
                      </>  
                    )}
                    </div> 
                    {!fullPost && (post.parentId) && (
                        <div className="text-sm text-(--twitter-text)">
                            <p>Replying to <span className="text-(--color-main)">@{postUser?.username}</span></p>
                        </div>    
                    )}
                    </div> 
                    {!fullPost && (
                    <div className={`text-(--text-main) whitespace-pre-line break-words mb-2`}>
                    <p onClick={() => navigate("/tweet/"+postId)}>{post.text}</p>
                    </div>
                    )}
                </div>
                {fullPost && (post.parentId) && (
                    <div className="text-sm col-span-2 pl-2 text-(--twitter-text)">
                        <p>Replying to <span className="text-(--color-main)">@{postUser?.username}</span></p>
                    </div>    
                )}
                {fullPost && (
                    <div className={`text-(--text-main) col-span-2 whitespace-pre-line break-words pl-2 text-xl my-2`}>
                    <p className="">{post.text}</p>
                    </div> 
                )}

                {showLine ? (
                    <div className="relative w-12">
                        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gray-600" />
                    </div>

                ) : (
                    <div>
                    </div>
                )}

                {post.postMedia?.length > 0 && (
                    <>
                    <div className={`${fullPost ? "col-span-2" : ""}`}>
                    <ImagePreviewGrid mediaIds={post.postMedia}/>
                    </div>

                    <div>
                    </div>

                    </>
                )}
                
                {!modalReplyChild ? (
                    <div className={`w-full  text-lg border-(--twitter-border)`}>
                    <PostInteractionComponent
                        showPadding={mainPost && fullPost && true}
                        retweetedByList={post.retweetedBy}
                        postId={post.id}
                        likeList={post.likedBy}
                        bookmarkList={post.bookmarkedBy}
                        replyList={post.replies}
                    />
                    </div> 
                ) : (
                    <div className="text-(--twitter-text)">
                        <p>Replying to <span className="text-(--color-main)">@{postUser?.username}</span></p>
                    </div>    
                )}



                </div>

                </div>

                {fullPost && (
                    <>
                    {currentUser && (
                    <ComposeTweet parentId={postId} parentUsername={postUser?.username}
                    />
                    )}
                    {post.replies.length > 0 && (
                        <Feed postIdsArray={post.replies} showAsMainPost={false}/>

                    )}
                    </>
               )}

                {modalType == "replying" && modalData == postId && !modalReplyChild && (
              <motion.div 
              key="backdrop"
              className="w-full z-10 h-full top-0 pt-16 px-4 fixed backdrop-blur-sm bg-red
              flex justify-center items-start"
              onClick={() => setModalType(null)} 
              initial="initial"
              animate="animate"
              variants={backdropVariant}
              exit="exit"
               >
      
                  <motion.div 
                    key="modal"
                    className="w-full h-fit"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={modalVariant}
                  onClick={(e) => e.stopPropagation()}
                  >
                    <ComposeTweet parentId={postId} showParentPreview={true} setToggle={setModalType}/>
                  </motion.div>
      
              </motion.div>
            )}

            </>
        )}

        


        </>

    )

}

export default React.memo(FullPostTemplate);