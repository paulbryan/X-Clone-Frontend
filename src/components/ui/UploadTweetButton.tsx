import type { Post } from "../../lib/types/Post.ts";
import { useCurrentUser } from "../../context/Auth/CurrentUserProvider.tsx";
import type { ModalType } from "../../lib/types/ModalType.ts";
import toast from "react-hot-toast";
import { useCreatePost } from "../../lib/hooks/mutations/useCreatePost.tsx";
import type { FilesWithId } from "../../lib/types/file.ts";

type UploadTweetButtonProps = {
  textInput: string;
  clearAllInput: () => void;
  parentId?: number;
  setNewPost?: (post: Post) => void;
  setToggle?: (modalType: ModalType) => void;
  filesWithId: FilesWithId;
};

function UploadTweetButton({
  clearAllInput,
  textInput,
  parentId,
  filesWithId,
  setToggle,
}: UploadTweetButtonProps) {

  const { currentUser } = useCurrentUser();

  const createPost = currentUser ? useCreatePost(currentUser.id, parentId) : undefined;

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

    if (!createPost) return;

    createPost.mutate(formData, {
      onSuccess: () => {
        clearAllInput();
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