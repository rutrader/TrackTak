import React, { useState } from "react";
import { Box, Link } from "@material-ui/core";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/actions/snackbarActions";
import VerificationCodeDialog from "./VerificationCodeDialog";

const VerifyEmailLink = ({ text, ...props }) => {
  const { getEmailVerificationCode, isEmailVerified } = useAuth();
  const [showVerificationCodeDialog, setShowVerificationCodeDialog] = useState(
    false,
  );
  const dispatch = useDispatch();

  const handleVerificationCodeError = (err) => {
    dispatch(
      setMessage({
        message: "Failed to send verification code",
        severity: "error",
      }),
    );
  };

  const handleCloseVerificationCodeDialog = () =>
    setShowVerificationCodeDialog(false);

  const handleOpenVerificationCodeDialog = () => {
    dispatch(
      setMessage({
        message: "A verification code has been sent to your email.",
      }),
    );
    setShowVerificationCodeDialog(true);
  };

  const handleClickVerifyEmail = () => {
    handleOpenVerificationCodeDialog();
    getEmailVerificationCode(handleVerificationCodeError);
  };

  return isEmailVerified ? null : (
    <>
      <Box
        {...props}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          ...props.sx,
        }}
      >
        <Link
          component="button"
          type="button"
          underline="always"
          variant="caption"
          onClick={handleClickVerifyEmail}
          sx={{
            color: (theme) => theme.palette.warning.main,
            fontSize: (theme) => theme.typography.button.fontSize,
            textAlign: "left",
          }}
        >
          {text}
        </Link>
      </Box>
      <VerificationCodeDialog
        open={showVerificationCodeDialog}
        onClose={handleCloseVerificationCodeDialog}
      />
    </>
  );
};

export default VerifyEmailLink;
