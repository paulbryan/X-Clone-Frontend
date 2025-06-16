import { useContext, useEffect } from "react";
import { useCurrentUser } from "../../hooks/queries/CurrentUserProvider";
import Feed from "./Feed";
import { HeaderContentContext } from "../../context/GlobalState/HeaderContentProvider";

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