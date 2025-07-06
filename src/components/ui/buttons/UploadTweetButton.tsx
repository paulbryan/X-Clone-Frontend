import type { Post } from "../../../types/Post.ts";
import { useCurrentUser } from "../../../context/Auth/CurrentUserProvider.tsx";
import type { ModalType } from "../../../types/ModalType.ts";
import toast from "react-hot-toast";
import { useCreatePost } from "../../../hooks/mutations/useCreatePost.tsx";
import type { FilesWithId } from "../../../types/file.ts";

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

  const enableButton = textInput.length > 0 && textInput.length < 181;

  const createPost = currentUser
    ? useCreatePost(currentUser.id, parentId)
    : undefined;

  const handleToastClick = () => {
    if (!currentUser || textInput.length <= 1 || textInput.length >= 180) {
      toast.error("Invalid input.");
      return;
    }

    toast.loading("Posting...");

    const formData = new FormData();
    formData.append("text", textInput);
    if (parentId !== undefined) {
      formData.append("parentId", parentId.toString());
    }

    filesWithId.forEach((file) => {
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
      className={`w-fit px-4 font-bold text-sm flex items-center justify-center rounded-2xl h-8 ${
        enableButton
          ? "bg-(--color-main) text-white hover:cursor-pointer"
          : "hover:cursor-not-allowed bg-(--color-main)/50"
      } text-twitterTextAlt`}
    >
      <p className="">Tweet</p>
    </div>
  );
}

export default UploadTweetButton;
