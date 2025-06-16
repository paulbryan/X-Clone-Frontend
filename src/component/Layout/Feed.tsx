import LoadingIcon from "../UIComponent/LoadingIcon";
import FullPostTemplate from "../Tweet/FullPostTemplate";
import { AnimatePresence, motion } from "framer-motion";

type FeedProps = {
  postIdsArray: number[];
  showAsMainPost?: boolean;
};

//TODO fix isready logic

function Feed({ postIdsArray, showAsMainPost }: FeedProps) {
  const isReady = postIdsArray.length > 0;

      return (
        <div className="w-full">
          {isReady ? (
              <AnimatePresence mode="popLayout">
                <div className="flex flex-col-reverse w-full">
                {postIdsArray.map((id) => (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                      layout
                    >
                      <FullPostTemplate mainPost={showAsMainPost} postId={id} />
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