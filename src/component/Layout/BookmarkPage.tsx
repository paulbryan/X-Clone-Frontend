import { useContext, useEffect } from "react";
import { useCurrentUser } from "../../hooks/CurrentUserProvider";
import Feed from "./Feed";
import { HeaderContentContext } from "../../context/misc/HeaderContentProvider";

function BookmarkPage () {

    const {currentUser} = useCurrentUser();
    const {setHeaderContent} = useContext(HeaderContentContext);

    useEffect(() => {
            setHeaderContent(<p>Bookmarks</p>);
    }, [])

    return (

        <div>
            {currentUser && (
            <Feed postIdsArray={currentUser?.bookmarkedPosts}/>
            )}
        </div>

    )

}

export default BookmarkPage;