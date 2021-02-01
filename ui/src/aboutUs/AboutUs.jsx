import { Typography } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>{getTitle("About Us")}</title>
        <link rel="canonical" href={`${resourceName}/about-us`} />
      </Helmet>
      <Typography variant="h5" gutterBottom>
        About Us
      </Typography>
      <Typography gutterBottom paragraph>
        We are a team of two developers and investors who follow Aswath
        Damoradan's &amp; Warren Buffet's value investing principles.{"\n"}
        As much as we love Aswath's teachings his excel spreadsheets are very
        difficult to understand, therefore we decided that we would automate and
        make each spreadsheet easy to use and understand.{"\n"}
        Our goal is to make the DCF and reverse DCF as good as possible first
        and then move on to calculating the intrinsic value of options, optimal
        cost of debts etc.
      </Typography>
      <Typography paragraph>
        We started this website in Nov. 2020 with a quick MVP and are developing
        this site in our spare time after work. Because we don't have many
        resources, we need to be very wise with what features we implement first
        which is why we love your feedback!
      </Typography>
    </>
  );
};

export default AboutUs;
