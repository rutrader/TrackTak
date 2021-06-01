import { Box, Typography } from "@material-ui/core";
import React from "react";
import { ImCogs } from "react-icons/im";
import { RiTimerLine } from "react-icons/ri";
import { AiOutlineGlobal } from "react-icons/ai";
import { BiBookOpen } from "react-icons/bi";

export const BoxColumnWrapper = ({ sx, ...props }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        flex: "1 1 234px",
        ...sx,
      }}
      {...props}
    />
  );
};

const IconGradient = ({ lightColor, darkColor, ...props }) => (
  <Box
    {...props}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      width: "69px",
      height: "69px",
      borderRadius: "50%",
      color: "#fff",
      mx: "auto",
      fontSize: "28px",
      backgroundImage: `linear-gradient(${lightColor} 0%, ${darkColor} 100%)`,
      mb: "30px",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        backgroundImage: "inherit",
        opacity: 0.15,
        zIndex: -1,
        transform: "scale(1.3)",
        transition: "all 0.3s ease-out 0s",
      },
    }}
  />
);

const BoxIcon = ({ sx, ...props }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        visibility: "visible",
        animationDuration: "1.3s",
        animationDelay: "0.8s",
        animationName: "fadeInUp",
        ...sx,
      }}
      {...props}
    />
  );
};

const FeatureHeader = (props) => (
  <Typography
    {...props}
    sx={{
      whiteSpace: "nowrap",
      visibility: "visible",
      animationDelay: "0.4s",
      animationName: "fadeInUp",
      fontSize: "25px",
      color: "#313450",
      fontWeight: "bold",
      marginBottom: (theme) => theme.spacing(2),
    }}
  />
);

const FeatureText = (props) => (
  <Typography
    {...props}
    sx={{
      fontSize: "18px",
      visibility: "visible",
      animationDelay: "0.6s",
      animationName: "fadeInUp",
    }}
    color="textSecondary"
  />
);

const FeaturesSection = () => {
  return (
    <Box id="features">
      <Box
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "55px",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            visibility: "visible",
            animationDelay: "0.2s",
            animationName: "fadeInDown",
          }}
          color="primary"
          fontSize={25}
          fontWeight="bold"
          gutterBottom
        >
          Our Core
        </Typography>
        <Typography
          sx={{
            visibility: "visible",
            animationDelay: "0.4s",
            animationName: "fadeInUp",
            fontWeight: "bold",
            color: "#313450",
            marginBottom: (theme) => theme.spacing(2),
          }}
          variant="h3"
        >
          Features
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Finding a companies true value just got a whole lot easier with our
          free intrinsic value calculator.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6.2,
        }}
      >
        <BoxColumnWrapper>
          <BoxIcon>
            <IconGradient lightColor="#6240c8" darkColor="#a145fe">
              <BiBookOpen fontSize="30px" />
            </IconGradient>
            <FeatureHeader variant="h4">Transparent</FeatureHeader>
            <FeatureText>
              Based on Aswath Damodaran's models showing you each formula.
            </FeatureText>
          </BoxIcon>
        </BoxColumnWrapper>
        <BoxColumnWrapper>
          <BoxIcon>
            <IconGradient lightColor="#e44e83" darkColor="#ffb8d1">
              <RiTimerLine fontSize="30px" />
            </IconGradient>
            <FeatureHeader variant="h4">Automated</FeatureHeader>
            <FeatureText>
              Calculates your DCF inputs based on historical and current data.
            </FeatureText>
          </BoxIcon>
        </BoxColumnWrapper>
        <BoxColumnWrapper>
          <BoxIcon>
            <IconGradient lightColor="#b548f2" darkColor="#d283fd">
              <ImCogs fontSize="30px" />
            </IconGradient>
            <FeatureHeader variant="h4">Sensitivity Analysis</FeatureHeader>
            <FeatureText>
              Immediately shows you the different estimated price of various
              inputs.
            </FeatureText>
          </BoxIcon>
        </BoxColumnWrapper>
        <BoxColumnWrapper>
          <BoxIcon>
            <IconGradient lightColor="#40b4f6" darkColor="#79cefd">
              <AiOutlineGlobal fontSize="30px" />
            </IconGradient>
            <FeatureHeader variant="h4">Global</FeatureHeader>
            <FeatureText>
              Over 60+ stock exchanges and more than 120,000 tickers all over
              the world.
            </FeatureText>
          </BoxIcon>
        </BoxColumnWrapper>
      </Box>
    </Box>
  );
};

export default FeaturesSection;
