import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import GoogleIcon from "@material-ui/icons/Google";
import FacebookIcon from "@material-ui/icons/Facebook";

const SocialLoginButtons = () => {
  const theme = useTheme();

  const handleGoogleLogin = () => {
    window.open(process.env.GATSBY_SOCIAL_LOGIN_GOOGLE, "_self");
  };

  const handleFacebookLogin = () => {
    window.open(process.env.GATSBY_SOCIAL_LOGIN_FACEBOOK, "_self");
  };

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Typography component="div" display="block">
          Or
        </Typography>
      </Grid>
      <Grid
        container
        justifyContent="center"
        sx={{
          gap: theme.spacing(2),
        }}
      >
        <Grid item onClick={handleGoogleLogin}>
          <GoogleIcon
            fontSize="large"
            sx={{
              color: theme.palette.icons.google,
              cursor: "pointer",
            }}
          />
        </Grid>
        <Grid item onClick={handleFacebookLogin}>
          <FacebookIcon
            fontSize="large"
            sx={{
              color: theme.palette.icons.facebook,
              cursor: "pointer",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SocialLoginButtons;
