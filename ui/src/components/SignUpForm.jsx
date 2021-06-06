import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import RoundButton from "./RoundButton";
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
      <Typography
        variant="h5"
        sx={{
          mt: (theme) => theme.spacing(1),
          color: (theme) => theme.palette.primary.mainTextColor,
        }}
      >
        Sign up
      </Typography>
      <Box
        sx={{
          marginTop: theme.spacing(3),
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                name="name"
                variant="outlined"
                id="name"
                label="Name"
                autoFocus
                sx={{
                  display: 'flex',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                sx={{
                  display: 'flex',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputProps={{ inputProps: { minLength: 8 } }}
                sx={{
                  display: 'flex',
                }}
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
              textTransform: "none",
            }}
          >
            Sign Up
          </RoundButton>
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
