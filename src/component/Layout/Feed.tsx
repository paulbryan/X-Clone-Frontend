import { useEffect, useState } from "react";
import PostTemplate from "../Tweet/PostTemplate";
import type { Post } from "../../types/Post";
import { usePostCache } from "../../context/cache/PostCacheProvider";
import { useUserCache } from "../../context/cache/UserCacheProvider";
import { useCurrentUser } from "../../context/currentUser/CurrentUserProvider";
import LoadingIcon from "../UIComponent/LoadingIcon";


type FeedProps = {
    postIdsArray?: number[];
}

function Feed ({postIdsArray} : FeedProps) {

    const {postCache, getPostFromCache, addToPostCache, fetchPostsFromServerById} = usePostCache();
    const {addToUserCache, getUserFromCache, fetchUsersFromServerById} = useUserCache();
    const [loadedPosts, setLoadedPosts] = useState<Post[]>([]);
    const [hasFetchedUsers, setHasFetchedUsers] = useState<boolean>(false);
    const {currentUser} = useCurrentUser();

    const [loadingBuffered, setLoadingBuffered] = useState(false);

    useEffect(() => {
        console.log("FEED LOG: Has loaded users? " + hasFetchedUsers + " HAS LOADED POSTS? : " + " POSTIDSARRAY? ") 
            console.log("Buffering timeout")
            setTimeout(() => {
                setLoadingBuffered(true);
            }, 200)
    }, [])

    useEffect(() => {
        preFetchBatch();
    }, [postIdsArray, postCache])

    async function preFetchBatch() {
        if (!postIdsArray) return;
      
        const notFoundPostIds = postIdsArray.filter(id => !getPostFromCache(id));
        const fetchedPosts = notFoundPostIds.length > 0
          ? await fetchPostsFromServerById(notFoundPostIds)
          : [];
      
        fetchedPosts.forEach(addToPostCache);
      
        const finalPosts = postIdsArray
        .map(id => getPostFromCache(id))
        .filter(post => post !== undefined);
        setLoadedPosts(finalPosts);
      
        const notFoundUsers = finalPosts
          .map(p => p.userId)
          .filter((id, i, arr) =>
            (!getUserFromCache(id) && (!currentUser || currentUser.id !== id)) &&
            arr.indexOf(id) === i // dedupe
          );
      
        if (notFoundUsers.length > 0) {
          const fetchedUsers = await fetchUsersFromServerById(notFoundUsers);
          fetchedUsers.forEach(addToUserCache);
        }
      
        setHasFetchedUsers(true);
      }


    return (
        <div className='w-full'>
            {loadingBuffered && postIdsArray && hasFetchedUsers &&
            loadedPosts.every(post => getUserFromCache(post.userId)) ? (
                <div className="flex flex-col-reverse w-full">
                {loadedPosts.map((post) => (
                    <PostTemplate key={post.id} post={post} currentPostUser={getUserFromCache(post.userId)} />
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