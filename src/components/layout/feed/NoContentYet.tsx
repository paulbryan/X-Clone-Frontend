import { useCurrentUser } from "../../../context/Auth/CurrentUserProvider.tsx";
import { useUser } from "../../../lib/hooks/queries/useUser.tsx";
import type { FeedType } from "../../../lib/types/FeedType.ts";

type NoContentYetProps = {
    tabType: FeedType;
    userId?: number;
    customMessage?: boolean;
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
                return "Bookmarked any Tweets";
            case "Liked" :
                return "Liked any Tweets";
            case "Notifications" :
                return "No notifications... yet!"    
            case "Replies" :
                return "Replied to any Tweets";        
        }       
    }



    return (
        <div className="w-full h-full flex flex-col justify-center items-center my-4">

            <div className="h-auto w-2/3 flex flex-col gap-2 justify-center items-center">
                {customMessage ? (
                    <p className="text-twitterText text-center font-bold text-2xl">{determineTabName()}</p>
                ) : (
                    <>
                    <img className="h-auto" src={`../../../public/images/no-${tabType}.png`}/>
                    <p className="text-twitterText text-center font-bold text-2xl"> @{lowerCaseName} hasn't {determineTabName()} </p>
                    <p className="text-twitterTextAlt text-center">Once they do, those tweets will show up here </p>
                    </>
                )}


            </div>

        </div>
    )

}