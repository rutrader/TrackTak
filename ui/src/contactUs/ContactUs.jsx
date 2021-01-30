import { Box, Link, Typography } from "@material-ui/core";
import React from "react";

const AddressBox = (props) => <Box sx={{ ml: 1 }} {...props} />;

const ContactUs = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Contact Us
      </Typography>
      <Typography paragraph gutterBottom>
        We would love to help you with any support you may need, or any
        feedback, criticisms or feature requests. For the trouble we would be
        happy to give discounts on our future premium version for quality
        feedback.
      </Typography>
      <Typography gutterBottom>
        Email:
        <Link href="mailto:support@tracktak.com">
          &nbsp;support@tracktak.com
        </Link>
      </Typography>
      <Typography>
        <Box>Address:</Box>
        <address>
          <AddressBox>
            <b>Tracktak Ltd</b>
          </AddressBox>
          <AddressBox>26 Calder View</AddressBox>
          <AddressBox>Brighouse, Rastrick</AddressBox>
          <AddressBox>United Kingdom</AddressBox>
        </address>
      </Typography>
    </>
  );
};

export default ContactUs;
