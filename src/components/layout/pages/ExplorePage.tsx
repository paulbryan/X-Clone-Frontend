import { useContext, useEffect, useMemo, useState } from "react";
import { HeaderContentContext } from "../../../context/GlobalState/HeaderContentProvider.tsx";
import { ExploreSearchBar } from "../../ui/ExploreSearchBar.tsx";
import { useUserSearch } from "../../../lib/hooks/queries/useUserSearch.tsx";
import { UserSearchResult } from "./UserSearchResult.tsx";
import { useDebounce } from "@uidotdev/usehooks";
import LoadingIcon from "../../ui/LoadingIcon.tsx";
import { useInfiniteUsers } from "../../../lib/hooks/queries/useInfiniteUserFeed.tsx";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInFeedMotionProps } from "../../../lib/animations/motionAnimations.ts";
import { UserSearchFeed } from "../feed/UserSearchFeed.tsx";

function ExplorePage () {

    const {setHeaderContent} = useContext(HeaderContentContext);

    const [input, setInput] = useState("");
    const debouncedQuery = useDebounce(input, 300);
    
    const { data: userIds = [], isLoading } = useUserSearch(debouncedQuery);
    const { data } = useInfiniteUsers();

    const discoverIds = useMemo(() => {
        const seen = new Set<number>();
        return data?.pages.flatMap((page) =>
          page.users.filter((id) => {
            if (seen.has(id)) return false;
            seen.add(id);
            return true;
          })
        ) ?? [];
      }, [data]);

    useEffect(() => {
            setHeaderContent(<p>Explore</p>);
    }, [])

    return (
        <div className="h-full w-full flex flex-col p-4 gap-4 scrollbar-blue overflow-hidden">
            <div className="w-full h-12 flex items-center justify-center">
                <ExploreSearchBar query={input} setQuery={setInput} />
            </div>
            <div className="overflow-y-auto w-full h-full flex flex-col">
                { input.length < 1 && discoverIds ? (
                    <UserSearchFeed idsToLoad={discoverIds}/>
                ) : isLoading ? (
                    <LoadingIcon/>
                ) : userIds && userIds.length <= 0 && !isLoading ? (
                    <p className="text-white w-full text-center font-bold text-lg">No Results</p>
                ) : (
                    <UserSearchFeed idsToLoad={userIds}/>
                )}
            </div>
        </div>
    )

}

export default ExplorePage;