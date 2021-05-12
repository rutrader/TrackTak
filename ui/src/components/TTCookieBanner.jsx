import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";
import CookieConsent from "react-cookie-consent";
import RoundButton from "./RoundButton";

function TTCookieBanner() {
  const theme = useTheme();
  return (
    <Box>
      <CookieConsent
        location="bottom"
        cookieName="tracktak"
        style={{
          justifyContent: "center",
          zIndex: theme.zIndex.cookieBanner,
          padding: "5px",
          background: "#ffff",
          color: theme.palette.primary.mainTextColor,
          boxShadow:
            "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
        }}
        contentStyle={{ flex: "initial" }}
        ButtonComponent={({ style, ...props }) => (
          <RoundButton
            variant="contained"
            color="primary"
            {...props}
            sx={{
              padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ textTransform: "none" }}>
              I like cookies!
            </Typography>
          </RoundButton>
        )}
      >
        <Typography
          variant="h6"
          color="inherit"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <span role="img" aria-label="cookie">
            🍪
          </span>
          <Box sx={{ ml: 1 }}>
            By using our site you agree to our use of cookies to deliver a best
            site experience. Om-nom-nom!
          </Box>
        </Typography>
      </CookieConsent>
    </Box>
  );
}

export default TTCookieBanner;
