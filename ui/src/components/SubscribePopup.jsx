import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import SubscribeMailingList from "./SubscribeMailingList";

const SubscribePopup = ({ onClose, setOpen, ...props }) => {
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="subscribe-popup-title"
      {...props}
    >
      <DialogTitle id="subscribe-popup-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText color="textPrimary">
          Want new features and <b>free</b> valuations immediately?
        </DialogContentText>
        <SubscribeMailingList
          subscribeText="Sign Up"
          locationSignup="Popup"
          onSubmit={(isSuccess) => {
            if (isSuccess) {
              setOpen(false);
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubscribePopup;
