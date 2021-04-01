import { FinancialsSummary } from "../src";
import React from "react";

const config = {
  title: "FinancialsSummary",
  component: FinancialsSummary,
};

const Template = () => {
  return <FinancialsSummary />;
};

export const Default = Template.bind({});

export default config;
