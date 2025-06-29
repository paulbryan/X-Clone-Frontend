import { AnimatePresence, motion } from "framer-motion";
import { UserSearchResult } from "../pages/UserSearchResult";
import { fadeInFeedMotionProps } from "../../../lib/animations/motionAnimations";
import { LoadMoreForFeed } from "../../ui/LoadMoreForFeed";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type UserSearchFeedProps = {
  idsToLoad: number[];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  isLoadingUsers?: boolean;
  isInfinite?: boolean;
};

//TODO add loadmore trigger

export function UserSearchFeed({
  idsToLoad,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoadingUsers,
  isInfinite,
}: UserSearchFeedProps) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (fetchNextPage) {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <AnimatePresence mode="popLayout">
      {idsToLoad.map((userId: number) => (
        <motion.div key={userId} {...fadeInFeedMotionProps} layout="position">
          <UserSearchResult userId={userId} />
        </motion.div>
      ))}
      <LoadMoreForFeed
        triggerRef={ref}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </AnimatePresence>
  );
}
