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

        <div className="h-full w-full overflow-hidden">
            {currentUser && (
        <div className="h-full flex grow w-full overflow-y-auto">
            <Feed postIdsArray={currentUser?.bookmarkedPosts}/>
        </div>
            )}
        </div>

    )

}

export default BookmarkPage;