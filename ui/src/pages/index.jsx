import {
  Box,
  Typography,
  Hidden,
  useMediaQuery,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import React from "react";
// import SearchTicker from "../components/SearchTicker";
import SettingsIcon from "@material-ui/icons/Settings";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import PublicIcon from "@material-ui/icons/Public";
import BackgroundPurple from "../assets/backgroundPurple.svg";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";

const textColor = "#292929";

const useStyles = makeStyles({
  icon: {
    minWidth: 50,
    minHeight: 50,
  },
  typographyHeader: {
    fontWeight: "bold",
    fontSize: ({ isOnMobile }) => (isOnMobile ? 30 : 30),
    color: textColor,
  },
  typographyText: {
    fontSize: 20,
    textAlign: "center",
    color: textColor,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: ({ isOnMobile }) => (isOnMobile ? "100%" : "30%"),
  },
});

const Home = () => {
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ isOnMobile });

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
        <Typography classes={{ root: classes.typographyHeader }} align="center">
          Goodbye, Excel.
          <Box>Hello, automated Discounted Cash Flows.</Box>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2.5,
          my: 5,
        }}
      >
        <Typography classes={{ root: classes.typographyText }}>
          <Box>
            <SettingsIcon classes={{ root: classes.icon }} color="primary" />
          </Box>
          Use our DCF calculator to find a companies true intrinsic value for
          free within minutes.
        </Typography>
        <Typography classes={{ root: classes.typographyText }}>
          <Box>
            <TrendingUpIcon classes={{ root: classes.icon }} color="primary" />
          </Box>
          Fully transparent and based on Aswath Damoradan's models showing you
          each formula.
        </Typography>
        <Typography classes={{ root: classes.typographyText }}>
          <Box>
            <PublicIcon classes={{ root: classes.icon }} color="primary" />
          </Box>
          Support for over 60+ stock exchanges and more than 120,000 tickers all
          over the world.
        </Typography>
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
        {/* <SearchTicker /> */}
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
