
import InteractionButton from "../ButtonComponent/InteractionButton";
import { useModal } from "../../context/GlobalState/ModalProvider";
import { useLikePost } from "../../hooks/mutations/useLikePost";
import { useBookmarkPost } from "../../hooks/mutations/useBookmarkPost";
import { useRepostPost } from "../../hooks/mutations/useRepostPost";
import type { User } from "../../types/User";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../../hooks/queries/CurrentUserProvider";
import { useEffect } from "react";
import { usePost } from "../../hooks/queries/usePost";
type PostInteractionComponentProps = {
    postId: number;
    showPadding?: boolean;
}

function PostInteractionComponent ({postId, showPadding} : PostInteractionComponentProps) {

  const { currentUser } = useCurrentUser();
  const queryClient = useQueryClient();



  const { setModalType, setModalData } = useModal();
  const { data: post } = usePost(postId);
  
  const likeList = post?.likedBy ?? [];
  const bookmarkList = post?.bookmarkedBy ?? [];
  const replyList = post?.replies ?? [];
  const retweetedByList = post?.retweetedBy ?? [];

  const isLiked = likeList?.includes(currentUser?.id ?? -1);
  const isBookmarked = bookmarkList?.includes(currentUser?.id ?? -1);
  const isRetweeted = retweetedByList?.includes(currentUser?.id ?? -1);


  const likeMutation = useLikePost(postId, currentUser?.id, {
    onUpdate: (updatedPost) => {
      const isNowLiked = updatedPost.likedBy.includes(currentUser?.id ?? -1);
    
      queryClient.setQueryData<User>(["currentUser"], (prev) => {
        if (!prev) return prev;
        
        const alreadyThere = prev.likedPosts.includes(postId);
        const likedPosts = isNowLiked
          ? (alreadyThere ? prev.likedPosts : [...prev.likedPosts, postId])
          : prev.likedPosts.filter(id => id !== postId);
        console.log("LikedPosts: " + likedPosts)
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

  useEffect(() => {
    if (postId == 14) {
      console.log("Curruser is now: " + currentUser)
    }
  }, [postId, currentUser]) 

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

  const handleReplyModal = () => {
    setModalType("replying")
    setModalData(postId)
  }

  
    return (

        <>
            <div className={`h-fit text-(--twitter-text) w-full flex items-center border-(--twitter-border) py-3 align-middle ${showPadding ? " justify-around border-y my-4" : " justify-between"}`}>

              <InteractionButton 
                iconName="ChatBubbleOvalLeftIcon"
                buttonColor="(--twitter-blue)" 
                numberList={replyList} 
                mutationFunction={handleReplyModal}
                />

                <InteractionButton 
                iconName="ArrowPathRoundedSquareIcon"
                buttonColor="(--twitter-green)" 
                numberList={retweetedByList} 
                mutationFunction={() => repostMutation.mutate({ isRetweeted })}
                />

                <InteractionButton 
                iconName="HeartIcon"
                buttonColor="(--twitter-red)" 
                numberList={likeList} 
                mutationFunction={() => likeMutation.mutate({ isLiked })}
                />

              <InteractionButton 
                iconName="BookmarkIcon"
                buttonColor="(--twitter-blue)" 
                numberList={bookmarkList} 
                mutationFunction={() => bookmarkMutation.mutate({ isBookmarked })}
                />


            </div>


        </>

    )


}

export default PostInteractionComponent;