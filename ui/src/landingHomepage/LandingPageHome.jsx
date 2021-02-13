import React, { useState } from "react";
import {
  Box,
  withStyles,
  Typography,
  Button,
  IconButton,
  makeStyles,
  Container,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import purpleBackground from "../icons/purple-background.svg";
import { ReactComponent as GridDots } from "../icons/grid-dots.svg";
import laptopImage from "../icons/laptop-img.png";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import SearchTicker from "../components/SearchTicker";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  laptopImage: {
    visibility: "visible",
    animationDuration: "1.3s",
    animationDelay: "0.4s",
    animationName: "fadeInRight",
  },
  gridDot: {
    position: "absolute",
    bottom: "-60px",
    left: "-30px",
    zIndex: -1,
  },
}));

const CustomButton = withStyles({
  root: {
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
    fontSize: ({ isOnMobile }) => (isOnMobile ? 30 : 55),
    lineHeight: "65px",
    fontWeight: 800,
    marginBottom: "20px",
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

const CustomBox = styled.div`
  margin-top: 80px;
  margin-bottom: 240px;
  width: 100%;
  height: 100%;
  &:before {
    content: "";
    background-image: url(${purpleBackground});
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`;

const LandingPageHome = () => {
  const theme = useTheme();
  const classes = useStyles();

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
    <>
      <CustomBox>
        <Container
          maxWidth="lg"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Box>
            <TypographyHeader isOnMobile={isOnMobile} variant="h1">
              Hello, automated Discounted Cash Flows.
            </TypographyHeader>
            <TypographyText variant="h6">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore.
            </TypographyText>
            <CustomButton variant="contained">Explore Features</CustomButton>
          </Box>
          <Box sx={{ flex: "0 0 auto", width: "41.666667%" }}>
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <img
                className={classes.laptopImage}
                alt="laptopImage"
                src={laptopImage}
              />
              <GridDots className={classes.gridDot} />
            </Box>
          </Box>
        </Container>
        <Box
          sx={{
            justifyContent: "center",
            mt: "126px",
          }}
        >
          <TypographySearchText variant="h4" align="center" gutterBottom>
            Search for a company to begin.
          </TypographySearchText>
          <SearchTicker />
        </Box>
      </CustomBox>
      {showScroll && (
        <ButtonChevron onClick={scrollTop}>
          <KeyboardArrowUpIcon fontSize="large" />
        </ButtonChevron>
      )}
    </>
  );
};

export default LandingPageHome;
