import type { ReactNode } from "react";

type InteractionButtonProps = {
  children: ReactNode;
};

function InteractionButton({ children }: InteractionButtonProps) {
  return (
    <div className="h-5 flex w-16 align-middle items-center gap-2">
      {children}
      <p className="align-middle">1</p>
    </div>
  );
}

export default InteractionButton;