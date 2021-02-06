import React from "react";

import { DCFIframe } from "../src/index";

const config = {
  title: "DCF",
  component: DCFIframe,
};

const Template = (args) => {
  return <DCFIframe {...args} />;
};

export const DCFIframeStory = Template.bind({});

export default config;
