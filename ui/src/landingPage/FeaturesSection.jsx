import { Box, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { ImCogs } from "react-icons/im";
import { RiTimerLine } from "react-icons/ri";
import { AiOutlineGlobal } from "react-icons/ai";
import { BiBookOpen } from "react-icons/bi";
import styled from "styled-components";

const BoxColumnWrapper = ({ sx, ...props }) => {
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

const IconGradient = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 69px;
  height: 69px;
  border-radius: 50%;
  color: #fff;
  margin-left: auto;
  margin-right: auto;
  font-size: 28xp;
  background-image: linear-gradient(
    ${({ $lightColor }) => $lightColor} 0%,
    ${({ $darkColor }) => $darkColor} 100%
  );
  margin-bottom: 30px;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image: inherit;
    opacity: 0.15;
    z-index: -1;
    transform: scale(1.3);
    transition: all 0.3s ease-out 0s;
  }
`;

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

const Header = withStyles((theme) => ({
  root: {
    visibility: "visible",
    animationDelay: "0.4s",
    animationName: "fadeInUp",
    fontWeight: "bold",
    color: "#313450",
    marginBottom: theme.spacing(2),
  },
}))(Typography);

const SubHeader = withStyles({
  root: {
    visibility: "visible",
    animationDelay: "0.2s",
    animationName: "fadeInDown",
  },
})(Typography);

const FeatureHeader = withStyles((theme) => ({
  root: {
    visibility: "visible",
    animationDelay: "0.4s",
    animationName: "fadeInUp",
    fontSize: "25px",
    color: "#313450",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
}))(Typography);

const FeatureText = withStyles({
  root: {
    fontSize: "18px",
    visibility: "visible",
    animationDelay: "0.6s",
    animationName: "fadeInUp",
  },
})((props) => <Typography {...props} color="textSecondary" />);

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
        <SubHeader color="primary" fontSize={25} fontWeight="bold" gutterBottom>
          Our Core
        </SubHeader>
        <Header variant="h3">Features</Header>
        <Typography variant="h6" color="textSecondary">
          Finding a companies intrinsic value just got a whole lot easier with
          our free DCF calculator.
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
            <IconGradient $lightColor="#6240c8" $darkColor="#a145fe">
              <BiBookOpen fontSize="30px" />
            </IconGradient>
            <FeatureHeader variant="h4">Fully Transparent</FeatureHeader>
            <FeatureText>
              Based on Aswath Damodaran's models showing you each formula.
            </FeatureText>
          </BoxIcon>
        </BoxColumnWrapper>
        <BoxColumnWrapper>
          <BoxIcon>
            <IconGradient $lightColor="#b548f2" $darkColor="#d283fd">
              <ImCogs fontSize="30px" />
            </IconGradient>
            <FeatureHeader variant="h4">Automated Inputs</FeatureHeader>
            <FeatureText>
              Automates your DCF inputs based on historical and current data.
            </FeatureText>
          </BoxIcon>
        </BoxColumnWrapper>
        <BoxColumnWrapper>
          <BoxIcon>
            <IconGradient $lightColor="#e44e83" $darkColor="#ffb8d1">
              <RiTimerLine fontSize="30px" />
            </IconGradient>
            <FeatureHeader variant="h4">Saves You Time</FeatureHeader>
            <FeatureText>
              Finds a companies true intrinsic value within minutes.
            </FeatureText>
          </BoxIcon>
        </BoxColumnWrapper>
        <BoxColumnWrapper>
          <BoxIcon>
            <IconGradient $lightColor="#40b4f6" $darkColor="#79cefd">
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
