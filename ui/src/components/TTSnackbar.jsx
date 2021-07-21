import React from "react";
import { Snackbar, Alert, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import selectSnackbar from "../selectors/selectSnackbar";
import { clearMessage } from "../redux/actions/snackbarActions";

const useStyles = makeStyles((theme) => ({
  root: {
    top: `${theme.mixins.toolbar.minHeight + 4}px`,
    "& .MuiSnackbarContent-message": {
      margin: "0 auto",
    },
  },
}));

const TTSnackbar = () => {
  const classes = useStyles();
  const snackbar = useSelector(selectSnackbar);
  const dispatch = useDispatch();

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;

    dispatch(clearMessage());
  };

  return (
    <Snackbar
      classes={{ root: classes.root }}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={!!snackbar.message}
      onClose={handleClose}
    >
      {snackbar.message && (
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      )}
    </Snackbar>
  );
};

export default TTSnackbar;
