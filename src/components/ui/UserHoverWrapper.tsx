import * as HoverCard from "@radix-ui/react-hover-card";
import { UserHoverCard } from "./UserHoverCard";
import type { ReactNode } from "react";

type Props = {
  userId: number;
  children: ReactNode;
};

export function UserHoverWrapper({ userId, children }: Props) {
  return (
    <HoverCard.Root openDelay={500} closeDelay={300}>
      <HoverCard.Trigger asChild>
        {children}
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="bottom"
          align="center"
          sideOffset={4}
          className="z-50 w-60 animate-hover-card rounded-2xl bg-(--background-main) border border-twitterText shadow-[0_0_5px_1px_white]"
          >
          <UserHoverCard userId={userId} />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}