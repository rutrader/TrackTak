import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Testimonials from "../components/Testimonials";

const robbertSmitTestimonial = (
  <Testimonials
    testimonialName="Robbert Smit"
    testimonialMessage="This tool is absolutely awesome. Please continue the great work! I
      am definitely going to share this tool with my network who are all
      still using template models and have to fetch the inputs each time
      they want to do a calculation."
  />
);

const stefanTestimonial = (
  <Testimonials
    testimonialName="Stefan"
    testimonialMessage="I'm a regular user, I enjoy your site a lot and the tools you offer
there."
  />
);

const redditTestimonialOne = (
  <Testimonials
    testimonialName="Wonderful Idea!"
    testimonialMessage={
      <>
        I love it. I initially found the prof's website and downloaded his excel
        sheets and thought it was very tedious. Your website really does make
        these analysis that much easier.
        <Box>
          Source:{" "}
          <Link
            rel="noreferrer"
            target="_blank"
            href="https://www.reddit.com/r/tracktak/comments/mvkwws/wonderful_idea/"
          >
            Reddit
          </Link>
        </Box>
      </>
    }
  ></Testimonials>
);

const redditTestimonialTwo = (
  <Testimonials
    testimonialName="Amazing!!!"
    testimonialMessage={
      <>
        After finbox stopped the excel add-on I was desperate for a new tool and
        your financial overview is simply something else!
        <Box>
          Source:{" "}
          <Link
            rel="noreferrer"
            target="_blank"
            href="https://www.reddit.com/r/tracktak/comments/mqep3m/amazing/"
          >
            Reddit
          </Link>
        </Box>
      </>
    }
  ></Testimonials>
);

const stepsDesktop = [
  [robbertSmitTestimonial, stefanTestimonial],
  [redditTestimonialOne, redditTestimonialTwo],
];

const stepsMobile = stepsDesktop.flatMap((x) => x);

const TestimonialsSection = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const maxSteps = isOnMobile ? stepsMobile.length : stepsDesktop.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (!isOnMobile) {
      setActiveStep(0);
    }
  }, [isOnMobile]);

  return (
    <>
      <Box>
        <Box
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: theme.spacing(7),
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              visibility: "visible",
              animationDelay: "0.2s",
              animationName: "fadeInDown",
              fontSize: theme.typography.fontSize3,
              fontWeight: "bold",
            }}
            color="primary"
            gutterBottom
          >
            Testimonials
          </Typography>
          <Typography
            sx={{
              visibility: "visible",
              animationDelay: "0.4s",
              animationName: "fadeInUp",
              fontWeight: "bold",
              color: theme.palette.primary.mainTextColor,
              marginBottom: theme.spacing(2),
            }}
            variant="h3"
          >
            Looking for more reasons?
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Hear from our users about what changed for the better since they
            switched from Excel to tracktak.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            "& > :not(style)": {
              padding: "35px",
              borderRadius: "10px",
              textAlign: "left",
              boxShadow:
                "0 1px 10px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
            },
          }}
        >
          {isOnMobile ? stepsMobile[activeStep] : stepsDesktop[activeStep]}
        </Box>
        <MobileStepper
          sx={{
            "& .MuiMobileStepper-dot": {
              width: "15px",
              height: "15px",
            },
            "&.MuiMobileStepper-root": {
              background: "transparent",
            },
          }}
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <IconButton
              color="primary"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft fontSize="large" />
              ) : (
                <KeyboardArrowRight fontSize="large" />
              )}
            </IconButton>
          }
          backButton={
            <IconButton
              color="primary"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight fontSize="large" />
              ) : (
                <KeyboardArrowLeft fontSize="large" />
              )}
            </IconButton>
          }
        ></MobileStepper>
      </Box>
    </>
  );
};

export default TestimonialsSection;
