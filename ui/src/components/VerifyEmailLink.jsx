import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/actions/snackbarActions";

const VerifyEmailLink = ({ onVerificationCodeDialogOpen, text, ...props }) => {
  const { getEmailVerificationCode, isEmailVerified } = useAuth();
  const dispatch = useDispatch();

  const handleVerificationCodeError = (err) => {
    dispatch(
      setMessage({
        message: "Failed to send verification code",
        severity: "error",
      }),
    );
  };

  const handleClickVerifyEmail = () => {
    onVerificationCodeDialogOpen();
    getEmailVerificationCode(handleVerificationCodeError);
  };

  return isEmailVerified ? null : (
    <Box
      {...props}
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        ...props.sx,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: (theme) => theme.palette.warning.main,
        }}
      >
        {text}
      </Typography>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={handleClickVerifyEmail}
      >
        Verify My Email
      </Button>
    </Box>
  );
};

export default VerifyEmailLink;
