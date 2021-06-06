import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/styles";
import { useAuth } from "../hooks/useAuth";
import Alert from "@material-ui/core/Alert";
import { setMessage } from "../redux/actions/snackbarActions";
import { Box } from "@material-ui/core";
import TracktakLogoSvg from "../icons/tracktak-purple.svg";
import { noop } from "../shared/utils";
import RoundButton from "./RoundButton";

const ForgotPasswordForm = ({ onSuccess, onCancelClick }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { forgotPasswordFlow } = useAuth();

  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [challengeCode, setChallengeCode] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordResetFailure = (err) => {
    dispatch(
      setMessage({
        message: err?.message,
        severity: "error",
      }),
    );
  };

  const handleChallengeFailure = () => {
    dispatch(
      setMessage({
        message: "Incorrect code entered",
        severity: "error",
      }),
    );
  };

  const handleVerificationEmailSent = () => {
    setVerificationEmailSent(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (challengeCode) {
      forgotPasswordFlow.sendChallengeAnswer(
        challengeCode,
        password,
        onSuccess,
        handlePasswordResetFailure,
        handleChallengeFailure,
      );
    } else {
      forgotPasswordFlow.sendEmailVerification(
        email,
        handleVerificationEmailSent,
        noop,
        handleVerificationEmailSent,
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
        <TracktakLogoSvg />
        <Typography
          variant="h5"
          sx={{
            mt: (theme) => theme.spacing(1),
            color: (theme) => theme.palette.primary.mainTextColor,
          }}
        >
          Forgot password
        </Typography>
        <Box
          sx={{
            marginTop: theme.spacing(3),
          }}
        >
          <form onSubmit={handleSubmit} validate="true">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  disabled={verificationEmailSent}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    display: 'flex',
                  }}
                />
              </Grid>
              {verificationEmailSent && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      id="challengeCode"
                      label="Code"
                      name="challengeCode"
                      onChange={(e) => setChallengeCode(e.target.value)}
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
                      InputProps={{ inputProps: { minLength: 8 } }}
                      sx={{
                        display: 'flex',
                      }}
                    />
                  </Grid>
                </>
              )}
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
              {verificationEmailSent ? "Submit" : "Send Verification Code"}
            </RoundButton>
            <RoundButton
              fullWidth
              variant="outlined"
              color="primary"
              onClick={onCancelClick}
              type="button"
              sx={{
                textTransform: "none",
              }}
            >
              Cancel
            </RoundButton>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ForgotPasswordForm;
