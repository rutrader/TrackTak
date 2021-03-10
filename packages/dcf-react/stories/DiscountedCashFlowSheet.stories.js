import { DiscountedCashFlowSheet } from "../src";
import React from "react";

const config = {
  title: "DiscountedCashFlowSheet",
  component: DiscountedCashFlowSheet,
};

const Template = () => {
  return <DiscountedCashFlowSheet />;
};

export const Default = Template.bind({});

export default config;
