import { Box, Typography, IconButton, Link } from "@material-ui/core";
import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import RedditIcon from "@material-ui/icons/Reddit";
import dayjs from "dayjs";
import TracktakLogoSvg from "../icons/tracktak-purple.svg";

const iconStyles = { width: "45px", height: "45px" };

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <TracktakLogoSvg src="icons/tracktak-black.svg" alt="Tracktak" />
        </Box>
        <Box>
          <IconButton
            name="LinkedIn"
            component={Link}
            target="_blank"
            href="https://linkedin.com/company/tracktak"
          >
            <LinkedInIcon color="primary" sx={iconStyles} />
          </IconButton>
          <IconButton
            name="RedditIcon"
            component={Link}
            target="_blank"
            href="https://www.reddit.com/r/tracktak/"
          >
            <RedditIcon color="primary" sx={iconStyles} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          py: 3.8,
        }}
      >
        <Typography align="center" paragraph gutterBottom>
          Data is provided by{" "}
          <Link
            rel="noreferrer"
            target="_blank"
            href="https://eodhistoricaldata.com/"
          >
            EODHistoricalData.com
          </Link>{" "}
          and may not be correct in all cases. We do not take any responsibility
          for incorrect data.
        </Typography>
        <Typography align="center">
          © 2020 - {dayjs().format("YYYY")} tracktak ltd. All rights reserved.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Typography>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
