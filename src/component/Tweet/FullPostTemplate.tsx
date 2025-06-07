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

type FullPostTemplateProps = {
    postId: number;
    parentId?: number;
    fullPost?: boolean;
}

function FullPostTemplate ({postId, parentId, fullPost} : FullPostTemplateProps) {

    const {getUserFromCache, getOrFetchUserById} = useUserCache();
    const {getOrFetchPostById, getPostFromCache} = usePostCache();
    const [postUser, setPostUser] = useState<User | null>(() => {
        const post = getPostFromCache(postId);
        if (!post) return null;
        return getUserFromCache(post.userId) ?? null;
      });
    const [post, setPost] = useState<Post | null>(() => getPostFromCache(postId) ?? null);
    const [inputValue, setInputValue] = useState("");

    function setNewPost(post: Post) {

        if (post) {
            setPost(post);
        }

    }

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
            <div className="flex flex-col pt-3 pb-4 w-full border-gray-700">
                <div className="grid px-4 grid-cols-[auto_1fr] pb-3 gap-x-3 w-full">            {/* LEFT COLUMN: Profile Pic */}
                <div className="w-12 h-12 cursor-pointer" onClick={() => navigate(`/profile/${post.userId}`)}>
                    <ProfilePic user={postUser} />
                </div>

                {/* RIGHT COLUMN: Content */}
                <div className="flex flex-col w-full">
                    
                    {fullPost ? (
                    <div className="flex flex-col text-white mb-0.5">
                        <div className="font-bold">
                        <DisplayNameComponent user={postUser}/>
                        </div>
                    <div className="text-(--twitter-text) text-sm">
                        <UsernameComponent user={postUser} />
                    </div>
                    </div>  
                    ) : (
                    <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-white mb-0.5">
                        <div className="font-bold">
                        <DisplayNameComponent user={postUser}/>
                        </div>
                    <div className="text-(--twitter-text) text-sm">
                        <UsernameComponent user={postUser} />
                    </div>
                    <p>•</p>
                    <CreatedAtDisplay createdAt={post.createdAt} typeOfCreatedAt="timeago"/>
                    </div> 
                    {parentId && (
                        <div className="text-sm text-(--twitter-text)">
                            <p>Replying to <span className="text-(--color-main)">@{postUser?.username}</span></p>
                        </div>    
                    )}
                    </div> 
                    )}

                    <div className="text-white whitespace-pre-line break-words mb-2">
                    <p>{post.text}</p>
                    </div>
                </div>
                </div>
                <div className="w-full pr-4 pl-8 pb-3 border-y border-(--twitter-border)">
                <PostInteractionComponent
                    setNewPost={setNewPost}
                    postId={post.id}
                    likeList={post.likedBy}
                    bookmarkList={post.bookmarkedBy}
                />
                </div>

                {postId === 18 && !parentId && (
                    <>
                    <ComposeTweet parentId={postId} parentUsername={postUser?.username}/>
                    <FullPostTemplate postId={17} parentId={postId}/>
                    </>
                )}

                {/* <div className="grid px-4 py-4 grid-cols-[auto_1fr] pb-3 gap-x-3 w-full">
                <div className="w-12 h-12 cursor-pointer" onClick={() => navigate(`/profile/${post.userId}`)}>
                    <ProfilePic user={postUser} />
                </div>
                <div className="flex h-full gap-3 items-center">
                    <InputFormField isTextArea={true} placeholderValue="Tweet your reply" inputValue={inputValue} setInputValue={setInputValue}/>
                    <div className="flex justify-center items-center rounded-2xl border border-r w-20 h-10">
                    
                    </div>
                </div>

                </div> */}

                </div>
            </>
        )}


        </>

    )

}

export default FullPostTemplate;