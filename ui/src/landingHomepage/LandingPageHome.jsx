import React, { useState } from "react";
import {
  Box,
  withStyles,
  Typography,
  Button,
  IconButton,
  makeStyles,
  Container,
} from "@material-ui/core";
import purpleBackground from "../icons/purple-background.svg";
import { ReactComponent as GridDots } from "../icons/grid-dots.svg";
import laptopImage from "../icons/laptop-img.png";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

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

const ButtonChevron = withStyles({
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
  },
})(IconButton);

const TypographyHeader = withStyles({
  root: {
    fontSize: "55px",
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
  },
})(Typography);

const CustomBox = ({ sx, ...props }) => {
  return (
    <Box
      sx={{
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        paddingTop: "300px",
        paddingBottom: "240px",
        backgroundImage: `url(${purpleBackground})`,
        ...sx,
      }}
      {...props}
    />
  );
};

const LandingPageHome = () => {
  const classes = useStyles();
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
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
            <TypographyHeader variant="h1">
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
      </CustomBox>
      <Box>
        <ButtonChevron onClick={scrollTop}>
          <KeyboardArrowUpIcon fontSize="large" />
        </ButtonChevron>
      </Box>
    </>
  );
};

export default LandingPageHome;
