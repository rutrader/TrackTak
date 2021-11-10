import { Box, Hidden } from "@material-ui/core";
import { Link } from "gatsby";
import React from "react";
import tracktakLogoSvg from "../assets/tracktak-purple.svg";
import tracktakLogoSmallSvg from "../assets/tracktak-logo-small.svg";
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
          <img {...logoProps} alt="tracktak" src={tracktakLogoSvg} />
        </Hidden>
        <Hidden mdUp implementation="css">
          <img {...logoProps} alt="t" src={tracktakLogoSmallSvg} />
        </Hidden>
      </Link>
    </Box>
  );
};
export default TracktakLogo;
