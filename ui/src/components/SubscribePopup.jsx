import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@material-ui/core";
import SubscribeMailingList from "./SubscribeMailingList";
import { useTheme } from "@emotion/react";

const SubscribePopup = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const subscribePopupShown = localStorage.getItem("subscribePopupShown");
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = (_, reason) => {
    if (reason !== "backdropClick") {
      localStorage.setItem("subscribePopupShown", "true");
      setOpen(false);
    }
  };

  return subscribePopupShown === "true" ? null : (
    <Dialog
      open={open}
      fullScreen={isOnMobile}
      onClose={handleClose}
      aria-labelledby="subscribe-popup-title"
    >
      <DialogTitle id="subscribe-popup-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText color="textPrimary">
          Want new features and <b>free</b> valuations immediately?
        </DialogContentText>
        <SubscribeMailingList subscribeText="Sign Up" locationSignup="Popup" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubscribePopup;
