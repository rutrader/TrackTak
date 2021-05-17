import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/styles";
import { useAuth } from "../hooks/useAuth";
import Alert from "@material-ui/core/Alert";
import { navigate } from "gatsby-link";
import { setMessage } from "../redux/actions/snackbarActions";
import { Box } from "@material-ui/core";
import TracktakLogo from "./TracktakLogo";

const ForgotPasswordForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { forgotPasswordFlow } = useAuth();

  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [challengeCode, setChallengeCode] = useState("");
  const [password, setPassword] = useState("");

  const handleCancelClick = () => {
    navigate(-1);
  };

  const handleSuccess = () => {
    navigate("/sign-in");
  };

  const handlePasswordResetFailure = (err) => {
    dispatch(
      setMessage({
        message: err?.message, // TODO All AWS messages should be mapped
        severity: "error",
      }),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (challengeCode) {
      forgotPasswordFlow.sendChallengeAnswer(
        challengeCode,
        password,
        handleSuccess,
        handlePasswordResetFailure,
      );
    } else {
      forgotPasswordFlow.sendEmailVerification(
        email,
        () => {
          setVerificationEmailSent(true);
        },
        handlePasswordResetFailure,
      );
    }
  };

  return (
    <>
      {verificationEmailSent && (
        <Alert severity="info">
          Please check your email for the verification code
        </Alert>
      )}
      <Box
        sx={{
          marginTop: theme.spacing(5),
          marginBottom: theme.spacing(5),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TracktakLogo />
        <Typography component="h1" variant="h5">
          Forgot password
        </Typography>
        <Box sx={{
          width: "100%",
          marginTop: theme.spacing(3),
        }}>
        <form onSubmit={handleSubmit} validate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                disabled={verificationEmailSent}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            {verificationEmailSent && (
              <>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="challengeCode"
                    label="Code"
                    name="challengeCode"
                    onChange={(e) => setChallengeCode(e.target.value)}
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
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              margin: theme.spacing(3, 0, 2),
            }}
          >
            {verificationEmailSent ? "Submit" : "Send Verification Code"}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleCancelClick}
            type="button"
          >
            Cancel
          </Button>
        </form>
        </Box>
      </Box>
    </>
  );
};

export default ForgotPasswordForm;
