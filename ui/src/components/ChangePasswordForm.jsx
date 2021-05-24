import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useAuth } from "../hooks/useAuth";
import { Link } from "@material-ui/core";

const ChangePasswordForm = ({ isEmailVerified }) => {
  // const { } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  const handleFieldChange = (e, setter) => {
    const value = e.target.value;
    setter(value);
    setIsDirty(true);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Change Password
      </Typography>
      <form style={{ width: "100%" }} onSubmit={() => {}}>
        <Grid container justifyContent="space-between">
          <Grid item xs={4}>
            <TextField
              onChange={(e) => setOldPassword(e.target.value)}
              variant="outlined"
              required
              fullWidth
              id="oldPassword"
              label="Old Password"
              name="oldPassword"
              autoComplete="password"
              size="small"
            />
          </Grid>
          <Grid item xs={4}>
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
            />
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
              disabled={!isEmailVerified || !isDirty}
            >
              Change
            </Button>
            {!isEmailVerified && (
              <Link
                component="button"
                variant="caption"
                onClick={() => {
                  console.info("I'm a button.");
                }}
                sx={{
                  color: (theme) => theme.palette.warning.main,
                  textAlign: "left",
                }}
              >
                Verify your account before changing password
              </Link>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ChangePasswordForm;
