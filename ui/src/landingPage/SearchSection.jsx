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

const useStyles = makeStyles((theme) => ({
  laptopImage: {
    visibility: "visible",
    animationDuration: "1.3s",
    animationDelay: "0.4s",
    animationName: "fadeInRight",
    position: "absolute",
    top: -178,
    left: -142,
    zIndex: 0,
  },
  gridDot: {
    top: 147,
    zIndex: -1,
    position: "absolute",
    left: -139,
  },
}));

const CustomButton = withStyles({
  root: ({ isOnMobile }) => {
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

    if (isOnMobile) {
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
    // fontSize: ({ isOnMobile }) => (isOnMobile ? 30 : 55),
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
    flexBasis: ({ isOnMobile }) => (isOnMobile ? "100%" : "30%"),
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
  const classes = useStyles();
  const theme = useTheme();

  const [showScroll, setShowScroll] = useState(false);
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
    <Container style={{ marginBottom: isOnMobile ? "90px" : "240px" }}>
      <Background />
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: "2px",
          rowGap: "30px",
        }}
      >
        <Box style={{ flex: 2 }}>
          <TypographyHeader variant="h2">
            Goodbye Excel, Hello automated Discounted Cash Flows.
          </TypographyHeader>
          <TypographyText variant="h6">
            Find a companies true intrinsic value within minutes using our free
            DCF calculator.
          </TypographyText>
          <CustomButton
            isOnMobile={isOnMobile}
            component={AnchorLink}
            to="#features"
            variant="contained"
          >
            Explore Features
          </CustomButton>
        </Box>
        <Box style={{ flex: 1.3, position: "relative" }}>
          <img
            className={classes.laptopImage}
            alt="laptopImage"
            src={laptopImage}
          />
          <Hidden mdDown>
            <GridDots className={classes.gridDot} />
          </Hidden>
        </Box>
      </Box>
      <Box
        sx={{
          justifyContent: "center",
          marginTop: "140px",
        }}
      >
        <TypographySearchText
          style={{
            color: isOnMobile ? "#313450" : "#fff",
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
    </Container>
  );
};

export default SearchSection;
