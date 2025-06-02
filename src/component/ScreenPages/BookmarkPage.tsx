import { useEffect } from "react";
import { useFeedContext } from "../Context/FeedContext";
import { useCurrentUser } from "../Context/CurrentUserProvider";
import Feed from "../Feed";

function BookmarkPage () {

    const {currentUser} = useCurrentUser();
    const {currentUserBookmarkIds, initializeCurrentUserBookmarks} = useFeedContext();

    useEffect(() => {
        if (currentUser && currentUserBookmarkIds.length < 1) {
            initializeCurrentUserBookmarks();
        }
    }, [currentUserBookmarkIds])

    return (

        <div>
            <Feed postIdsArray={currentUserBookmarkIds}/>
        </div>

    )

}

export default BookmarkPage;