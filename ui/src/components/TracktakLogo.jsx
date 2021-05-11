import { Box, Hidden, Typography } from "@material-ui/core";
import { Link } from "gatsby";
import React from "react";
import TracktakLogoSvg from "../icons/tracktak-purple.svg";
import TracktakLogoSmallSvg from "../icons/tracktak-logo-small.svg";

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
        <Hidden mdDown implementation="css">
          <TracktakLogoSvg {...logoProps} />
        </Hidden>
        <Hidden mdUp implementation="css">
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
