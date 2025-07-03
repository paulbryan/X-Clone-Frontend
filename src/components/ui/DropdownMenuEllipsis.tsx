import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HeroIcon } from "./HeroIcon";
import cn from "clsx";
import { DropdownMenuContent } from "./dropdown/DropDownMenuContent";

type DropdownMenuEllipsisProps = {
  postId: number;
  mainPost?: boolean;

}

export function DropdownMenuEllipsis({postId, mainPost}: DropdownMenuEllipsisProps) {

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
      <button
            className={cn(
                "p-1 rounded-full transition focus:outline-none",
                "hover:bg-blue-500/10 active:bg-blue-500/10",
                "cursor-pointer",
                "data-[state=open]:bg-blue-500/10 data-[state=open]:cursor-pointer"
            )}
            aria-label="Post options"
        >
          <HeroIcon iconName="EllipsisHorizontalIcon" className="w-6 h-6 text-twitterTextAlt" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenuContent mainPost={mainPost} postId={postId}/>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}