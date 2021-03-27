import { CompanyOverviewStats } from "../src";
import React from "react";
import { Typography } from "@material-ui/core";
import dayjs from "dayjs";

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
    <Typography paragraph>
      This company is a great company. Amazing. One of the best. Extra random
      text here, lorem ipsum something something.
    </Typography>
  ),
  dateOfValuation: dayjs("2021-02-14").format("Do MMM. YYYY"),
  useDescriptionShowMore: false,
};

export default config;
