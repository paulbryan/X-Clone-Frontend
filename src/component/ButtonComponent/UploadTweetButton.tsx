import type { NewPost } from "../../types/NewPost";
import type { Post } from "../../types/Post";
import { useCurrentUser } from "../../hooks/queries/CurrentUserProvider";
import type { ModalType } from "../../types/ModalType";
import toast from "react-hot-toast";
import { useCreatePost } from "../../hooks/mutations/useCreatePost";
import type { FilesWithId } from "../../types/file";

type UploadTweetButtonProps = {
  textInput: string;
  parentId?: number;
  setNewPost?: (post: Post) => void;
  setToggle?: (modalType: ModalType) => void;
  filesWithId: FilesWithId;
};

function UploadTweetButton({
  textInput,
  parentId,
  filesWithId,
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

    const formData = new FormData();
    formData.append("userId", currentUser.id.toString());
    formData.append("text", textInput);
    if (parentId !== undefined) {
      formData.append("parentId", parentId.toString());
    }

    filesWithId.forEach(file => {
      formData.append("images", file);
    });

    createPost.mutate(formData, {
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