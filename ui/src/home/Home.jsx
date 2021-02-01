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
import SettingsIcon from "@material-ui/icons/Settings";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import PublicIcon from "@material-ui/icons/Public";
import { ReactComponent as BackgroundPurple } from "../icons/backgroundPurple.svg";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";

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
      <Box
        sx={{
          mt: 12,
        }}
      >
        <TypographyHeader isOnMobile={isOnMobile} align="center">
          Goodbye, Excel.
          <Box>Hello, automated Discounted Cash Flows.</Box>
        </TypographyHeader>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 20,
          my: 5,
        }}
      >
        <TypographyText isOnMobile={isOnMobile}>
          <Box>
            <SettingsIcon
              classes={{ root: iconClasses.root }}
              color="primary"
            />
          </Box>
          Use our DCF calculator to find a companies true intrinsic value for
          free within seconds.
        </TypographyText>
        <TypographyText isOnMobile={isOnMobile}>
          <Box>
            <TrendingUpIcon
              classes={{ root: iconClasses.root }}
              color="primary"
            />
          </Box>
          Fully transparent and based on Aswath Damoradan's models showing you
          each formula.
        </TypographyText>
        <TypographyText isOnMobile={isOnMobile}>
          <Box>
            <PublicIcon classes={{ root: iconClasses.root }} color="primary" />
          </Box>
          Support for over 60+ stock exchanges and more than 120,000 tickers all
          over the world.
        </TypographyText>
      </Box>
      <Box
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
      </Box>
      <Hidden mdDown>
        <Box
          style={{
            width: "100%",
            height: 240,
            bottom: 0,
            left: 0,
            position: "absolute",
          }}
          zIndex={-1}
        >
          <BackgroundPurple
            height="100%"
            width="100%"
            style={{ transform: "rotateX(180deg)" }}
          />
        </Box>
      </Hidden>
    </>
  );
};

export default Home;
