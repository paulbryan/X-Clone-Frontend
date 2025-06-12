import { useContext, useEffect } from "react";
import { useFeedContext } from "../../context/feed/FeedContext";
import { useCurrentUser } from "../../context/currentUser/CurrentUserProvider";
import Feed from "./Feed";
import { HeaderContentContext } from "../../context/misc/HeaderContentProvider";

function BookmarkPage () {

    const {currentUser} = useCurrentUser();
    const {currentUserBookmarkIds, initializeCurrentUserBookmarks} = useFeedContext();
    const {setHeaderContent} = useContext(HeaderContentContext);

    useEffect(() => {
            setHeaderContent(<p>Bookmarks</p>);
    }, [])

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