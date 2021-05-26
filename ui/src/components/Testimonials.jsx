import { Box, Paper, Typography } from "@material-ui/core";
import React from "react";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

export const TestimonialText = (props) => (
  <Typography
    sx={{
      fontSize: (theme) => theme.typography.fontSize2,
    }}
    variant="subtitle1"
    color="textSecondary"
    {...props}
  />
);

export const UserText = (props) => (
  <Typography
    variant="h5"
    sx={{
      fontWeight: "bold",
      color: (theme) => theme.palette.primary.mainTextColor,
    }}
    {...props}
  />
);

export const StyledFormatQuoteIcon = (props) => (
  <FormatQuoteIcon
    fontSize="large"
    sx={{
      color: (theme) => theme.palette.secondary.light,
      transform: "scaleY(-1) scaleX(-1)",
    }}
    {...props}
  />
);

const Testimonials = ({ testimonialName, testimonialMessage }) => {
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

export default Testimonials;
