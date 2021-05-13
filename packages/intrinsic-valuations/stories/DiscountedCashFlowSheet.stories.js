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

const Template = (args, { history }) => {
  return (
    <div>
      <button
        onClick={() => {
          history.navigate(
            "/?cagrYearOneToFive=0.5&ebitTargetMarginInYearTen=0.70&yearOfConvergence=3&salesToCapitalRatio=2.5&probabilityOfFailure=0.3&proceedsAsAPercentageOfBookValue=0.2",
          );
        }}
      >
        Update cagrYearOneToFive
      </button>
      <DiscountedCashFlowSheet {...args} />;
    </div>
  );
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
