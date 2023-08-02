import React, { useState } from "react";
import "./SwitchTabs.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="switchingTabs__items">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`switchingTabs__item ${
              selectedTab === index ? "switchingTabs__item--active" : " "
            }`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="switchingTabs__movingBg" style={{ left: left }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
