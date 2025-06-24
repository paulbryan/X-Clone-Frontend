import { useContext, useEffect } from "react";
import { useCurrentUser } from "../../../context/Auth/CurrentUserProvider.tsx";
import Feed from "../feed/Feed.tsx";
import { HeaderContentContext } from "../../../context/GlobalState/HeaderContentProvider.tsx";
import { useInfiniteFeed } from "../../../lib/hooks/queries/useInfiniteFeed.tsx";

function ExplorePage () {

    const {currentUser} = useCurrentUser();
    const {setHeaderContent} = useContext(HeaderContentContext);

    useEffect(() => {
            setHeaderContent(<p>Explore</p>);
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
                null
            )}
        </div>

    )

}

export default ExplorePage;