import { FaRegComment, FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import InteractionButton from "./InteractionButton";
import { useCurrentUser } from "../Context/CurrentUserProvider";
import { useFeedContext } from "../Context/FeedContext";
import { useState } from "react";
import { usePostCache } from "../Context/PostCacheProvider";

type PostInteractionComponentProps = {
    postId: number;
    likeList: number[];
}

function PostInteractionComponent ({postId, likeList} : PostInteractionComponentProps) {

    const {currentUser} = useCurrentUser();
    const {currentUserBookmarkIds, addToCurrentUserBookmarks, removeCurrentUserBookmarks, currentUserLikedIds, addToCurrentUserLikes, removeFromCurrentUserLikes} = useFeedContext();
    const {addToLikedPosts, removeFromLikedPosts} = usePostCache(); 

    function handleBookmark () {

        if (currentUser) {

            if (currentUserBookmarkIds.includes(postId)) {
                
                removeCurrentUserBookmarks(postId);

                const newBookmark = {
                    bookmarkedBy: currentUser.id,
                    bookmarkedPost: postId
                }

                fetch("http://localhost:8080/api/bookmarks/deleteBookmark", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newBookmark),
                  })
                  .then(res => res.text())
                  .then(data => {
                    console.log("Data res is " + data)
                    if (data != "SUCCESS") {
                        addToCurrentUserBookmarks(postId);
                    }
                  });


            } else {
                addToCurrentUserBookmarks(postId);

                const newBookmark = {
                    bookmarkedBy: currentUser.id,
                    bookmarkedPost: postId
                }
                
                console.log("Sending: " + JSON.stringify(newBookmark))
    
                fetch("http://localhost:8080/api/bookmarks/createBookmark", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newBookmark),
                  })
                  .then(res => res.text())
                  .then(data => {
                    console.log("Data res is " + data)
                    if (data != "SUCCESS") {
                        removeCurrentUserBookmarks(postId);
                    }
                  });
            }

        }
    }

    function handleLike () {

        if (currentUser) {

            if (currentUserLikedIds.includes(postId)) {
                
                removeFromLikedPosts(postId, currentUser.id)
                removeFromCurrentUserLikes(postId);

                const newLike = {
                    likerId: currentUser.id,
                    likedPostId: postId
                }

                fetch("http://localhost:8080/api/likes/deleteLike", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newLike),
                  })
                  .then(res => res.text())
                  .then(data => {
                    console.log("Data res is " + data)
                    if (data != "SUCCESS") {
                        addToCurrentUserLikes(postId);
                        addToLikedPosts(postId, currentUser.id)
                    }
                  });


            } else {
                addToLikedPosts(postId, currentUser.id)
                addToCurrentUserLikes(postId);

                const newLike = {
                    likerId: currentUser.id,
                    likedPostId: postId
                }
                    
                fetch("http://localhost:8080/api/likes/createLike", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newLike),
                  })
                  .then(res => res.text())
                  .then(data => {
                    console.log("Data res is " + data)
                    if (data != "SUCCESS") {
                        removeFromCurrentUserLikes(postId);
                        removeFromLikedPosts(postId, currentUser.id)
                    }
                  });
            }

        }
    }

    return (

        <>
            <div className="h-5 mt-3 text-(--twitter-text) w-full flex items-center align-middle justify-between">

                <InteractionButton postId={postId} numberList={[]}>
                    <FaRegComment/>
                </InteractionButton>

                <InteractionButton postId={postId} numberList={[]}>
                    <FaRepeat/>
                </InteractionButton>

                <InteractionButton postId={postId} checkOfIds={currentUserLikedIds} numberList={likeList}>
                    <FaRegHeart onClick={() => handleLike()}/>
                </InteractionButton>

                <InteractionButton postId={postId} checkOfIds={currentUserBookmarkIds} numberList={[]}>
                    <FaRegBookmark onClick={() => handleBookmark()}/>
                </InteractionButton>

            </div>
        </>

    )

}

export default PostInteractionComponent;