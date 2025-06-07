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

type PostTemplateProps = {
    postId: number;
}

function PostTemplate ({postId} : PostTemplateProps) {

    const {getUserFromCache, getOrFetchUserById} = useUserCache();
    const {getOrFetchPostById, getPostFromCache} = usePostCache();
    const [postUser, setPostUser] = useState<User | null>(() => {
        const post = getPostFromCache(postId);
        if (!post) return null;
        return getUserFromCache(post.userId) ?? null;
      });
    const [post, setPost] = useState<Post | null>(() => getPostFromCache(postId) ?? null);

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
            <div className="grid grid-cols-[48px_1fr] gap-x-3 px-4 pt-3 pb-4 w-full border-b border-gray-700">            {/* LEFT COLUMN: Profile Pic */}
            <div className="w-12 h-12 cursor-pointer" onClick={() => navigate(`/profile/${post.userId}`)}>
                <ProfilePic user={postUser} />
            </div>

            {/* RIGHT COLUMN: Content */}
            <div className="flex flex-col w-full">
                <div className="flex items-center gap-2 text-white mb-0.5">
                <DisplayNameComponent user={postUser} />
                <div className="text-(--twitter-text)">
                    <UsernameComponent user={postUser} />
                </div>
                <p>·</p>
                <CreatedAtDisplay createdAt={post.createdAt} typeOfCreatedAt="timeago" />
                </div>

                <div className="text-white whitespace-pre-line break-words mb-2">
                <p onClick={() => navigate("tweet/" + postId)}>{post.text}</p>
                </div>

                <PostInteractionComponent
                setNewPost={setNewPost}
                postId={post.id}
                likeList={post.likedBy}
                bookmarkList={post.bookmarkedBy}
                replyList={post.replies}
                />
            </div>
            </div>
        )}


        </>

    )

}

export default PostTemplate;