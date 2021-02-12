import { Box, Typography } from "@material-ui/core";
import React from "react";
import SearchTicker from "../components/SearchTicker";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import SubscribeSection from "../landingHomepage/sections/SubscribeSection";
import LandingPageHome from "../landingHomepage/LandingPageHome";
import FeaturesSection from "../landingHomepage/sections/FeaturesSection";
import ProcessSection from "../landingHomepage/sections/ProcessSection";

const textColor = "#292929";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>{getTitle("Discounted Cash Flow (DCF) Calculator")}</title>
        <link rel="canonical" href={`${resourceName}`} />
      </Helmet>
      <LandingPageHome />
      {/* <Box
        sx={{
          justifyContent: "center",
          mt: 7,
        }}
      >
        <Typography
          style={{ color: textColor }}
          variant="h5"
          align="center"
          gutterBottom
        >
          Search for a company to begin.
        </Typography>
        <SearchTicker />
      </Box> */}
      <FeaturesSection />
      <ProcessSection />
      <SubscribeSection />
    </>
  );
};

export default Home;
