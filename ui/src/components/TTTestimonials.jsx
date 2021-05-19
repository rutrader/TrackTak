import { Box, Paper, Typography } from "@material-ui/core";
import React from "react";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

export const TestimonialText = (props) => (
  <Typography
    {...props}
    sx={{
      fontSize: "18px",
    }}
    variant="subtitle1"
    color="textSecondary"
  />
);

export const UserText = (props) => (
  <Typography
    {...props}
    variant="h5"
    sx={{
      fontWeight: "bold",
      color: (theme) => theme.palette.primary.mainTextColor,
    }}
  />
);

export const StyledFormatQuoteIcon = (props) => (
  <FormatQuoteIcon
    {...props}
    fontSize="large"
    sx={{
      color: (theme) => theme.palette.secondary.light,
      transform: "scaleY(-1) scaleX(-1)",
    }}
  />
);

const TTTestimonials = ({ testimonialName, testimonialMessage }) => {
  return (
    <>
      <Paper elevation={6} sx={{ flex: "1 1 300px" }}>
        <StyledFormatQuoteIcon />
        <UserText>{testimonialName}</UserText>
        <Box sx={{ marginTop: (theme) => theme.spacing(2) }}>
          <TestimonialText>{testimonialMessage}</TestimonialText>
        </Box>
      </Paper>
    </>
  );
};

export default TTTestimonials;
