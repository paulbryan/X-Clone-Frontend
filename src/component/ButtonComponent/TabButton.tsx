import type { FC } from "react";

interface TabButtonProps {
  tab: string;
  active: boolean;
}

const TabButton: FC<TabButtonProps> = ({ tab, active }) => {
  return (
    <div
      className={
        "w-full h-full flex items-center justify-center " +
        (active
          ? "text-(--color-main) border-b-2 border-(--color-main) font-semibold"
          : "text-gray-500 border-b border-(--twitter-border)")
      }
    >
      <p>{tab}</p>
    </div>
  );
};

export default TabButton;