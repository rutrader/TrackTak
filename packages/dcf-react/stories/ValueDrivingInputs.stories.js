import { ValueDrivingInputs } from "../src";
import React, { useEffect } from "react";

const config = {
  title: "ValueDrivingInputs",
  component: ValueDrivingInputs,
};

const Template = () => {
  return <ValueDrivingInputs />;
};

const NoDataTemplate = (args, { history }) => {
  useEffect(() => {
    history.navigate("/");
  }, [history]);

  return <ValueDrivingInputs {...args} />;
};

export const NoData = NoDataTemplate.bind({});

export const Default = Template.bind({});

export default config;
