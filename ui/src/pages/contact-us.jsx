import { Box, Link, Typography } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";

const ContactUs = () => {
  return (
    <>
      <Helmet>
        <title>{getTitle("Contact Us")}</title>
        <link rel="canonical" href={`${resourceName}/contact-us`} />
        <meta
          name="description"
          content="Need help with your DCF? Send us an email at support@tracktak.com."
        />
      </Helmet>
      <Typography variant="h5" gutterBottom>
        Contact Us
      </Typography>
      <Typography paragraph gutterBottom>
        We would love to help you with any support you may need, any feedback,
        criticisms or feature requests.
      </Typography>
      <Typography gutterBottom>
        Email:
        <Link href="mailto:support@tracktak.com">
          &nbsp;support@tracktak.com
        </Link>
      </Typography>
      <Typography component="div">
        <Box>Address:</Box>
        <address>
          <Box>
            <b>Tracktak Ltd</b>
          </Box>
          <Box>26 Calder View</Box>
          <Box>Brighouse, Rastrick</Box>
          <Box>United Kingdom</Box>
        </address>
      </Typography>
    </>
  );
};

export default ContactUs;
