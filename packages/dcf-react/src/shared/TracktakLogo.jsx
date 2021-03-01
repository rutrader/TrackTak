import { Box, Typography } from "@material-ui/core";
import React from "react";
import Tracktak from "../assets/tracktak.svg";
import { Link } from "gatsby";

const TracktakLogo = ({ width, height, logoProps, ...props }) => {
  return (
    <Box {...props} sx={{ ...props.sx, display: "flex", alignItems: "center" }}>
      <Link to="/">
        <Tracktak {...logoProps} />
      </Link>
      <Typography color="textSecondary">beta</Typography>
    </Box>
  );
};
export default TracktakLogo;
