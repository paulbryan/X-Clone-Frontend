import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useCurrentUser } from "../../../context/Auth/CurrentUserProvider";
import { usePost } from "../../../lib/hooks/queries/usePost";
import { useDeletePost } from "../../../lib/hooks/mutations/useDeletePost";
import { HeroIcon } from "../HeroIcon";
import { BsPinAngle } from "react-icons/bs";
import { CustomDropdownItem } from "./CustomDropdownItem";
import { useNavigate } from "react-router-dom";

type DropdownMenuContentProps = {
    postId: number;
    mainPost?: boolean;
}

export function DropdownMenuContent ({postId, mainPost}: DropdownMenuContentProps) {


    const {currentUser} = useCurrentUser();
    const {data: post} = usePost(postId);
    const isOwnPost = post?.userId == currentUser?.id;

    if (!post || !currentUser) return null;
    const deletePost = useDeletePost(currentUser.id, post.parentId)
    const navigate = useNavigate();

    const handleDeletePost = () => {
        deletePost?.mutate(postId);

        if (mainPost) {
            const isInternalReferrer = document.referrer.startsWith(window.location.origin);
            if (isInternalReferrer) {
                navigate(-1);
              } else {
                navigate("/");
              }
        }

    }

    const pinToProfile = () => {

    }

    return (
        <DropdownMenu.Content
          className="z-50 min-w-46 rounded-md bg-(--background-main) border border-twitterBorder shadow-[0_0_5px_1px_gray] p-1"
          sideOffset={5}
          align="end"
        >
          {isOwnPost ? (
        <>
        <CustomDropdownItem customClassName="text-red-500" text="Delete" handleDropdownMutation={handleDeletePost}>     
            <HeroIcon iconName="TrashIcon" className="h-4 w-4"/>
        </CustomDropdownItem>
        <CustomDropdownItem customClassName="text-twitterText" text="Pin to your profile" handleDropdownMutation={handleDeletePost}>     
            <BsPinAngle className="text-md"/>
        </CustomDropdownItem>
        </>
          ) : (
        <CustomDropdownItem customClassName="text-twitterText" text={`follow @grumpykoala`} handleDropdownMutation={handleDeletePost}>     
            <HeroIcon iconName="UserPlusIcon" className="h-4 w-4"/>
        </CustomDropdownItem>
          )}  
        </DropdownMenu.Content>
    )

}