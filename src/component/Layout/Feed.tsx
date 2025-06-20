import LoadingIcon from "../UIComponent/LoadingIcon";
import FullPostTemplate from "../Tweet/FullPostTemplate";
import { AnimatePresence, motion } from "framer-motion";
import { LoadMoreForFeed } from "./LoadMoreForFeed";
import { fadeInFeedMotionProps } from "../../lib/animations/motionAnimations";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { MediaFeed } from "./MediaFeed";

type FeedProps = {
  postIdsArray: number[];
  showAsMainPost?: boolean;
  isLoading?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  feedPost?: boolean;
  mediafeed?: boolean;
};

//TODO fix isready logic

function Feed({ postIdsArray, showAsMainPost, fetchNextPage, hasNextPage, isFetchingNextPage,feedPost, isLoading, mediafeed }: FeedProps) {
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
                  {postIdsArray.map((id) => (
                    <motion.div key={id} {...fadeInFeedMotionProps}>
                      <FullPostTemplate mainPost={showAsMainPost} postId={id} feedPost={feedPost}/>
                    </motion.div>
                  ))}
                  <LoadMoreForFeed  triggerRef={ref} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage}/>
                </div>
              </AnimatePresence>
              </> 
            )}
        </div>
      );

}

export default Feed;