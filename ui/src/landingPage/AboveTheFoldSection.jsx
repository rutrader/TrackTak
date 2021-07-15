import React, { forwardRef, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Hidden,
  useTheme,
} from "@material-ui/core";
import GridDots from "../icons/grid-dots.svg";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import RoundButton from "../components/RoundButton";
import BackgroundImage from "gatsby-background-image";
import { useEffect } from "react";

const sixteen50 = 1650;
const twelve50 = 1250;

const AboveTheFoldSection = () => {
  const data = useStaticQuery(graphql`
    query {
      laptop: file(relativePath: { eq: "laptop-template.png" }) {
        childImageSharp {
          fluid(maxWidth: 820) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      background: file(relativePath: { eq: "purple-background.png" }) {
        childImageSharp {
          fluid(quality: 70, maxWidth: 1920) {
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
        mt: 6,
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
          height: 930,
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
            Tired of complicated excel Discounted Cash Flow templates?
          </Typography>
          <Typography variant="h6" color="inherit" gutterBottom>
            <Box>
              tracktak enables you to do quick DCF models based on prof. Aswath
              Damodaran's techniques directly in the cloud.
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
                mt: 4,
                mb: 2,
              }}
            >
              <RoundButton
                component={forwardRef((props, ref) => (
                  <AnchorLink {...props} gatsbyLinkProps={{ ref }} />
                ))}
                to="#get-started"
                variant="contained"
                color="primary"
              >
                <Typography
                  fontSize={20}
                  sx={{ textTransform: "none", color: "white" }}
                >
                  Get started for Free
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
            bottom: "30px",
            right: "30px",
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

export default AboveTheFoldSection;
