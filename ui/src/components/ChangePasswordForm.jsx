import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useAuth } from "../hooks/useAuth";
import { setMessage } from "../redux/actions/snackbarActions";
import VerifyEmailLink from "./VerifyEmailLink";

const ChangePasswordForm = () => {
  const { isEmailVerified, changePassword } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();

  const handleFieldChange = (e, setter) => {
    const value = e.target.value;
    setter(value);
  };

  const handleSuccess = () => {
    dispatch(
      setMessage({
        message: "Successfully updated your password",
        severity: "success",
      }),
    );
    setOldPassword("");
    setNewPassword("");
  };

  const handleError = (err) => {
    dispatch(
      setMessage({
        message: "Failed to change password",
        severity: "error",
      }),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword(oldPassword, newPassword, handleSuccess, handleError);
  };

  const isButtonDisabled = !oldPassword || !newPassword || !isEmailVerified;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Change Password
      </Typography>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Grid container justifyContent="space-between" gap={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              onChange={(e) => setOldPassword(e.target.value)}
              variant="outlined"
              required
              fullWidth
              id="oldPassword"
              label="Old Password"
              type="password"
              name="oldPassword"
              autoComplete="password"
              size="small"
              InputProps={{ inputProps: { minLength: 8 } }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              onChange={(e) => handleFieldChange(e, setNewPassword)}
              variant="outlined"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              autoComplete="password"
              size="small"
              InputProps={{ inputProps: { minLength: 8 } }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
              }}
              disabled={isButtonDisabled}
            >
              Change
            </Button>
            <VerifyEmailLink
              sx={{
                mt: 3,
              }}
              text="You must verify your account before changing your password"
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ChangePasswordForm;
