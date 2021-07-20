import React, { forwardRef, useState, useEffect } from "react";
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

const sixteen50 = 1650;
const twelve50 = 1270;

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
      <Box
        sx={{
          "> div": {
            [theme.breakpoints.up("lg")]: {
              height: 830,
            },
            [theme.breakpoints.down("lg")]: {
              height: 930,
            },
            [theme.breakpoints.up("md")]: {
              height: 930,
            },
            [theme.breakpoints.down("md")]: {
              height: 930,
            },
            [theme.breakpoints.down("sm")]: {
              height: 830,
            },
            [theme.breakpoints.up(1250)]: {
              height: 800,
            },
            [theme.breakpoints.up(1240)]: {
              height: 800,
            },
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
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            zIndex: -1,
            top: 0,
            left: 0,
            position: "absolute",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          rowGap: "16px",
          [theme.breakpoints.up("lg")]: {
            mb: 23,
          },
          [theme.breakpoints.down("lg")]: {
            mb: 8,
          },
          [theme.breakpoints.up("md")]: {
            mb: 8,
          },
          [theme.breakpoints.down(1280)]: {
            mb: 8,
          },
          [theme.breakpoints.up(1250)]: {
            mb: 20,
          },
          [theme.breakpoints.down("sm")]: {
            mb: 8,
          },
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
                  USE FOR FREE
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
