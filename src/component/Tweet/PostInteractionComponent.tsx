import { FaRegComment, FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { FaBookmark, FaRepeat } from "react-icons/fa6";
import InteractionButton from "../ButtonComponent/InteractionButton";
import { useCurrentUser } from "../../hooks/CurrentUserProvider";
import { useModal } from "../../context/misc/ModalProvider";
import { useLikePost } from "../../hooks/mutations/useLikePost";
import { useBookmarkPost } from "../../hooks/mutations/useBookmarkPost";
import { useRepostPost } from "../../hooks/mutations/useRepostPost";
import toast from "react-hot-toast";
import type { User } from "../../types/User";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
type PostInteractionComponentProps = {
    postId: number;
    likeList: number[];
    bookmarkList: number[];
    replyList: number[];
    retweetedByList: number[];
    showPadding?: boolean;
}

function PostInteractionComponent ({postId, showPadding, likeList, bookmarkList, replyList, retweetedByList} : PostInteractionComponentProps) {

  const { currentUser } = useCurrentUser();
  const queryClient = useQueryClient();

  const { setModalType, setModalData } = useModal();

  const isLiked = likeList.includes(currentUser?.id ?? -1);
  const isBookmarked = bookmarkList.includes(currentUser?.id ?? -1);
  const isRetweeted = retweetedByList.includes(currentUser?.id ?? -1);

  const likeMutation = useLikePost(postId, currentUser?.id, {
    onUpdate: (updatedPost) => {
      const isNowLiked = updatedPost.likedBy.includes(currentUser?.id ?? -1);
    
      queryClient.setQueryData<User>(["currentUser"], (prev) => {
        if (!prev) return prev;
    
        const alreadyThere = prev.likedPosts.includes(postId);
        const likedPosts = isNowLiked
          ? (alreadyThere ? prev.likedPosts : [...prev.likedPosts, postId])
          : prev.likedPosts.filter(id => id !== postId);
    
        return { ...prev, likedPosts };
      });
    }
  });

  const bookmarkMutation = useBookmarkPost(postId, currentUser?.id, {
    onUpdate: (updatedPost) => {
      const isNowBookmarked = updatedPost.bookmarkedBy.includes(currentUser?.id ?? -1);
      console.log("Updated user: " + JSON.stringify(currentUser))
      console.log("Updated post: " + JSON.stringify(updatedPost))
      console.log("IsnowBookmarked? " + isNowBookmarked) 
      queryClient.setQueryData<User>(["currentUser"], (prev) => {
        if (!prev) return prev;
    
        const alreadyThere = prev.bookmarkedPosts.includes(postId);
        console.log("Already there? " + alreadyThere)
        const bookmarkedPosts = isNowBookmarked
          ? (alreadyThere ? prev.bookmarkedPosts : [...prev.bookmarkedPosts, postId])
          : prev.bookmarkedPosts.filter(id => id !== postId);
    
        console.log("Bookmarked posts: " + JSON.stringify(bookmarkedPosts))

        return { ...prev, bookmarkedPosts };
      });
    }
  });

  const repostMutation = useRepostPost(postId, currentUser?.id, {
    onUpdate: (updatedPost) => {
      const isNowRetweeted = updatedPost.retweetedBy.includes(currentUser?.id ?? -1);
    
      queryClient.setQueryData<User>(["currentUser"], (prev) => {
        if (!prev) return prev;
    
        const alreadyThere = prev.retweets.includes(postId);
        const retweetedPosts = isNowRetweeted
          ? (alreadyThere ? prev.retweets : [...prev.retweets, postId])
          : prev.retweets.filter(id => id !== postId);
    
        return { ...prev, retweetedPosts };
      });
    }
  });

  
    return (

        <>
            <div className={`h-10 text-(--twitter-text) w-full flex items-center align-middle justify-between ${showPadding ? "py-2" : ""}`}>

                <InteractionButton buttonColor="(--color-main)"  numberList={replyList}>
                    <FaRegComment onClick={() => {
                      setModalType("replying")
                      setModalData(postId)
                    }}/>
                </InteractionButton>

                <InteractionButton buttonColor="(--twitter-green)" numberList={retweetedByList}>
                    {isRetweeted ? (
                      <>
                      <FaRepeat onClick={() => repostMutation.mutate({isRetweeted})}/>
                      </>
                    ) : (
                      <>
                      <FaRepeat onClick={() => repostMutation.mutate({isRetweeted})}/>
                      </>
                    )}
                </InteractionButton>

                <InteractionButton buttonColor="(--twitter-red)"  numberList={likeList}>
                    {isLiked ? (
                      <>
                      <FaHeart onClick={() => likeMutation.mutate({isLiked})}/>
                      </>
                    ) : (
                      <>
                      <FaRegHeart onClick={() => likeMutation.mutate({isLiked})}/>
                      </>
                    )}
                </InteractionButton>

                <InteractionButton buttonColor="(--twitter-blue)" numberList={bookmarkList}>
                  {isBookmarked ? (
                      <>
                      <FaBookmark onClick={() => bookmarkMutation.mutate({isBookmarked})}/>
                      </>
                    ) : (
                      <>
                      <FaRegBookmark onClick={() => bookmarkMutation.mutate({isBookmarked})}/>
                      </>
                    )}
                </InteractionButton>

            </div>


        </>

    )


}

export default PostInteractionComponent;