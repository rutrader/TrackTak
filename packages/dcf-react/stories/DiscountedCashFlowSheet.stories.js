import { DiscountedCashFlowSheet } from "../src";
import React, { useEffect } from "react";
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

const NoDataTemplate = (args, { history }) => {
  useEffect(() => {
    history.navigate("/");
  }, [history]);

  return <DiscountedCashFlowSheet {...args} />;
};

export const NoData = NoDataTemplate.bind({});

export const Default = Template.bind({});

export default config;
