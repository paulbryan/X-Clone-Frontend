import type { FC } from "react";
import TabButton from "../ButtonComponent/TabButton";
import type { Dispatch, SetStateAction } from "react";

interface TabListProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>
}

const TabList: FC<TabListProps> = ({ tabs, activeTab, setActiveTab }) => {

  return (
    <div className="h-12 w-full overflow-x-auto overflow-y-hidden whitespace-nowrap flex items-center no-scrollbar">
      {tabs.map((tab) => (
        <TabButton
          key={tab}
          tab={tab}
          activeTab = {activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
    </div>
  );
};

export default TabList;