import type { FC } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { FeedType } from "../../types/FeedType";

interface TabButtonProps {
  tab: FeedType;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<FeedType>>
}

const TabButton: FC<TabButtonProps> = ({ tab, setActiveTab, activeTab }) => {
  
  return (
    <div onClick={() => setActiveTab(tab)}
      className={
        "w-full h-full flex items-center justify-center " +
        (tab == activeTab
          ? "text-(--color-main) border-b-2 border-(--color-main) font-semibold"
          : "text-gray-500 border-b border-(--twitter-border)")
      }
    >
      <p>{tab}</p>
    </div>
  );
};

export default TabButton;