import React from "react";
import { Box, Link } from "@material-ui/core";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/actions/snackbarActions";
import { noop } from "../shared/utils";

const VerifyEmailLink = ({ text, ...props }) => {
  const { sendEmailVerification, isEmailVerified, userData } = useAuth();
  const dispatch = useDispatch();

  const handleVerificationCodeError = (err) => {
    dispatch(
      setMessage({
        message: "Failed to send verification link",
        severity: "error",
      }),
    );
  };

  const handleVerificationEmailSent = () => {
    dispatch(
      setMessage({
        message: "A verification link has been sent to your email.",
      }),
    );
  };

  const handleClickVerifyEmail = () => {
    sendEmailVerification(
      userData.email,
      handleVerificationEmailSent,
      noop,
      handleVerificationCodeError,
    );
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
    </>
  );
};

export default VerifyEmailLink;
