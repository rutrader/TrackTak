import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useAuth } from "../hooks/useAuth";
import { Link } from "@material-ui/core";

const ContactDetailsForm = ({ currentName, currentEmail, isEmailVerified }) => {
  // const { } = useAuth();
  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);
  const [isDirty, setIsDirty] = useState(false);

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

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Contact Details
      </Typography>
      <form style={{ width: "100%" }} onSubmit={() => {}}>
        <Grid container justifyContent="space-between">
          <Grid item xs={4}>
            <TextField
              value={name ?? currentName}
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
              value={email ?? currentEmail}
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
                onClick={() => {
                  console.info("I'm a button.");
                }}
                sx={{
                  color: (theme) => theme.palette.warning.main,
                }}
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
