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
      <Typography variant="h4" align="center" gutterBottom color="white">
        Search for a company to begin.
      </Typography>
      <SearchTicker />
    </>
  );
};

const SearchSection = (props) => {
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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
      {...props}
      sx={{
        ...props.sx,
        height: "853px",
        ...(sixteen50Down ? undefined : { ml: 25, mr: 25 }),
      }}
    >
      <BackgroundImage
        fluid={data.background.childImageSharp.fluid}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "937px",
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
          rowGap: "16px",
          mb: 8,
        }}
      >
        <Box sx={{ flex: "1 1 350px", color: "white" }}>
          <Typography
            variant="h3"
            gutterBottom
            fontWeight={800}
            color="inherit"
          >
            Goodbye Excel.<Box>Hello automated Discounted Cash Flows.</Box>
          </Typography>
          <Typography variant="h6" color="inherit" gutterBottom>
            <Box>
              Excel is no longer suitable to provide detailed intrinsic
              valuation models.
            </Box>
            <Box>
              It's difficult to integrate third party financial API's and tools
              such as Monte Carlo simulations.
            </Box>
          </Typography>
          <Typography variant="h6" gutterBottom>
            <Box sx={{ mt: 1.5 }}>
              We've{" "}
              <Box component="span" color={theme.palette.primary.main}>
                solved
              </Box>{" "}
              that problem.
            </Box>
          </Typography>
          <Box sx={{ my: isMobile ? 4 : 0 }}>
            {twelve50Down ? (
              <Search />
            ) : (
              <Box sx={{ mt: 2 }}>
                <RoundButton
                  component={AnchorLink}
                  to="#features"
                  variant="contained"
                  color="primary"
                >
                  <Typography
                    fontSize={20}
                    sx={{ textTransform: "none", color: "white" }}
                  >
                    Explore Features
                  </Typography>
                </RoundButton>
              </Box>
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
