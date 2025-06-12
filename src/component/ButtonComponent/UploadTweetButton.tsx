import type { NewPost } from "../../types/NewPost";
import type { Post } from "../../types/Post";
import { useCurrentUser } from "../../context/currentUser/CurrentUserProvider";
import { useFeedContext } from "../../context/feed/FeedContext";
import { usePostCache } from "../../context/cache/PostCacheProvider";
import type { ModalType } from "../../types/ModalType";
import toast from "react-hot-toast";

type UploadTweetButtonProps = {
    textInput: string;
    parentId?: number;
    setNewPost?: (post: Post) => void;
    setToggle?: (modalType: ModalType) => void;
}

function UploadTweetButton ({textInput, parentId, setNewPost, setToggle} : UploadTweetButtonProps) {

    const {currentUser} = useCurrentUser();
    const {addToPostCache} = usePostCache();
    const {addToForYouFeedIds, addToCurrentUserPosts, addToCurrentUserReplies} = useFeedContext();

    const handleToastClick = () => {
        toast.promise(
          composeNewPost().then((data: Post[]) => {

            setTimeout(() => {
                
            }, 100)

            if (data.length > 1 && setNewPost) {
              addToPostCache(data[0]);
              addToPostCache(data[1]);
              setNewPost(data[1]);
              addToCurrentUserReplies(data[0].id);
            } else {
              addToPostCache(data[0]);
              addToForYouFeedIds(data[0].id);
              addToCurrentUserPosts(data[0].id);
            }
      
            if (setToggle) setToggle(null);
      
            return data;
          }),
          {
            loading: "Posting...",
            success: "Tweet posted!",
            error: "Failed to post tweet.",
          },
          {
            position: "bottom-center",
          }
        );
      };


      function composeNewPost(): Promise<Post[]> {
        if (
          !currentUser ||
          textInput.length <= 1 ||
          textInput.length >= 180
        ) {
          return Promise.reject("Invalid input");
        }
      
        const newComposedPost: NewPost = {
          userId: currentUser.id,
          text: textInput,
          parentId: parentId,
        };
      
        return fetch("http://localhost:8080/api/posts/createPost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newComposedPost),
        }).then((res) => res.json());
      }

    return (

    <div
    onClick={handleToastClick}
    className="w-fit px-4 font-bold text-sm flex items-center justify-center rounded-2xl h-8 bg-(--color-main)"
    >
    <p className="text-white">Tweet</p>
    </div>

    )

}

export default UploadTweetButton;