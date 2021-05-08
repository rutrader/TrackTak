import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TracktakLogoSvg from "../assets/tracktak-purple.svg";
import { useFormStyles } from "./Form.styles";
import { useTheme } from "@material-ui/styles";

const ForgotPasswordForm = () => {
  const theme = useTheme()
  const classes = useFormStyles(theme);

  return (
    <div className={classes.paper}>
      <TracktakLogoSvg />
      <Typography component="h1" variant="h5">
        Forgot password
      </Typography>
      <form className={classes.form} noValidate>
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
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Reset my password
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
