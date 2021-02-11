import {
  Box,
  Typography,
  withStyles,
  Hidden,
  useMediaQuery,
  useTheme,
  makeStyles,
} from "@material-ui/core";
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

const useIconStyles = makeStyles({
  root: {
    minWidth: 50,
    minHeight: 50,
  },
});

const TypographyHeader = withStyles({
  root: {
    fontWeight: "bold",
    fontSize: ({ isOnMobile }) => (isOnMobile ? 30 : 30),
    color: textColor,
  },
})(Typography);

const TypographyText = withStyles({
  root: {
    fontSize: 20,
    textAlign: "center",
    color: textColor,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: ({ isOnMobile }) => (isOnMobile ? "100%" : "30%"),
  },
})(Typography);

const Home = () => {
  const iconClasses = useIconStyles();
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Helmet>
        <title>{getTitle("Discounted Cash Flow (DCF) Calculator")}</title>
        <link rel="canonical" href={`${resourceName}`} />
      </Helmet>
      <LandingPageHome />
      {/* <Box
        sx={{
          mt: 12,
        }}
      >
        <TypographyHeader isOnMobile={isOnMobile} align="center">
          text
          <Box>text</Box>
        </TypographyHeader>
      </Box> */}
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
