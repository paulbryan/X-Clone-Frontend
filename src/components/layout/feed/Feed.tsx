import LoadingIcon from "../../ui/LoadingIcon.tsx";
import FullPostTemplate from "../../tweet/FullPostTemplate.tsx";
import { AnimatePresence, motion } from "framer-motion";
import { LoadMoreForFeed } from "../../ui/LoadMoreForFeed.tsx";
import { fadeInFeedMotionProps } from "../../../lib/animations/motionAnimations.ts";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { FeedType } from "../../../lib/types/FeedType.ts";
import { NoContentYet } from "./NoContentYet.tsx";

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
                <div className="flex flex-col w-full" key="feed-wrapper">
                  {postIdsArray.length > 0 ? (
                      <AnimatePresence mode="popLayout">
                  {postIdsArray.map((id) => (
                    <motion.div key={id} {...fadeInFeedMotionProps} layout="position">
                      <FullPostTemplate mainPost={showAsMainPost} postId={id} feedPost={feedPost}/>
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