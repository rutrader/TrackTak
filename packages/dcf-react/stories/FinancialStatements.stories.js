import { FinancialStatements } from "../src";
import React from "react";

const config = {
  title: "FinancialStatements",
  component: FinancialStatements,
};

const Template = () => {
  return <FinancialStatements />;
};

export const Default = Template.bind({});

export default config;
