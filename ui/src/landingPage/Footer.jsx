import { Box, Typography, IconButton } from "@material-ui/core";
import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import dayjs from "dayjs";
import TracktakLogoSvg from "../assets/tracktak-purple.svg";

const Footer = () => {
  return (
    <Box>
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
            onClick={() => {
              window.location.href = "https://linkedin.com/company/tracktak";
            }}
          >
            <LinkedInIcon
              color="primary"
              sx={{ width: "45px", height: "45px" }}
            />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          py: 3.8,
        }}
      >
        <Typography align="center">
          © 2020 - {dayjs().format("YYYY")} tracktak ltd. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
