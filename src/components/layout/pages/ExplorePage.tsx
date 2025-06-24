import { useContext, useEffect, useState } from "react";
import { HeaderContentContext } from "../../../context/GlobalState/HeaderContentProvider.tsx";
import { ExploreSearchBar } from "../../ui/ExploreSearchBar.tsx";
import { useUserSearch } from "../../../lib/hooks/queries/useUserSearch.tsx";
import { UserSearchResult } from "./UserSearchResult.tsx";
import { useDebounce } from "@uidotdev/usehooks";
import LoadingIcon from "../../ui/LoadingIcon.tsx";

function ExplorePage () {

    const {setHeaderContent} = useContext(HeaderContentContext);

    const [input, setInput] = useState("");
    const debouncedQuery = useDebounce(input, 300);
    
    const { data: userIds = [], isLoading } = useUserSearch(debouncedQuery);
    

    useEffect(() => {
            setHeaderContent(<p>Explore</p>);
    }, [])

    return (
        <div className="h-full w-full flex flex-col p-4 gap-4 overflow-hidden">
            <div className="w-full h-12 flex items-center justify-center">
                <ExploreSearchBar query={input} setQuery={setInput} />
            </div>



            <div className="overflow-y-auto w-full h-full flex flex-col">
                {isLoading ? (
                    <LoadingIcon/>
                ) : userIds.length < 0 ? (
                    <p>No Results</p>
                ) : (
                    <>
                    {userIds.map((id : number) => (
                        <UserSearchResult key={id} userId={id} />
                    ))}
                    </>   
                )}
            </div>
        </div>
    )

}

export default ExplorePage;