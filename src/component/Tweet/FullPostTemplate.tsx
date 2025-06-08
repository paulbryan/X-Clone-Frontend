import { useEffect, useState } from "react";
import type { Post } from "../../types/Post";
import type { User } from "../../types/User";
import { useCurrentUser } from "../../context/currentUser/CurrentUserProvider";
import { usePostCache } from "../../context/cache/PostCacheProvider";
import UsernameComponent from "../UserInfo/UsernameComponent";
import PostInteractionComponent from "./PostInteractionComponent";
import ProfilePic from "../UserInfo/ProfilePic";
import { useUserCache } from "../../context/cache/UserCacheProvider";
import DisplayNameComponent from "../UserInfo/DisplayNameComponent";
import CreatedAtDisplay from "../UIComponent/CreatedAtDisplay";
import { useNavigate } from "react-router-dom";
import InputFormField from "../InputComponent/InputFormField";
import ComposePost from "../Modal/ComposePost";
import ComposeTweet from "./ComposeTweet";
import Feed from "../Layout/Feed";
import { useModal } from "../../context/misc/ModalProvider";
import { motion, AnimatePresence } from "framer-motion";

type FullPostTemplateProps = {
    postId: number;
    parentId?: number;
    fullPost?: boolean;
    showLine?: boolean;
    feedPost?: boolean;
}

function FullPostTemplate ({postId, parentId, fullPost, showLine, feedPost} : FullPostTemplateProps) {

    const {getUserFromCache, getOrFetchUserById} = useUserCache();
    const {getOrFetchPostById, getPostFromCache} = usePostCache();
    const [postUser, setPostUser] = useState<User | null>(() => {
        const post = getPostFromCache(postId);
        if (!post) return null;
        return getUserFromCache(post.userId) ?? null;
      });
    const [post, setPost] = useState<Post | null>(() => getPostFromCache(postId) ?? null);
    const [inputValue, setInputValue] = useState("");

    const [isMainPost, setIsMainPost] = useState(false);
    const {modalType, modalData, setModalType} = useModal();

    function setNewPost(post: Post) {

        if (post) {
            setPost(post);
        }

    }

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

    useEffect(() => {

        if (post) return;

        const loadPost = async () => {
          try {
            const fetched = await getOrFetchPostById(postId);
            setPost(fetched);
          } catch (err) {
            console.error(err);
          }
        };
      
        loadPost();

    }, [post])

    useEffect(() => {

        if (post && postUser) return;
        if (!post) return;
        const loadUser = async () => {
            try {
                const fetched = await getOrFetchUserById(post.userId);
                setPostUser(fetched);
            } catch (err) {
                console.error(err);
              }
        }
        loadUser();

    }, [post])
    


    return (

        
        <>

        {post && (
            <>
            <div className={`flex flex-col ${!feedPost ? "pb-4 pt-2" : "border-b py-4"} w-full border-gray-700`}>

            {fullPost && postId !== parentId && post.parentId && (
                <FullPostTemplate postId={post.parentId} showLine={true} parentId={postId} />
            )}

                <div className={`grid px-4 grid-cols-[auto_1fr] ${fullPost && "border-b pb-3"} border-(--twitter-border) gap-x-3 w-full`}>            {/* LEFT COLUMN: Profile Pic */}
                <div className="relative w-12 flex justify-center">
                    <div
                        className="h-12 w-12 cursor-pointer"
                        onClick={() => navigate(`/profile/${post.userId}`)}
                    >
                        <ProfilePic user={postUser} />
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
                </div>

                <div className={`grid px-4 grid-cols-[auto_1fr] ${!showLine && !feedPost && "border-b"} border-(--twitter-border) gap-x-3 w-full`}>
                <div className="relative w-12">
                {showLine && (
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gray-600" />
                )}
                </div>
                    <div className={`w-full ${!feedPost && "pb-3"} text-lg border-(--twitter-border)`}>
                    <PostInteractionComponent
                        setNewPost={setNewPost}
                        postId={post.id}
                        likeList={post.likedBy}
                        bookmarkList={post.bookmarkedBy}
                        replyList={post.replies}
                    />
                    </div> 
                </div>


                {fullPost && (
                    <>
                    <ComposeTweet parentId={postId} parentUsername={postUser?.username} setNewPost={setNewPost}/>
                    <Feed replyFeedParentId={postId} postIdsArray={post.replies}/>
                    </>
               )}





                </div>

                {modalType == "replying" && modalData == postId && (
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
                    <ComposeTweet parentId={postId} setNewPost={setNewPost} setToggle={setModalType}/>
                  </motion.div>
      
              </motion.div>
            )}

            </>
        )}

        


        </>

    )

}

export default FullPostTemplate;