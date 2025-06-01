import { useEffect, useState } from "react";
import PostTemplate from "./UIComponent/PostTemplate";
import type { Post } from "../types/Post";
import PostSkeleton from "./UIComponent/PostSkeleton";
import { usePostCache } from "./Context/PostCacheProvider";
import type { User } from "../types/User";
import { useUserCache } from "./Context/UserCacheProvider";
import { useCurrentUser } from "./Context/CurrentUserProvider";


type FeedProps = {
    postIdsArray: number[];
}

function Feed ({postIdsArray} : FeedProps) {

    const {postCache, getPostFromCache, removeFromPostCache, addToPostCache, fetchPostsFromServerById} = usePostCache();
    const {addToUserCache, removeFromUserCache, getUserFromCache, fetchUsersFromServerById} = useUserCache();
    const [loadedPosts, setLoadedPosts] = useState<Post[]>([]);
    const [hasLoadedPosts, setHasLoadedPosts] = useState<boolean>(false);
    const [hasLoadedUsers, setHasLoadedUsers] = useState<boolean>(false);
    const {currentUser} = useCurrentUser();

    useEffect(() => {
        console.log("cache as object:", Object.fromEntries(postCache.entries())
    )}, [postCache])

    useEffect(() => {
        checkLoadedPosts();
    }, [loadedPosts])

    useEffect(() => {
        loadPosts();
    }, [postIdsArray])
 
    useEffect(() => {
        if (hasLoadedPosts && !hasLoadedUsers) {
            console.log("Loading users");
            loadUsers();
        }
    })

    useEffect(() => {
        console.log("Loaded users: " + hasLoadedUsers);
        console.log("Loaded Posts: " + hasLoadedPosts)
    }, [hasLoadedUsers, hasLoadedUsers])

    async function loadPosts () {

        console.log("S0 " + JSON.stringify(postIdsArray))

        let notFoundPosts : number[] = [];

        console.log("S1 loading posts")

        for (let i = 0; i < postIdsArray.length; i++) {

            const post = getPostFromCache(postIdsArray[i]);
            console.log("FOund post? " + JSON.stringify(post))
            if (!post){
                notFoundPosts.push(postIdsArray[i])
            }

        }

        console.log("S2 " + JSON.stringify(notFoundPosts))

        if (notFoundPosts.length > 0) {
            console.log("Awaiting fetch")

            await fetchUnloadedPosts(notFoundPosts);
            
        } else {
            console.log("well all posts are found")
            const finalPostArray : Post[] = [];
            for (let i = 0; i < postIdsArray.length; i++) {
                const post = getPostFromCache(postIdsArray[i]);
                console.log("Second run print" + post)
                if (post) {
                    finalPostArray.push(post);
                }
            }
            setLoadedPosts([...finalPostArray])
        }
    }

    function checkLoadedPosts () {
        if (loadedPosts.length == postIdsArray.length) {
            console.log("All posts found: " + JSON.stringify(loadedPosts))
            setHasLoadedPosts(true);
            loadUsers();
        } else {
            setHasLoadedPosts(false);
        }
    }

    async function loadUsers () {

        let notFoundUsers : number[] = [];

        for (let i = 0; i < loadedPosts.length; i++) {

            const post : Post = loadedPosts[i];
            const posterId : number = post.userId;


            const poster = getUserFromCache(posterId);
            if (!poster) {

                if (!currentUser || (currentUser && currentUser.id != posterId)) {
                    notFoundUsers.push(posterId);
                } 
            }

        }

        console.log("Not found users: " + notFoundUsers)

        if (notFoundUsers.length > 0) {
            await fetchUnloadedUsers(notFoundUsers)
        }

        console.log("all good")

        setHasLoadedUsers(true);
    }

    async function fetchUnloadedPosts (notFoundPosts : number[]) {

        const fetchedPosts: Post[] = await fetchPostsFromServerById(notFoundPosts);
        console.log("starting add to cache")
        for (let i = 0; i < fetchedPosts.length; i++) {
            console.log("Adding to cache: " + JSON.stringify(fetchedPosts[i]))
            addToPostCache(fetchedPosts[i]);
        }

    }

    async function fetchUnloadedUsers (notFoundUsers : number[]) {

        const fetchedUsers: User[] = await fetchUsersFromServerById(notFoundUsers);
        for (let i = 0; i < fetchedUsers.length; i++) {

            addToUserCache(fetchedUsers[i]);
        }

    }

    return (
        <div className='w-full'>
            {hasLoadedPosts && hasLoadedUsers ? (
                <div className="flex flex-col w-full">
                {loadedPosts.map((post) => {
                  return <PostTemplate post={post} />
                })}
                </div>
            ) : (
                <div className="flex flex-col w-full">
                {postIdsArray.map(() => {
                   return <PostSkeleton/>
                })}
                </div>
            )}
        </div>
    )

}

export default Feed;