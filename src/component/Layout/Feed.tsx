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
}

function Feed ({postIdsArray, replyFeedParentId} : FeedProps) {

    const {postCache, getPostFromCache, addToPostCache, fetchPostsFromServerById} = usePostCache();
    const {getUserFromCache, getOrFetchUserById} = useUserCache();
    const [batchFetched, setBatchFetched] = useState<boolean>(false);
    const [usersReady, setUsersReady] = useState(false);

    const [loadingBuffered, setLoadingBuffered] = useState(false);

    useEffect(() => {
        console.log("FEED LOG: Has loaded users? " + batchFetched + " HAS LOADED POSTS? : " + " POSTIDSARRAY? ") 
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

        if (notFoundPostIds.length > 0) {
            const fetchedPosts = await fetchPostsFromServerById(notFoundPostIds);
            fetchedPosts.forEach(addToPostCache);
        }

        setBatchFetched(true);
        }

      useEffect(() => {

        if (!postIdsArray) return;

        const preloadUsers = async () => {
          const neededUserIds = postIdsArray
            .map(id => getPostFromCache(id))
            .filter(Boolean)
            .map(post => post!.userId)
            .filter(userId => !getUserFromCache(userId));
      
          await Promise.all(neededUserIds.map(uid => getOrFetchUserById(uid)));
      
          setUsersReady(true);
        };
      
        if (loadingBuffered && batchFetched && postIdsArray?.every(id => getPostFromCache(id))) {
          preloadUsers();
        }
      }, [loadingBuffered, batchFetched, postIdsArray]);


      return (
        <div className="w-full">
          {loadingBuffered && batchFetched && postIdsArray && usersReady &&
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
                      <FullPostTemplate feedPost={true} postId={postId} parentId={replyFeedParentId} />
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