import { useState } from "react";
import type { User } from "../../types/User";
import { usePostCache } from "../Context/PostCacheProvider";
import type { Post } from "../../types/Post";
import PostSkeleton from "../UIComponent/PostSkeleton";
import PostTemplate from "../UIComponent/PostTemplate";

type UserPostsFeedProps = {
    profileUser: User;
}

function UserPostsFeed ({profileUser} : UserPostsFeedProps) {

    const {getPostFromCache, removeFromPostCache, addToPostCache, fetchPostsFromServerById} = usePostCache();

    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const userPostIdsArray : number[] = profileUser.posts;


    async function loadPosts () {

        let notFoundPosts : number[] = [];

        for (let i = 0; i < userPostIdsArray.length; i++) {

            const post = getPostFromCache(userPostIdsArray[i]);

            if (!post){
                notFoundPosts.push(userPostIdsArray[i])
            }

        }

        if (notFoundPosts.length > 0) {

            await fetchUnloadedPosts(notFoundPosts);
            
        } else {
            for (let i = 0; i < userPostIdsArray.length; i++) {
                const post = getPostFromCache(userPostIdsArray[i]);
                if (post) {
                    setUserPosts([...userPosts, post]);
                }

            }
        }

    }

    async function fetchUnloadedPosts (notFoundPosts : number[]) {

        const fetchedPosts: Post[] = await fetchPostsFromServerById(notFoundPosts);
        for (let i = 0; i < fetchedPosts.length; i++) {
            addToPostCache(fetchedPosts[i]);
        }

    }

    

 
    return (
        <>
            {userPostIdsArray.length < 1 ? (
                <div>
                    <p>No posts yet</p>
                </div>
            ) : userPostIdsArray.length == userPosts.length ? (
                <>
                {userPosts.map((post) => {
                    <PostTemplate  post={post}/>
                })}
                </>
            ) : (
                <>
                {userPostIdsArray.map(() => {
                    <PostSkeleton/>
                })}
                </>
            )} 
        </>
    )

}

export default UserPostsFeed;