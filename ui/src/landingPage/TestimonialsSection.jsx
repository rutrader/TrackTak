import React from "react";
import { Box, Paper, Typography, useTheme } from "@material-ui/core";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const TestimonialsSection = () => {
  const theme = useTheme();

  //overflow: hidden
  //position: relative

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
            Finding a companies true value just got a whole lot easier with our
            free intrinsic value calculator.
          </Typography>
        </Box>
        <Box
          component={Carousel}
          showArrows={false}
          showStatus={false}
          swipeable={true}
          sx={{
            position: "relative",
            "&.carousel-root .carousel .dot": {
              backgroundColor: theme.palette.primary.main,
              width: "15px",
              height: "15px",
              boxShadow: "none",
              bottom: "-10px",
            },
            "&.carousel-root .carousel .control-dots": {
              bottom: "-10px",
            },
            "& .carousel.carousel-slider": {
              position: " static",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 5,
              "& > :not(style)": {
                padding: "35px",
                borderRadius: "10px",
                boxShadow:
                  "0 1px 10px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
              },
            }}
          >
            <Paper elevation={6} sx={{ flex: "1 1 300px" }}>
              <FormatQuoteIcon
                fontSize="large"
                sx={{
                  color: theme.palette.secondary.light,
                  transform: "scaleY(-1) scaleX(-1)",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.mainTextColor,
                }}
              >
                Adam Johnson
              </Typography>
              <Box sx={{ marginTop: (theme) => theme.spacing(2) }}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{
                    fontSize: "18px",
                  }}
                >
                  Stumbled upon your website a few weeks back and I love it. I
                  initially found the prof. Aswath Damodaran's website and
                  downloaded his excel sheets and thought it was very tedious.
                  Your website really does make these analysis that much easier.
                </Typography>
              </Box>
            </Paper>
            <Paper elevation={6} sx={{ flex: "1 1 300px" }}>
              <FormatQuoteIcon
                fontSize="large"
                sx={{
                  color: theme.palette.secondary.light,
                  transform: "scaleY(-1) scaleX(-1)",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.mainTextColor,
                }}
              >
                Adam Johnson
              </Typography>
              <Box sx={{ marginTop: (theme) => theme.spacing(2) }}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{
                    fontSize: "18px",
                  }}
                >
                  I stumbled over your tool like some 2 1/2 weeks ago. After
                  finbox stopped the excel add-on I was desperate for a new tool
                  and your financial overview is simply something else!
                </Typography>
              </Box>
            </Paper>
          </Box>
          <link
            rel="stylesheet"
            href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"
          />
        </Box>
      </Box>
    </>
  );
};

export default TestimonialsSection;
