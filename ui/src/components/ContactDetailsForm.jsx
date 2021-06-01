import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useAuth } from "../hooks/useAuth";
import { Link } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/actions/snackbarActions";

const ContactDetailsForm = ({ currentName, currentEmail, onVerificationCodeDialogOpen }) => {
  const { isEmailVerified, updateContactDetails, getEmailVerificationCode } = useAuth();
  const [name, setName] = useState(currentName || '');
  const [email, setEmail] = useState(currentEmail || '');
  const [isDirty, setIsDirty] = useState(false);
  const dispatch = useDispatch();

  const handleFieldChange = (e, setter) => {
    const value = e.target.value;
    setter(value);
    setIsDirty(true);
  };

  useEffect(() => {
    if (name === currentName && email === currentEmail) {
      setIsDirty(false);
    }
  }, [name, email, currentName, currentEmail]);

  useEffect(() => {
    setName(currentName);
    setEmail(currentEmail);
  }, [currentName, currentEmail]);

  const handleSuccess = () => {
    dispatch(
      setMessage({
        message: "Successfully updated your details",
        severity: "success",
      }),
    );
  };

  const handleError = (err) => {
    dispatch(
      setMessage({
        message: err?.message,
        severity: "error",
      }),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateContactDetails(
      { name: name ?? currentName, email: email ?? currentEmail },
      handleSuccess,
      handleError,
    );
  };

  const handleVerificationCodeError = (err) => {
    dispatch(
      setMessage({
        message: "Failed to send verification code",
        severity: "error",
      }),
    );
  };

  const handleClickVerifyEmail = () => {
    onVerificationCodeDialogOpen();
    getEmailVerificationCode(handleVerificationCodeError);
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Contact Details
      </Typography>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Grid container justifyContent="space-between">
          <Grid item xs={4}>
            <TextField
              value={name || ''}
              onChange={(e) => handleFieldChange(e, setName)}
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              size="small"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={email || ''}
              onChange={(e) => handleFieldChange(e, setEmail)}
              variant="outlined"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              autoComplete="email"
              size="small"
            />
            {!isEmailVerified && (
              <Link
                component="button"
                variant="caption"
                onClick={handleClickVerifyEmail}
                sx={{
                  color: (theme) => theme.palette.warning.main,
                }}
                type="button"
              >
                Click here to verify your email
              </Link>
            )}
          </Grid>
          <Grid item xs={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
              }}
              disabled={!isDirty}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ContactDetailsForm;
