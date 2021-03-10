import { BlackScholesResults } from "../src";
import React from "react";

const config = {
  title: "BlackScholesResults",
  component: BlackScholesResults,
};

const Template = () => {
  return <BlackScholesResults />;
};

export const Default = Template.bind({});

export default config;
