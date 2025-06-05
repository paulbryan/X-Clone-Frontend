import type { FC } from "react";
import TabButton from "./ButtonComponent/TabButton";
import type { Dispatch, SetStateAction } from "react";

interface TabListProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>
}

const TabList: FC<TabListProps> = ({ tabs, activeTab, setActiveTab }) => {

  return (
    <div className="h-12 w-full flex">
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