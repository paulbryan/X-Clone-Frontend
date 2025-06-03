import { useEffect, useState } from "react";
import PostTemplate from "./UIComponent/PostTemplate";
import type { Post } from "../types/Post";
import PostSkeleton from "./UIComponent/PostSkeleton";
import { usePostCache } from "./Context/PostCacheProvider";
import type { User } from "../types/User";
import { useUserCache } from "./Context/UserCacheProvider";
import { useCurrentUser } from "./Context/CurrentUserProvider";
import LoadingIcon from "./UIComponent/LoadingIcon";


type FeedProps = {
    postIdsArray?: number[];
}

function Feed ({postIdsArray} : FeedProps) {

    const {postCache, getPostFromCache, addToPostCache, fetchPostsFromServerById} = usePostCache();
    const {userCache, addToUserCache, getUserFromCache, fetchUsersFromServerById} = useUserCache();
    const [loadedPosts, setLoadedPosts] = useState<Post[]>([]);
    const [hasLoadedPosts, setHasLoadedPosts] = useState<boolean>(false);
    const [hasLoadedUsers, setHasLoadedUsers] = useState<boolean>(false);
    const {currentUser} = useCurrentUser();

    const [loadingBuffered, setLoadingBuffered] = useState(false);

    useEffect(() => {
        console.log("Has loaded users? " + hasLoadedUsers + " HAS LOADED POSTS? : " + hasLoadedPosts + " POSTIDSARRAY? " + JSON.stringify(postIdsArray)) 
        if (hasLoadedPosts && hasLoadedUsers) {
            console.log("Buffering timeout")
            setTimeout(() => {
                setLoadingBuffered(true);
            }, 200)
        }
    }, [hasLoadedPosts, hasLoadedUsers])

    useEffect(() => {
        console.log("Loaded posts: " + JSON.stringify(loadedPosts))
    }, [loadedPosts])

    useEffect(() => {
        console.log("Calling load")
        loadPosts();
    }, [postIdsArray, postCache])

    async function loadPosts () {
        if (!postIdsArray) return;
    
        const notFoundPosts : number[] = [];
    
        for (let i = 0; i < postIdsArray.length; i++) {
            const post = getPostFromCache(postIdsArray[i]);
            if (!post){
                notFoundPosts.push(postIdsArray[i]);
            }
        }
    
        if (notFoundPosts.length > 0) {
            await fetchUnloadedPosts(notFoundPosts);
        }
    
        const finalPostArray : Post[] = [];
        for (let i = 0; i < postIdsArray.length; i++) {
            const post = getPostFromCache(postIdsArray[i]);
            if (post) finalPostArray.push(post);
        }

        console.log("PIARRAY: " + JSON.stringify(postIdsArray))

        console.log("FPA: " + JSON.stringify(finalPostArray))

    
        setLoadedPosts(finalPostArray);
        setHasLoadedPosts(true);

        console.log("Loaded posts" + JSON.stringify(loadedPosts))
    
        await loadUsers(finalPostArray);
        setHasLoadedUsers(true);
    }
 
    async function loadUsers(posts: Post[]) {
        const notFoundUsers : number[] = [];
    
        for (const post of posts) {
            const posterId = post.userId;
            const poster = getUserFromCache(posterId);
            if (!poster && (!currentUser || currentUser.id !== posterId)) {
                notFoundUsers.push(posterId);
            }
        }
    
        if (notFoundUsers.length > 0) {
            await fetchUnloadedUsers(notFoundUsers);
        }
    }

    async function fetchUnloadedPosts (notFoundPosts : number[]) {

        const fetchedPosts: Post[] = await fetchPostsFromServerById(notFoundPosts);
        console.log("starting add to cache")
        for (let i = 0; i < fetchedPosts.length; i++) {
            console.log("Adding to cache: " + JSON.stringify(fetchedPosts[i]))
            addToPostCache(fetchedPosts[i]);
        }

    }

    async function fetchUnloadedUsers (notFoundUsers : number[]) {

        const fetchedUsers: User[] = await fetchUsersFromServerById(notFoundUsers);
        for (let i = 0; i < fetchedUsers.length; i++) {

            addToUserCache(fetchedUsers[i]);
        }

    }

    return (
        <div className='w-full'>
            {loadingBuffered && postIdsArray && hasLoadedPosts && hasLoadedUsers &&
            loadedPosts.every(post => getUserFromCache(post.userId)) ? (
                <div className="flex flex-col-reverse w-full">
                {loadedPosts.map((post) => (
                    <PostTemplate post={post} currentPostUser={getUserFromCache(post.userId)} />
                ))}
                </div>
            ) : (
                <div className="flex justify-center py-2 flex-col w-full">
                    <LoadingIcon />
                </div>
            )}
        </div>
    )

}

export default Feed;