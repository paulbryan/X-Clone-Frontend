import LoadingIcon from "../../ui/LoadingIcon.tsx";
import { AnimatePresence, motion } from "framer-motion";
import { LoadMoreForFeed } from "../../ui/LoadMoreForFeed.tsx";
import { fadeInFeedMotionProps } from "../../../lib/animations/motionAnimations.ts";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { FeedType } from "../../../lib/types/FeedType.ts";
import { NoContentYet } from "./NoContentYet.tsx";
import type { PostType } from "../../../lib/types/PostType.ts";
import Tweet from "../../tweet/Tweet.tsx";

type FeedProps = {
  postIdsArray: number[];
  isLoading?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  tabType?: FeedType;
  userId?: number;
};

//TODO fix isready logic

function Feed({userId, postIdsArray, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, tabType }: FeedProps) {

  const { ref, inView } = useInView();

  useEffect(() => {
    if (fetchNextPage) {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const postTypeForFeed : PostType | undefined = (tabType == "Replies" ? "ReplyFeedPost" : tabType == "Tweets" ? "TweetFeedPost" : undefined) 

      return (
        <div className="w-full flex flex-col ">
          {isLoading ? (
            <div className="flex justify-center py-2 flex-col w-full">
              <LoadingIcon />
            </div>
            ) : (
              <>
                <div className="flex flex-col w-full" key="feed-wrapper">
                  {postIdsArray.length > 0 ? (
                      <AnimatePresence mode="popLayout">
                  {postIdsArray.map((id) => (
                    <motion.div key={id} {...fadeInFeedMotionProps} layout="position">
                      <Tweet postId={id} postType={postTypeForFeed}/>
                    </motion.div>
                  ))}
                  <LoadMoreForFeed  triggerRef={ref} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage}/>

                      </AnimatePresence>
                  ) : tabType != null && (
                    <NoContentYet userId={userId} tabType={tabType}/>
                  )}                  
                </div>
              </> 
            )}
        </div>
      );

}

export default Feed;