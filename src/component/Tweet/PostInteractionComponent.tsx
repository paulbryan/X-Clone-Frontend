
import InteractionButton from "../ButtonComponent/InteractionButton";
import { useModal } from "../../context/GlobalState/ModalProvider";
import { useLikePost } from "../../hooks/mutations/useLikePost";
import { useBookmarkPost } from "../../hooks/mutations/useBookmarkPost";
import { useRepostPost } from "../../hooks/mutations/useRepostPost";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../../hooks/queries/CurrentUserProvider";
import { useEffect } from "react";
import { usePost } from "../../hooks/queries/usePost";
import { getBookmarkOnUpdate, getLikeOnUpdate, getRepostOnUpdate } from "../../hooks/mutations/mutationhelpers/useMutationHelpers";
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
    onUpdate: getLikeOnUpdate(postId, currentUser?.id, queryClient),
  });
  
  const bookmarkMutation = useBookmarkPost(postId, currentUser?.id, {
    onUpdate: getBookmarkOnUpdate(postId, currentUser?.id, queryClient),
  });

  const repostMutation = useRepostPost(postId, currentUser?.id, {
    onUpdate: getRepostOnUpdate(postId, currentUser?.id, queryClient),
  });


  useEffect(() => {
    if (postId == 14) {
      console.log("Curruser is now: " + currentUser)
    }
  }, [postId, currentUser]) 



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