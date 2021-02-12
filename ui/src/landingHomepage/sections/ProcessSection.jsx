import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  makeStyles,
  Typography,
  withStyles,
} from "@material-ui/core";
import processImage from "../../icons/process-img.jpg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  accordion: {
    width: "100%",
    textAlign: "left",
    position: "relative",
  },
  dots: {
    maxWidth: 688,
    flexGrow: 1,
  },
  root: {
    maxWidth: 688,
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 489,
    maxWidth: 688,
    width: "100%",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
}));

const CustomBox = ({ sx, ...props }) => {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        paddingBottom: "150px",
        paddingTop: "150px",
        background: "#F4F7FC",
        ...sx,
      }}
      {...props}
    />
  );
};

const BoxRowWrapper = ({ sx, ...props }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: "1 0 100%",
        flexWrap: "wrap",
        ...sx,
      }}
      {...props}
    />
  );
};

const TypographyHeader = withStyles({
  root: {
    visibility: "visible",
    animationDelay: "0.4s",
    animationName: "fadeInUp",
    fontWeight: 700,
    color: "#313450",
    marginBottom: "15px",
  },
})(Typography);

const TypographySubHeader = withStyles({
  root: {
    fontSize: "25px",
    fontWeight: 600,
    display: "block",
    color: "#43cea2",
    marginBottom: "12px",
    visibility: "visible",
    animationDelay: "0.2s",
    animationName: "fadeInDown",
  },
})(Typography);

const TypographyText = withStyles({
  root: {
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "28px",
    color: "#6B6F92",
  },
})(Typography);

const TypographyStepHeader = withStyles({
  root: {
    fontSize: "25px",
    fontWeight: 700,
    color: "#313450",
    display: "block",
    paddingTop: "10px",
  },
})(Typography);

const TypographyNumber = withStyles({
  root: {
    fontSize: "25px",
    fontWeight: 700,
    color: "#fff",
  },
})(Typography);

const AccordionCustom = withStyles({
  root: {
    marginBottom: "15px",
    borderRadius: "4px",
    padding: "13px",
    alignItems: "center",
    boxShadow: "none",
    "&.MuiAccordion-root:before": {
      backgroundColor: "white",
    },
  },
})(Accordion);

const BoxGradientIconTransparent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 59px;
  height: 59px;
  line-height: 75px;
  border-radius: 50%;
  color: #fff;
  font-size: 28xp;
  z-index: 1;
  background-image: linear-gradient(#6240c8 0%, #a145fe 100%);
  margin-right: 24px;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image: inherit;
    opacity: 0.15;
    z-index: -1;
    left: 0;
    top: 0;
    transform: scale(1.3);
    transition: all 0.3s ease-out 0s;
  }
`;

const BoxGradientIconAuto = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 59px;
  height: 59px;
  line-height: 75px;
  border-radius: 50%;
  color: #fff;
  font-size: 28xp;
  z-index: 1;
  background-image: linear-gradient(#b548f2 0%, #d283fd 100%);
  margin-right: 24px;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image: inherit;
    opacity: 0.15;
    z-index: -1;
    left: 0;
    top: 0;
    transform: scale(1.3);
    transition: all 0.3s ease-out 0s;
  }
`;

const BoxGradientIconTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 59px;
  height: 59px;
  line-height: 75px;
  border-radius: 50%;
  color: #fff;
  z-index: 1;
  background-image: linear-gradient(#e44e83 0%, #ffb8d1 100%);
  margin-right: 24px;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image: inherit;
    opacity: 0.15;
    z-index: -1;
    left: 0;
    top: 0;
    transform: scale(1.3);
    transition: all 0.3s ease-out 0s;
  }
`;

const ProcessSection = () => {
  const classes = useStyles();
  return (
    <CustomBox>
      <Container maxWidth="lg">
        <BoxRowWrapper>
          <Box
            sx={{
              flex: "0 0 auto",
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <Box sx={{ marginBottom: "50px" }}>
              <TypographySubHeader variant="h4">
                Easy to Use
              </TypographySubHeader>
              <TypographyHeader variant="h3">
                Project Management System
              </TypographyHeader>
              <TypographyText>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                seddinonumy eirmod tempor invidunt ut labore.Smratseo is a brand
                of digital agency. Competen.
              </TypographyText>
            </Box>
            <Box className={classes.accordion}>
              <AccordionCustom>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <BoxGradientIconTransparent>
                    <TypographyNumber>1</TypographyNumber>
                  </BoxGradientIconTransparent>
                  <TypographyStepHeader>Search for stock</TypographyStepHeader>
                </AccordionSummary>
                <AccordionDetails>
                  <TypographyText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </TypographyText>
                </AccordionDetails>
              </AccordionCustom>
              <AccordionCustom>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <BoxGradientIconAuto>
                    <TypographyNumber>2</TypographyNumber>
                  </BoxGradientIconAuto>
                  <TypographyStepHeader>Fill in inputs</TypographyStepHeader>
                </AccordionSummary>
                <AccordionDetails>
                  <TypographyText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </TypographyText>
                </AccordionDetails>
              </AccordionCustom>
              <AccordionCustom>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <BoxGradientIconTime>
                    <TypographyNumber>3</TypographyNumber>
                  </BoxGradientIconTime>
                  <TypographyStepHeader>View the output</TypographyStepHeader>
                </AccordionSummary>
                <AccordionDetails>
                  <TypographyText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </TypographyText>
                </AccordionDetails>
              </AccordionCustom>
            </Box>
          </Box>
          <Box className={classes.root}>
            <img
              className={classes.img}
              src={processImage}
              alt="processImage"
            />
          </Box>
        </BoxRowWrapper>
      </Container>
    </CustomBox>
  );
};

export default ProcessSection;
