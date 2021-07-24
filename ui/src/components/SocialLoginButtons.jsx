import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import GoogleIcon from "@material-ui/icons/Google";
import FacebookIcon from "@material-ui/icons/Facebook";
import SocialMediaButton from "./SocialMediaButton";

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
      <Grid
        container
        justifyContent="center"
        sx={{
          gap: theme.spacing(2),
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2),
        }}
      >
        <Grid item onClick={handleGoogleLogin}>
          <SocialMediaButton
            sx={{
              backgroundColor: theme.palette.icons.google,
              "&:hover": {
                backgroundColor: "#dd2c00",
              },
            }}
            startIcon={<GoogleIcon sx={{ width: 25, height: 25 }} />}
            text="Google"
          />
        </Grid>
        <Grid item onClick={handleFacebookLogin}>
          <SocialMediaButton
            sx={{
              backgroundColor: theme.palette.icons.facebook,
              "&:hover": {
                backgroundColor: "#2f60b2",
              },
            }}
            startIcon={<FacebookIcon sx={{ width: 25, height: 25 }} />}
            text="Facebook"
          />
        </Grid>
      </Grid>
      <Grid item>
        <Typography component="div" display="block">
          OR
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SocialLoginButtons;
