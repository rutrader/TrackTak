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
import { useSelector } from "react-redux";
import selectHasAllRequiredInputsFilledIn from "../selectors/routerSelectors/selectHasAllRequiredInputsFilledIn";

const SubscribePopup = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const subscribePopupShown = localStorage.getItem("subscribePopupShown");
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const hasAllRequiredInputsFilledIn = useSelector(
    selectHasAllRequiredInputsFilledIn,
  );

  const handleClose = (_, reason) => {
    if (reason !== "backdropClick") {
      localStorage.setItem("subscribePopupShown", "true");
      setOpen(false);
    }
  };

  return subscribePopupShown !== "true" && hasAllRequiredInputsFilledIn ? (
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
  ) : null;
};

export default SubscribePopup;
