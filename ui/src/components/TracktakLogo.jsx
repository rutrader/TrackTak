import { Box, Hidden, Typography } from "@material-ui/core";
import { Link } from "gatsby";
import React from "react";
import TracktakLogoSvg from "../assets/tracktak-purple.svg";
import TracktakLogoSmallSvg from "../assets/tracktak-logo-small.svg";

const TracktakLogo = ({ width, height, logoProps, ...props }) => {
  return (
    <Box {...props}>
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          height: 40,
        }}
      >
        <Hidden mdDown>
          <TracktakLogoSvg {...logoProps} />
        </Hidden>
        <Hidden mdUp>
          <TracktakLogoSmallSvg />
        </Hidden>
        <Box sx={{ ml: 0.35 }}>
          <Typography color="textSecondary">beta</Typography>
        </Box>
      </Link>
    </Box>
  );
};
export default TracktakLogo;
