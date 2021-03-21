import React, { useState } from "react";
import {
  Box,
  withStyles,
  Typography,
  IconButton,
  makeStyles,
  Hidden,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import GridDots from "../assets/grid-dots.svg";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import SearchTicker from "../components/SearchTicker";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import RoundButton from "../components/RoundButton";
import BackgroundImage from "gatsby-background-image";

const useStyles = makeStyles({
  gridDot: {
    zIndex: -1,
    position: "absolute",
    left: 0,
    bottom: 0,
  },
});

const ButtonChevron = withStyles((theme) => ({
  root: {
    "&:hover": {
      background: theme.palette.primary.dark,
    },
    width: "45px",
    height: "45px",
    background: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    color: "white",
    borderRadius: "5px",
    position: "fixed",
    bottom: "30px",
    right: "30px",
    transition: "all 0.3s ease-out 0s",
    zIndex: theme.zIndex.scrollTopButton,
  },
}))(IconButton);

const Search = () => {
  return (
    <>
      <Typography
        fontWeight={700}
        variant="h4"
        align="center"
        gutterBottom
        color="white"
      >
        Search for a company to begin.
      </Typography>
      <SearchTicker />
    </>
  );
};

const SearchSection = () => {
  const data = useStaticQuery(graphql`
    query {
      laptop: file(relativePath: { eq: "laptop.png" }) {
        childImageSharp {
          fluid(maxWidth: 820) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      background: file(relativePath: { eq: "purple-background.png" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);
  const classes = useStyles();
  const theme = useTheme();

  const [showScroll, setShowScroll] = useState(false);
  const sixteen50Down = useMediaQuery(theme.breakpoints.down(1650));
  const twelve50Down = useMediaQuery(theme.breakpoints.down(1250));

  const checkScrollTop = () => {
    if (window.pageYOffset > 400) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  window.addEventListener("scroll", checkScrollTop);

  return (
    <Box
      sx={{
        height: "853px",
        mb: 2,
        ...(sixteen50Down ? undefined : { ml: 25, mr: 25 }),
      }}
    >
      <BackgroundImage
        fluid={data.background.childImageSharp.fluid}
        style={{
          width: "100%",
          height: "100%",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: -1,
          top: 0,
          left: 0,
          position: "absolute",
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          rowGap: "30px",
          mb: 4,
        }}
      >
        <Box sx={{ flex: "1 1 350px", color: "white" }}>
          <Typography
            variant="h3"
            gutterBottom
            fontWeight={800}
            color="inherit"
          >
            Goodbye Excel.
            <Box>Hello automated Discounted Cash Flows.</Box>
          </Typography>
          <Typography variant="h6" color="inherit" gutterBottom>
            Find a companies true intrinsic value within minutes using our free
            DCF calculator.
          </Typography>
          <Box
            sx={{
              mt: 4,
            }}
          >
            {twelve50Down ? (
              <Search />
            ) : (
              <RoundButton
                component={AnchorLink}
                to="#features"
                variant="contained"
                color="primary"
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  style={{ textTransform: "none", color: "white" }}
                >
                  Explore Features
                </Typography>
              </RoundButton>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            flex: "1 1 820px",
            maxWidth: 820,
            position: "relative",
            mr: sixteen50Down ? undefined : -16.25,
          }}
        >
          <Img
            fluid={data.laptop.childImageSharp.fluid}
            alt="Tracktak DCF Example"
          />
          <Hidden mdDown>
            <GridDots className={classes.gridDot} />
          </Hidden>
        </Box>
      </Box>
      {!twelve50Down && <Search />}
      {showScroll && (
        <ButtonChevron onClick={scrollTop}>
          <KeyboardArrowUpIcon fontSize="large" />
        </ButtonChevron>
      )}
    </Box>
  );
};

export default SearchSection;
