import React from "react";
import { Snackbar, Alert, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import selectSnackbar from "../../../common/selectors/selectSnackbar";
import { clearMessage } from "../../../../tracktak-gatsby/src/redux/actions/snackbarActions";

const StyledSnackbar = ({ sx, ...props }) => {
  return (
    <Box
      component={Snackbar}
      sx={{
        top: (theme) => `${theme.mixins.toolbar.minHeight + 4}px`,
        "& .MuiSnackbarContent-message": {
          margin: "0 auto",
        },
      }}
      {...props}
    />
  );
};

const TTSnackbar = () => {
  const snackbar = useSelector(selectSnackbar);
  const dispatch = useDispatch();

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;

    dispatch(clearMessage());
  };

  return (
    <StyledSnackbar
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={!!snackbar.message}
      onClose={handleClose}
    >
      {snackbar.message && (
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      )}
    </StyledSnackbar>
  );
};

export default TTSnackbar;
