import React from "react";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { useEffect } from "react";
import { useState } from "react";
import TTTestimonials from "../components/TTTestimonials";

const stepsMobile = [
  {
    description: (
      <TTTestimonials
        testimonialName="Oliver Djursing"
        testimonialMessage="It’s mind blowing how nice it all is, finance data is hard to find
        easily and reliably without paying a big premium or having to
        searched the whole internet. I whole-heartedly believe this could be
        the new go-to source for private investors!"
      />
    ),
  },
  {
    description: (
      <TTTestimonials
        testimonialName="Robbert Smit"
        testimonialMessage="This tool is absolutely awesome. Please continue the great work! I
      am definitely going to share this tool with my network who are all
      still using template models and have to fetch the inputs each time
      they want to do a calculation."
      />
    ),
  },
  {
    description: (
      <TTTestimonials
        testimonialName="Adam Parmer"
        testimonialMessage="I just signed up for alerts. Just wanted to thank you for putting
      this together. I really look forward to seeing what you put together
      in the future. I have been looking for a tool like this and I love
      that there is an editable 'Excel Table' inline."
      />
    ),
  },
  {
    description: (
      <TTTestimonials
        testimonialName="Stefan"
        testimonialMessage="I'm a regular user, I enjoy your site a lot and the tools you offer
      there."
      />
    ),
  },
];

const stepsDesktop = [
  {
    description: (
      <>
        <TTTestimonials
          testimonialName="Oliver Djursing"
          testimonialMessage="It’s mind blowing how nice it all is, finance data is hard to find
            easily and reliably without paying a big premium or having to
            searched the whole internet. I whole-heartedly believe this could be
            the new go-to source for private investors!"
        />
        <TTTestimonials
          testimonialName="Robbert Smit"
          testimonialMessage="This tool is absolutely awesome. Please continue the great work! I
          am definitely going to share this tool with my network who are all
          still using template models and have to fetch the inputs each time
          they want to do a calculation."
        />
      </>
    ),
  },
  {
    description: (
      <>
        <TTTestimonials
          testimonialName="Adam Parmer"
          testimonialMessage="I just signed up for alerts. Just wanted to thank you for putting
          this together. I really look forward to seeing what you put together
          in the future. I have been looking for a tool like this and I love
          that there is an editable 'Excel Table' inline."
        />
        <TTTestimonials
          testimonialName="Stefan"
          testimonialMessage="I'm a regular user, I enjoy your site a lot and the tools you offer
          there."
        />
      </>
    ),
  },
];

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
      <Box id="testimonials">
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
            Testimonials
          </Typography>
          <Typography
            sx={{
              visibility: "visible",
              animationDelay: "0.4s",
              animationName: "fadeInUp",
              fontWeight: "bold",
              color: theme.palette.primary.mainTextColor,
              marginBottom: (theme) => theme.spacing(2),
            }}
            variant="h3"
          >
            What Users Says
          </Typography>
          <Typography variant="h6" color="textSecondary">
            See what people have to say about us.
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
          {isOnMobile
            ? stepsMobile[activeStep]?.description
            : stepsDesktop[activeStep]?.description}
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
