import { useUser } from "../../../lib/hooks/queries/useUser.tsx";
import type { FeedType } from "../../../lib/types/FeedType.ts";

type NoContentYetProps = {
    tabType: FeedType;
    userId?: number;
    customMessage?: boolean;
}

export type NoContentYetMessageType = {
    
}

export function NoContentYet ({tabType, userId, customMessage}: NoContentYetProps) {

    const { data: user } = useUser(userId ?? -1);

    const lowerCaseName = user?.username;


    function determineTabName () {
        switch (tabType) {
            case "Tweets" :
                return "Tweeted";
            case "Media" :
                return "Posted Media"
            case "Bookmarks" :
                return "Save Tweets for later";
            case "Liked" :
                return "Liked any Tweets";
            case "Notifications" :
                return "Join the conversation"    
            case "Replies" :
                return "Replied to any Tweets";        
            case "Following" :
                return "Nothing to see here - yet"    
        }       
    }

    function determineSubMessage () {
        switch (tabType) {
            case "Tweets" :
                return "Tweeted";
            case "Media" :
                return "Posted Media"
            case "Bookmarks" :
                return "Don't let the good ones fly away! Bookmark tweets to easily find them again in the future";
            case "Liked" :
                return "Liked any Tweets";
            case "Notifications" :
                return "When someone on X interacts with your content, you'll find it here"    
            case "Replies" :
                return "Replied to any Tweets";        
            case "Following" :
                return "When you follow someone, their Tweets will show up here."    
        }       
    }

    //TODO add some kind of class or type to hold the name + message + submessage



    return (
        <div className="w-full h-full flex flex-col justify-center items-center my-4">

            <div className="h-auto w-2/3 flex flex-col gap-2 justify-center items-center">
                {customMessage ? (
                    <p className="text-twitterText text-center font-bold text-2xl">{determineTabName()}</p>
                ) : tabType && (
                    <>
                    <img className="h-auto" src={`../../../public/images/no-${tabType}.png`}/>
                    <p className="text-twitterText text-center font-bold text-2xl">{determineTabName()}</p>
                    <p className="text-twitterTextAlt text-center">{determineSubMessage()}</p>
                    </>
                )}
            </div>

        </div>
    )

}