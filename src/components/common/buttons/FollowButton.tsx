import { useCurrentUser } from "../../../context/Auth/CurrentUserProvider.tsx";
import type { User } from "../../../types/User.ts";
import { useFollowUser } from "../../../hooks/mutations/useFollowUser.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { useModal } from "../../../context/GlobalState/ModalProvider.tsx";
import type { ReactNode } from "react";

type FollowButtonProps = {
  pageUser?: User | null;
  children: ReactNode;
  closeModal?: () => void;
};

function FollowButton({ pageUser, children, closeModal }: FollowButtonProps) {
  const { currentUser } = useCurrentUser();
  const queryClient = useQueryClient();

  const { setModalType } = useModal();

  const isFollowing =
    pageUser?.followers.includes(currentUser?.id ?? -1) ?? false;
  const canFollow = !!currentUser;

  const followMutation = useFollowUser(currentUser?.id, pageUser?.id, {
    onUpdate: (updatedFollowed) => {
      const isNowFollowing = updatedFollowed.followers.includes(
        currentUser?.id ?? -1
      );

      queryClient.setQueryData<User>(["currentUser"], (prev) => {
        if (!prev) return prev;

        const alreadyThere = prev.following.includes(pageUser!.id);
        const following = isNowFollowing
          ? alreadyThere
            ? prev.following
            : [...prev.following, pageUser!.id]
          : prev.following.filter((id) => id !== pageUser!.id);

        return { ...prev, following };
      });
      if (!isNowFollowing) {
        queryClient.invalidateQueries({
          queryKey: ["feed", "following", currentUser?.id],
        });
      }
    },
  });

  const handleFollow = () => {
    if (!pageUser || followMutation.isPending) return;
    if (canFollow) {
      followMutation.mutate({ currentlyFollowing: isFollowing });
      if (closeModal) {
        closeModal();
      }
    } else {
      if (closeModal) {
        closeModal()
      }
      setModalType("signup");
    }
  };

  if (!pageUser) return null;

  return (
    <div
      className="h-fit"
      onClick={(e) => {
        e.stopPropagation();
        handleFollow();
      }}
      style={{
        cursor: followMutation.isPending ? "not-allowed" : "pointer",
        opacity: followMutation.isPending ? 0.5 : 1,
      }}
    >
      {children}
    </div>
  );
}

export default FollowButton;
