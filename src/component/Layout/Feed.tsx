import LoadingIcon from "../UIComponent/LoadingIcon";
import FullPostTemplate from "../Tweet/FullPostTemplate";
import { AnimatePresence, motion } from "framer-motion";
import { LoadMoreForFeed } from "./LoadMoreForFeed";
import { fadeInFeedMotionProps } from "../../lib/animations/motionAnimations";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { MediaFeed } from "./MediaFeed";
import type { FeedType } from "../../types/FeedType";
import { NoContentYet } from "../Feed/NoContentYet";

type FeedProps = {
  postIdsArray: number[];
  showAsMainPost?: boolean;
  isLoading?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  feedPost?: boolean;
  tabType?: FeedType;
  userId?: number;
};

//TODO fix isready logic

function Feed({userId, postIdsArray, showAsMainPost, fetchNextPage, hasNextPage, isFetchingNextPage,feedPost, isLoading, tabType }: FeedProps) {
  const isReady = postIdsArray.length > 0;

  const { ref, inView } = useInView();

  useEffect(() => {
    if (fetchNextPage) {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [inView, hasNextPage, fetchNextPage]);

      return (
        <div className="w-full flex flex-col">
          {isLoading ? (
            <div className="flex justify-center py-2 flex-col w-full">
              <LoadingIcon />
            </div>
            ) : (
              <>
              <AnimatePresence mode="popLayout">
                <div className="flex flex-col w-full" key="feed-wrapper">
                  {postIdsArray.length > 0 ? (
                  <>
                  {postIdsArray.map((id) => (
                    <motion.div key={id} {...fadeInFeedMotionProps}>
                      <FullPostTemplate mainPost={showAsMainPost} postId={id} feedPost={feedPost}/>
                    </motion.div>
                  ))}
                  <LoadMoreForFeed  triggerRef={ref} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage}/>
                  </>
                  ) : tabType != null && (
                    <NoContentYet userId={userId} tabType={tabType}/>
                  )}                  
                </div>
              </AnimatePresence>
              </> 
            )}
        </div>
      );

}

export default Feed;