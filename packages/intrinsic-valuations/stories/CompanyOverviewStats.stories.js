import { CompanyOverviewStats } from "../src";
import React from "react";
import { Typography } from "@material-ui/core";

const config = {
  title: "CompanyOverviewStats",
  component: CompanyOverviewStats,
};

const Template = (args) => {
  return <CompanyOverviewStats {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  extraDescription: (
    <Typography>
      This company is a great company. Amazing. One of the best. Extra random
      text here, lorem ipsum something something.
    </Typography>
  ),
  useDescriptionShowMore: false,
};

export default config;
