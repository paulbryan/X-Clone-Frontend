import { useContext, useEffect } from "react";
import { useCurrentUser } from "../../hooks/queries/CurrentUserProvider";
import Feed from "./Feed";
import { HeaderContentContext } from "../../context/GlobalState/HeaderContentProvider";
import { useInfiniteFeed } from "../../hooks/queries/useInfiniteFeed";

function BookmarkPage () {

    const {currentUser} = useCurrentUser();
    const {setHeaderContent} = useContext(HeaderContentContext);

    useEffect(() => {
            setHeaderContent(<p>Bookmarks</p>);
    }, [])

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
      } = useInfiniteFeed ("Bookmarks", currentUser?.id);

      const postIds = data?.pages.flatMap((page) => page.posts) ?? [];

    return (

        <div className="h-full w-full overflow-hidden">
            {currentUser && (
        <div className="h-full flex grow w-full overflow-y-auto">
            <Feed postIdsArray={postIds} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage}/>
        </div>
            )}
        </div>

    )

}

export default BookmarkPage;