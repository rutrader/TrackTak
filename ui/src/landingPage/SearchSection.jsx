import React, { forwardRef, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Hidden,
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
import { useEffect } from "react";

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

const sixteen50 = 1650;
const twelve50 = 1250;

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

  const theme = useTheme();
  const [showScroll, setShowScroll] = useState(false);
  const [showBackgroundColor, setShowBackgroundColor] = useState(true);

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

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    // Turn off the bg when not in SSR
    setShowBackgroundColor(false);

    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, []);

  return (
    <Box
      sx={{
        height: "853px",
        [theme.breakpoints.up(sixteen50)]: {
          mx: 25,
        },
      }}
    >
      <BackgroundImage
        backgroundColor={
          showBackgroundColor ? theme.palette.secondary.light : undefined
        }
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
            Goodbye Excel.
            <br />
            Hello automated Discounted Cash Flows.
          </Typography>
          <Typography variant="h6" color="inherit" gutterBottom>
            <Box>
              tracktak enables you to do quick DCF models based on Aswath
              Damodaran's techniques directly in the cloud.
              <br />
              <br />
              Free while in beta.
            </Box>
          </Typography>
          <Box
            sx={{
              [theme.breakpoints.down("sm")]: {
                my: 4,
              },
              [theme.breakpoints.up("sm")]: {
                my: 0,
              },
            }}
          >
            <Box
              sx={{
                [theme.breakpoints.up(twelve50)]: {
                  display: "none",
                },
              }}
            >
              <Search />
            </Box>
            <Box
              sx={{
                mt: 2,
                [theme.breakpoints.down(twelve50)]: {
                  display: "none",
                },
              }}
            >
              <RoundButton
                component={forwardRef((props, ref) => (
                  <AnchorLink {...props} gatsbyLinkProps={{ ref }} />
                ))}
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
          </Box>
        </Box>
        <Box
          sx={{
            flex: "1 1 820px",
            maxWidth: 820,
            position: "relative",
            [theme.breakpoints.up(sixteen50)]: {
              mr: -16.25,
            },
          }}
        >
          <Img
            fluid={data.laptop.childImageSharp.fluid}
            alt="Tracktak DCF Example"
          />
          <Hidden mdDown implementation="css">
            <GridDots
              style={{
                zIndex: -1,
                position: "absolute",
                left: 0,
                bottom: 0,
              }}
            />
          </Hidden>
        </Box>
      </Box>
      <Box
        sx={{
          [theme.breakpoints.down(twelve50)]: {
            display: "none",
          },
        }}
      >
        <Search />
      </Box>
      {showScroll && (
        <IconButton
          sx={{
            "&:hover": {
              background: (theme) => theme.palette.primary.dark,
            },
            width: "45px",
            height: "45px",
            background: (theme) => theme.palette.primary.main,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
            color: "white",
            borderRadius: "5px",
            position: "fixed",
            bottom: "5px",
            right: "29px",
            transition: "all 0.3s ease-out 0s",
            zIndex: (theme) => theme.zIndex.scrollTopButton,
          }}
          onClick={scrollTop}
        >
          <KeyboardArrowUpIcon fontSize="large" />
        </IconButton>
      )}
    </Box>
  );
};

export default SearchSection;
