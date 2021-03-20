import React, { useState } from "react";
import {
  Box,
  withStyles,
  Typography,
  Button,
  IconButton,
  makeStyles,
  Hidden,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import GridDots from "../assets/grid-dots.svg";
import laptopImage from "../images/laptop.png";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import SearchTicker from "../components/SearchTicker";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import PurpleBackground from "../assets/purple-background.svg";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";

const useStyles = makeStyles({
  gridDot: {
    zIndex: -1,
    position: "absolute",
    left: 0,
    bottom: 0,
  },
});

const CustomButton = withStyles({
  root: ({ smDown }) => {
    const values = {
      textTransform: "none",
      fontWeight: 600,
      padding: "17px 44px",
      fontSize: "20px",
      borderRadius: "50px",
      transition: "all .4s ease-in-out",
      background: "#43cea2",
      visibility: "visible",
      animationDuration: "1.3s",
      animationDelay: "0.8s",
      animationName: "fadeInUp",
    };

    if (smDown) {
      return {
        ...values,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };
    }

    return values;
  },
})(Button);

const ButtonChevron = withStyles((theme) => ({
  root: {
    width: "45px",
    height: "45px",
    background: "#43cea2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    color: "#fff",
    borderRadius: "5px",
    position: "fixed",
    bottom: "30px",
    right: "30px",
    transition: "all 0.3s ease-out 0s",
    zIndex: theme.zIndex.scrollTopButton,
  },
}))(IconButton);

const TypographyHeader = withStyles({
  root: {
    // fontSize: ({ smDown }) => (smDown ? 30 : 55),
    // lineHeight: "65px",
    marginBottom: "20px",
    fontWeight: 800,
    color: "#fff",
    visibility: "visible",
    animationDuration: "1.3s",
    animationDelay: "0.4s",
    animationName: "fadeInDown",
  },
})(Typography);

const TypographyText = withStyles({
  root: {
    marginBottom: "25px",
    color: "#fff",
    paddingRight: "30px",
    visibility: "visible",
    animationDuration: "1.3s",
    animationDelay: "0.6s",
    animationName: "fadeInLeft",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: ({ smDown }) => (smDown ? "100%" : "30%"),
  },
})(Typography);

const TypographySearchText = withStyles({
  root: {
    fontWeight: 700,
    lineHeight: "28px",
    color: "#fff",
  },
})(Typography);

const Container = styled(Box)`
  margin-top: 30px;
  width: 100%;
  height: 100%;
`;

const Background = styled(PurpleBackground)`
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
`;

const SearchSection = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "laptop.png" }) {
        childImageSharp {
          fluid(maxWidth: 820) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  const classes = useStyles();
  const theme = useTheme();

  const [showScroll, setShowScroll] = useState(false);
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
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
    <Box style={{ marginBottom: smDown ? "90px" : "240px" }}>
      <Background />
      <Box
        style={{
          marginTop: 30,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          rowGap: "30px",
          ...(!sixteen50Down
            ? { marginLeft: 200, marginRight: 70 }
            : undefined),
        }}
      >
        <Box style={{ flex: "1 1 350px" }}>
          <TypographyHeader variant="h3">
            Goodbye Excel.
            <Box>Hello automated Discounted Cash Flows.</Box>
          </TypographyHeader>
          <TypographyText variant="h6">
            Find a companies true intrinsic value within minutes using our free
            DCF calculator.
          </TypographyText>
          {twelve50Down ? (
            <Box
              sx={{
                justifyContent: "center",
                marginTop: 5,
              }}
            >
              <TypographySearchText
                style={{
                  color: smDown ? "#313450" : "#fff",
                }}
                variant="h4"
                align="center"
                gutterBottom
              >
                Search for a company to begin.
              </TypographySearchText>
              <SearchTicker />
            </Box>
          ) : (
            <CustomButton
              smDown={smDown}
              component={AnchorLink}
              to="#features"
              variant="contained"
            >
              Explore Features
            </CustomButton>
          )}
        </Box>
        <Box style={{ flex: "1 1 820px", maxWidth: 820, position: "relative" }}>
          <Img
            fluid={data.file.childImageSharp.fluid}
            alt="Tracktak DCF Example"
          />
          <Hidden mdDown>
            <GridDots className={classes.gridDot} />
          </Hidden>
        </Box>
      </Box>
      <Box
        sx={{
          justifyContent: "center",
          marginTop: 7,
        }}
      >
        <TypographySearchText
          style={{
            color: smDown ? "#313450" : "#fff",
          }}
          variant="h4"
          align="center"
          gutterBottom
        >
          Search for a company to begin.
        </TypographySearchText>
        <SearchTicker />
      </Box>
      {showScroll && (
        <ButtonChevron onClick={scrollTop}>
          <KeyboardArrowUpIcon fontSize="large" />
        </ButtonChevron>
      )}
    </Box>
  );
};

export default SearchSection;
