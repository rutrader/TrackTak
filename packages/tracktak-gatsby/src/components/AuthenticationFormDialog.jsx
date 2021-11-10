import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { DialogContent } from "@material-ui/core";
import Authentication, { AUTHENTICATION_FORM_STATE } from "./Authentication";

const AuthenticationFormDialog = ({
  initialState = AUTHENTICATION_FORM_STATE.SIGN_UP,
  onClose,
  location,
  ...props
}) => {
  return (
    <Dialog onClose={onClose} {...props}>
      <DialogContent>
        <Authentication
          isModal
          initialState={initialState}
          onSuccess={onClose}
          location={location}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AuthenticationFormDialog;
