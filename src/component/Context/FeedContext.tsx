import { createContext, useContext, useEffect, useState } from "react";
import type {ReactNode} from "react";
import { useCurrentUser } from "./CurrentUserProvider";

type FeedContextType = {
    forYouFeedIds: number[];
    addToForYouFeedIds: (id: number) => void;
    getForYouFeedIds: () => void;

    currentUserPostsIds: number[];
    addToCurrentUserPosts: (id: number) => void;

    currentUserBookmarkIds: number[];
    addToCurrentUserBookmarks: (id: number) => void;
    initializeCurrentUserBookmarks: () => void;
    removeCurrentUserBookmarks: (id: number) => void;

    currentUserLikedIds: number[];
    addToCurrentUserLikes: (id: number) => void;
    removeFromCurrentUserLikes: (id: number) => void;
    initializeCurrentUserLikes: () => void;
  };

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const FeedProvider = ({ children }: { children: ReactNode }) => {
    
    const {currentUser} = useCurrentUser();
    const [forYouFeedIds, setForYouFeedIds] = useState<number[]>([]);
    const [currentUserPostsIds, setCurrentUserPostsIds] = useState<number[]>([]);
    const [currentUserBookmarkIds, setCurrentUserBookmarkIds] = useState<number[]>([]);
    const [currentUserLikedIds, setCurrentUserLikedIds] = useState<number[]>([]);

    

    function addToForYouFeedIds (id: number) {

        setForYouFeedIds((prev) => [...prev, id])

    }

    function addToCurrentUserPosts(id: number) {
        if (currentUser) {
            setCurrentUserPostsIds((prev) => [...prev, id])
        }
    }

    function addToCurrentUserBookmarks(id: number) {
      if (currentUser) {
          setCurrentUserBookmarkIds((prev) => [...prev, id])
      }
    }

    function removeCurrentUserBookmarks (id: number) {
      if (currentUser) {
        setCurrentUserBookmarkIds((prev) => prev.filter((bookmarkId) => bookmarkId !== id));
      }
    }

    function initializeCurrentUserBookmarks () {
      if (currentUser) {
        setCurrentUserBookmarkIds(currentUser.bookmarkedPosts)
      }
    }

    function addToCurrentUserLikes(id: number) {
      if (currentUser) {
          setCurrentUserLikedIds((prev) => [...prev, id])
      }
    }

    function removeFromCurrentUserLikes (id: number) {
      if (currentUser) {
        setCurrentUserLikedIds((prev) => prev.filter((likedPostId) => likedPostId !== id));
      }
    }

    function initializeCurrentUserLikes () {
      if (currentUser) {
        setCurrentUserLikedIds(currentUser.likedPosts)
      }
    }


    function getForYouFeedIds () {

        fetch(`http://localhost:8080/api/posts/getAllPostIds`)
        .then(res => res.json())
        .then(data => {
            setForYouFeedIds(data);
        })

    }

    useEffect(() => {
        if (currentUser && currentUser.posts && currentUser.posts.length > 0) {
          console.log("🧠 FeedContext: setting currentUserPostsIds from currentUser");
          setCurrentUserPostsIds(currentUser.posts);
        }
      }, [currentUser]);

    return (
      <FeedContext.Provider value={{addToCurrentUserLikes, removeFromCurrentUserLikes, initializeCurrentUserLikes, forYouFeedIds, removeCurrentUserBookmarks, addToForYouFeedIds, getForYouFeedIds, currentUserPostsIds, addToCurrentUserPosts, initializeCurrentUserBookmarks, addToCurrentUserBookmarks, currentUserBookmarkIds, currentUserLikedIds}}>
        {children}
      </FeedContext.Provider>
    );
  };
  
  export const useFeedContext = () => {
    const context = useContext(FeedContext);
    if (!context) throw new Error("useFeedContext must be used within a FeedProvider");
    return context;
  };