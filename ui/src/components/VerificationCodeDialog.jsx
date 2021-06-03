import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/actions/snackbarActions";

const VerificationCodeDialog = ({ open, onClose }) => {
  const { submitEmailVerificationCode } = useAuth();
  const [challengeCode, setChallengeCode] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    submitEmailVerificationCode(challengeCode, onClose, handlVerificationFailure); 
  };

  const handlVerificationFailure = (err) => {
    dispatch(
      setMessage({
        message: 'Incorrect code entered',
        severity: "error",
      }),
    );
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Verification</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please check your email and enter the verification code below
        </DialogContentText>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="challengeCode"
          label="Code"
          name="challengeCode"
          onChange={(e) => setChallengeCode(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit} disabled={!challengeCode}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerificationCodeDialog;
