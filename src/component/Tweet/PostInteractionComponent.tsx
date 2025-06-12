import { FaRegComment, FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { FaBookmark, FaRepeat } from "react-icons/fa6";
import InteractionButton from "../ButtonComponent/InteractionButton";
import { useCurrentUser } from "../../context/currentUser/CurrentUserProvider";
import { useFeedContext } from "../../context/feed/FeedContext";
import { useState } from "react";
import { usePostCache } from "../../context/cache/PostCacheProvider";
import type { ModalType } from "../../types/ModalType";
import { useModal } from "../../context/misc/ModalProvider";
import type { Post } from "../../types/Post";
import ComposeTweet from "./ComposeTweet";
import Modal from "../Modal/Modal";
import toast, { Toaster } from 'react-hot-toast';

type PostInteractionComponentProps = {
    postId: number;
    likeList: number[];
    bookmarkList: number[];
    replyList: number[];
    retweetedByList: number[];
    setNewPost: (post: Post) => void;
    showPadding?: boolean;
}

function PostInteractionComponent ({postId, showPadding, likeList, bookmarkList, setNewPost, replyList, retweetedByList} : PostInteractionComponentProps) {

    const {currentUser} = useCurrentUser();
    const {currentUserBookmarkIds, addToCurrentUserBookmarks, removeCurrentUserBookmarks,
       currentUserLikedIds, addToCurrentUserLikes, removeFromCurrentUserLikes,
       currentUserRepostedIds, addToCurrentUserReposted, removeFromCurrentUserReposted
      } = useFeedContext();
    const { addToPostCache} = usePostCache(); 
    const {setModalType, modalType, setModalData, modalData} = useModal();

    const notifyBookmarkRemoved = () => toast('Bookmark removed');
    const notifyBookmarkAdded = () => toast('Bookmark added');


    function handleBookmark() {         
        if (!currentUser) return;
      
        const isBookmarked = currentUserBookmarkIds.includes(postId);
        const url = isBookmarked
          ? "http://localhost:8080/api/bookmarks/deleteBookmark"
          : "http://localhost:8080/api/bookmarks/createBookmark";
      
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookmarkedBy: currentUser.id,
            bookmarkedPost: postId,
          }),
        })
          .then(res => res.json())
          .then((updatedPost: Post) => {
            addToPostCache(updatedPost);
            setNewPost(updatedPost);
            if (isBookmarked) {
              removeCurrentUserBookmarks(postId)
              notifyBookmarkRemoved()
            } else {
              addToCurrentUserBookmarks(postId);
              notifyBookmarkAdded();
            }
          })
          .catch(err => console.error("Failed to update bookmark", err));
      }
    
    function handleLike() {
        if (!currentUser) return;
      
        const isLiked = currentUserLikedIds.includes(postId);
        const url = isLiked
          ? "http://localhost:8080/api/likes/deleteLike"
          : "http://localhost:8080/api/likes/createLike";
      
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ likerId: currentUser.id, likedPostId: postId }),
        })
          .then(res => res.json())
          .then((updatedPost: Post) => {
            addToPostCache(updatedPost);
            setNewPost(updatedPost);
            isLiked
              ? removeFromCurrentUserLikes(postId)
              : addToCurrentUserLikes(postId);
          })
          .catch(err => console.error("Failed to update like", err));
      }

      function handleRepost() {
        if (!currentUser) return;
      
        const isRetweeted = currentUserRepostedIds.includes(postId);
        const url = isRetweeted
          ? "http://localhost:8080/api/retweets/deleteRetweet"
          : "http://localhost:8080/api/retweets/newRetweet";
      
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ retweeterId: currentUser.id, referenceId: postId, type: "post" }),
        })
          .then(res => res.json())
          .then((updatedPost: Post) => {
            addToPostCache(updatedPost);
            setNewPost(updatedPost);
            isRetweeted
              ? removeFromCurrentUserReposted(postId)
              : addToCurrentUserReposted(postId);
          })
          .catch(err => console.error("Failed to update repost", err));
      }

    return (

        <>
            <div className={`h-10 text-(--twitter-text) w-full flex items-center align-middle justify-between ${showPadding ? "py-2" : ""}`}>

                <InteractionButton buttonColor="(--color-main)" postId={postId} numberList={replyList}>
                    <FaRegComment onClick={() => {
                      setModalType("replying")
                      setModalData(postId)
                    }}/>
                </InteractionButton>

                <InteractionButton buttonColor="(--twitter-green)" postId={postId} checkOfIds={currentUserRepostedIds} numberList={retweetedByList}>
                    <FaRepeat onClick={() => handleRepost()}/>
                </InteractionButton>

                <InteractionButton buttonColor="(--twitter-red)" postId={postId} checkOfIds={currentUserLikedIds} numberList={likeList}>
                    {currentUserLikedIds.includes(postId) ? (
                      <>
                      <FaHeart onClick={() => handleLike()}/>
                      </>
                    ) : (
                      <>
                      <FaRegHeart onClick={() => handleLike()}/>
                      </>
                    )}
                </InteractionButton>

                <InteractionButton buttonColor="(--twitter-blue)" postId={postId} checkOfIds={currentUserBookmarkIds} numberList={bookmarkList}>
                  {currentUserBookmarkIds.includes(postId) ? (
                      <>
                      <FaBookmark onClick={() => handleBookmark()}/>
                      </>
                    ) : (
                      <>
                      <FaRegBookmark onClick={() => handleBookmark()}/>
                      </>
                    )}
                </InteractionButton>

            </div>


        </>

    )

}

export default PostInteractionComponent;