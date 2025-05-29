import type { FC } from "react";
import TabButton from "./ButtonComponent/TabButton";

interface TabListProps {
  tabs: string[];
  activeTab: string;
}

const TabList: FC<TabListProps> = ({ tabs, activeTab }) => {
  return (
    <div className="h-14 w-full flex">
      {tabs.map((tab) => (
        <TabButton
          key={tab}
          tab={tab}
          active={tab === activeTab}
        />
      ))}
    </div>
  );
};

export default TabList;