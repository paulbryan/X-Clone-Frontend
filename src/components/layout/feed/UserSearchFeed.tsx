import { AnimatePresence, motion } from "framer-motion";
import { UserSearchResult } from "../pages/UserSearchResult";
import { fadeInFeedMotionProps } from "../../../lib/animations/motionAnimations";

type UserSearchFeedProps = {
    idsToLoad: number[]
}

export function UserSearchFeed ({idsToLoad}: UserSearchFeedProps) {

    return (
        <AnimatePresence mode="popLayout">
        {idsToLoad.map((userId: number) => (
            <motion.div key={userId} {...fadeInFeedMotionProps} layout="position">
                <UserSearchResult userId={userId} />
            </motion.div>                    
        ))}
        </AnimatePresence>
    )

}