import React from "react";

import { IndustryAveragesSummary } from "../src/index";

const config = {
  title: "DCF/IndustryAveragesSummary",
  component: IndustryAveragesSummary,
};

const Template = (args) => {
  return <IndustryAveragesSummary {...args} />;
};

export const IndustryAveragesSummaryTemplate = Template.bind({});

export default config;
