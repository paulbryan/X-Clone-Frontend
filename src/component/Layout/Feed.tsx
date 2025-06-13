import { useEffect, useState } from "react";
import PostTemplate from "../Tweet/PostTemplate";
import type { Post } from "../../types/Post";
import { usePostCache } from "../../context/cache/PostCacheProvider";
import { useUserCache } from "../../context/cache/UserCacheProvider";
import { useCurrentUser } from "../../context/currentUser/CurrentUserProvider";
import LoadingIcon from "../UIComponent/LoadingIcon";
import FullPostTemplate from "../Tweet/FullPostTemplate";
import { AnimatePresence, motion } from "framer-motion";


type FeedProps = {
    postIdsArray?: number[];
    replyFeedParentId?: number;
    showAsMainPost?: boolean;
}

function Feed ({postIdsArray, showAsMainPost, replyFeedParentId} : FeedProps) {

    const {postCache, getPostFromCache, addToPostCache, fetchPostsFromServerById} = usePostCache();
    const {getUserFromCache, getOrFetchUserById, userCache} = useUserCache();
    const [batchFetched, setBatchFetched] = useState<boolean>(false);
    const [usersReady, setUsersReady] = useState(false);

    const [loadingBuffered, setLoadingBuffered] = useState(false);

    useEffect(() => {
            console.log("Buffering timeout")
            setTimeout(() => {
                setLoadingBuffered(true);
            }, 200)
    }, [])

    useEffect(() => {
        preFetchBatch();
    }, [postIdsArray, postCache])

    
    async function preFetchBatch() {
    console.log("Fetching batch")
    console.log("Post ids array is" + postIdsArray)
    if (!postIdsArray) return;

    const notFoundPostIds = postIdsArray.filter(id => !getPostFromCache(id));
    
    console.log("NotfoundIds is " + notFoundPostIds)


    if (notFoundPostIds.length > 0) {
        const fetchedPosts = await fetchPostsFromServerById(notFoundPostIds);
        fetchedPosts.forEach(addToPostCache);
        console.log("Fetched posts is " + JSON.stringify(fetchedPosts))

    }


    setBatchFetched(true);
    }

    useEffect(() => {
      if (!postIdsArray || postIdsArray.length === 0) return;
      if (!usersReady && loadingBuffered && batchFetched) {
        const allPostsAvailable = postIdsArray.every(id => getPostFromCache(id));
        if (!allPostsAvailable) {
          console.log("Delaying preloadUsers: posts not fully cached yet");
          return;
        }
    
        const preloadUsers = async () => {
          const posts = postIdsArray
            .map(id => getPostFromCache(id))
            .filter((p): p is Post => p !== undefined);
    
          const uniqueUserIds = [...new Set(posts.map(post => post.userId))];
          const missingUserIds = uniqueUserIds.filter(uid => !getUserFromCache(uid));
    
          console.log("Users to fetch:", missingUserIds);
    
          if (missingUserIds.length === 0) {
            setUsersReady(true);
            return;
          }
    
          await Promise.all(missingUserIds.map(uid => getOrFetchUserById(uid)));
    
          const allCached = uniqueUserIds.every(uid => getUserFromCache(uid));
          if (!allCached) {
            console.warn("Some users still missing:", uniqueUserIds.filter(uid => !getUserFromCache(uid)));
            return;
          }
    
          setUsersReady(true);
        };
    
        preloadUsers();
      }
    }, [loadingBuffered, batchFetched, postIdsArray, usersReady]);


      useEffect(() => {
        console.log(
          "Users ready is: " + usersReady + 
          " batchFetched is " + batchFetched + 
          " postIdsArray is: " + postIdsArray +
          "loadingBuffered is: " + loadingBuffered +
          " Post cache is: " + Array.from(postCache.entries()) + 
          " User cache is " + Array.from(userCache.entries()) + " END"

        )
      }, [usersReady, postIdsArray, loadingBuffered, batchFetched, postCache, userCache])


      return (
        <div className="w-full">
          {loadingBuffered && batchFetched && postIdsArray &&
            postIdsArray.every(postId => {
              const post = getPostFromCache(postId);
              return post && getUserFromCache(post.userId);
            }) ? (
              <AnimatePresence mode="popLayout">
                <div className="flex flex-col-reverse w-full">
                  {postIdsArray.map((postId) => (
                    <motion.div
                      key={postId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                      layout
                    >
                      <FullPostTemplate mainPost={showAsMainPost} feedPost={true} postId={postId} parentId={replyFeedParentId} />
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            ) : (
              <div className="flex justify-center py-2 flex-col w-full">
                <LoadingIcon />
              </div>
            )}
        </div>
      );

}

export default Feed;