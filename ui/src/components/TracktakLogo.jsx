import { Box, Typography } from "@material-ui/core";
import { Link } from "gatsby";
import React from "react";
import TracktakLogoSvg from "../assets/tracktak-purple.svg";

const TracktakLogo = ({ width, height, logoProps, ...props }) => {
  return (
    <Box {...props} sx={{ ...props.sx, display: "flex", alignItems: "center" }}>
      <Link to="/">
        <TracktakLogoSvg {...logoProps} />
      </Link>
      <Typography color="textSecondary">beta</Typography>
    </Box>
  );
};
export default TracktakLogo;
