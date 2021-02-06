import React from "react";

import { IndustryAveragesSummary } from "../src/index";

const config = {
  title: "DCF",
  component: IndustryAveragesSummary,
};

const Template = (args) => {
  return <IndustryAveragesSummary {...args} />;
};

export const IndustryAveragesSummaryStory = Template.bind({});

export default config;
