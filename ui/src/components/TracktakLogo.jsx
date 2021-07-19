import { Box, Hidden, Typography } from "@material-ui/core";
import { Link } from "gatsby";
import React from "react";
import TracktakLogoSvg from "../icons/tracktak-purple.svg";
import TracktakLogoSmallSvg from "../icons/tracktak-logo-small.svg";
import { useAuth } from "../hooks/useAuth";

const TracktakLogo = ({ width, height, logoProps, ...props }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Box {...props}>
      <Link
        to={isAuthenticated ? "/dashboard" : "/"}
        style={{
          display: "flex",
          alignItems: "center",
          height: 40,
        }}
        title={`Back to the ${isAuthenticated ? "dashboard" : "home page"}`}
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
