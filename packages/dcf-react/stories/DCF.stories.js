import React from "react";

import { DCFIframe } from "../src/index";

const config = {
  title: "DCF",
  component: DCFIframe,
};

const Template = (args) => {
  return (
    <div style={{ height: 820 }}>
      <DCFIframe ticker="IRBT.US" domain="storybook" {...args} />
    </div>
  );
};

export const Default = Template.bind({});

export const WithCustomParams = Template.bind({});

WithCustomParams.args = {
  params:
    "cagrYearOneToFive=0.18&ebitTargetMarginInYearTen=0.1&yearOfConvergence=3&salesToCapitalRatio=2.5",
};

export default config;
