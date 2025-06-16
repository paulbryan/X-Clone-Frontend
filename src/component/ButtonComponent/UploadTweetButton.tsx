import type { NewPost } from "../../types/NewPost";
import type { Post } from "../../types/Post";
import { useCurrentUser } from "../../hooks/CurrentUserProvider";
import type { ModalType } from "../../types/ModalType";
import toast from "react-hot-toast";
import { useCreatePost } from "../../hooks/useCreatePost";

type UploadTweetButtonProps = {
  textInput: string;
  parentId?: number;
  setNewPost?: (post: Post) => void;
  setToggle?: (modalType: ModalType) => void;
};

function UploadTweetButton({
  textInput,
  parentId,
  setToggle,
}: UploadTweetButtonProps) {
  const { currentUser } = useCurrentUser();
  const createPost = useCreatePost();

  const handleToastClick = () => {
    if (!currentUser || textInput.length <= 1 || textInput.length >= 180) {
      toast.error("Invalid input.");
      return;
    }

    toast.loading("Posting...");

    const newPost: NewPost = {
      userId: currentUser.id,
      text: textInput,
      parentId: parentId,
    };

    createPost.mutate(newPost, {
      onSuccess: () => {
        toast.dismiss();
        toast.success("Tweet posted!");

        if (setToggle) setToggle(null);
      },
      onError: () => {
        toast.dismiss();
        toast.error("Failed to post tweet.");
      },
    });
  };

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