import { TTTabs } from "../src";
import React, { useState } from "react";

const config = {
  title: "TTTabs",
  component: TTTabs,
};

const Template = () => {
  const [value, setCurrentValue] = useState(0);
  return (
    <TTTabs
      currentValue={value}
      tabs={[
        { label: "DISCOUNTED CASH FLOW", value: 0 },
        { label: "SYNTHETIC RATING", value: 1 },
        { label: "INDUSTRY AVERAGES", value: 2 },
      ]}
      onClick={(value) => {
        setCurrentValue(value);
      }}
    />
  );
};

export const Default = Template.bind({});

export default config;
