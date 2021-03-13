import { DiscountedCashFlowSheet } from "../src";
import React from "react";
import { action } from "@storybook/addon-actions";

const config = {
  title: "DiscountedCashFlowSheet",
  component: DiscountedCashFlowSheet,
};

const MockSubscribePopup = () => {
  action("subscribePopupShown")();

  return null;
};

const Template = (args) => {
  return <DiscountedCashFlowSheet {...args} />;
};

export const WithPopup = Template.bind({});

WithPopup.args = {
  SubscribePopup: <MockSubscribePopup />,
};

export const Default = Template.bind({});

export default config;
