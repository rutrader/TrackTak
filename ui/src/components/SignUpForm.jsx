import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import RoundButton from "./RoundButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import { useTheme } from "@material-ui/styles";
import { Box } from "@material-ui/core";
import TracktakLogoSvg from "../icons/tracktak-purple.svg";

const SignUpForm = ({ onSubmit, onSwitchToSignInClick }) => {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    onSubmit(e, {
      name,
      email,
      password,
    });
  };

  return (
    <Box
      sx={{
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TracktakLogoSvg />
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box sx={{
          width: "100%",
          marginTop: theme.spacing(3),
        }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                name="name"
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <RoundButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              margin: theme.spacing(3, 0, 2),
            }}
          >
            Sign Up
          </RoundButton>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography component="div" display="block">
                Or sign up with
              </Typography>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                <FacebookIcon
                  sx={{ color: theme.palette.icons.facebook }}
                  fontSize="large"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Button
                color="primary"
                disableRipple
                sx={{
                  textTransform: "none",
                }}
                onClick={onSwitchToSignInClick}
                type="button"
              >
                Already have an account? Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default SignUpForm;
