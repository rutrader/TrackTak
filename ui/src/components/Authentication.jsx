import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { navigate } from "gatsby";
import { useAuth } from "../hooks/useAuth";
import { setMessage } from "../redux/actions/snackbarActions";
import ForgotPasswordForm from "./ForgotPasswordForm";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { Box } from "@material-ui/core";
import { noop } from "../shared/utils";

export const AUTHENTICATION_FORM_STATE = {
  SIGN_UP: "SIGN_UP",
  SIGN_IN: "SIGN_IN",
  FORGOTTEN_PASSWORD: "FORGOTTEN_PASSWORD",
};

const Authentication = ({
  initialState = AUTHENTICATION_FORM_STATE.SIGN_IN,
  onSuccess = noop,
  onFailure = noop,
  isModal = false,
  location
}) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(initialState);
  const { signUp, signIn } = useAuth();

  const onError = (error) => {
    dispatch(
      setMessage({
        message: error?.message,
        severity: "error",
      }),
    );

    onFailure();
  };

  const handleSwitchToSignInClick = () => {
    if (isModal) {
      setFormState(AUTHENTICATION_FORM_STATE.SIGN_IN);
      return;
    }

    navigate("/sign-in/");
  };

  const handleSwitchToSignUpClick = () => {
    if (isModal) {
      setFormState(AUTHENTICATION_FORM_STATE.SIGN_UP);
      return;
    }

    navigate("/sign-up/");
  };

  const handleSwitchToForgotPasswordClick = () => {
    if (isModal) {
      setFormState(AUTHENTICATION_FORM_STATE.FORGOTTEN_PASSWORD);
      return;
    }

    navigate("/forgot-password/");
  };

  const handleSignUpSubmit = (event, payload) => {
    event.preventDefault();
    signUp(
      payload.email,
      payload.password,
      [{ Name: "name", Value: payload.name }],
      onSuccess,
      onError,
    );
  };

  const handleSignInSubmit = (event, payload) => {
    event.preventDefault();
    signIn(payload.email, payload.password, onSuccess, onError);
  };

  const handleForgotPasswordSuccess = () => {
    if (isModal) {
      setFormState(AUTHENTICATION_FORM_STATE.SIGN_IN);
      return;
    }

    navigate("/sign-in/");
  };

  const handleForgotPasswordCancelClick = () => {
    if (isModal) {
      setFormState(AUTHENTICATION_FORM_STATE.SIGN_IN);
      return;
    }

    if (location.state?.referrer) {
      navigate(-1);
      return;
    }
    navigate("/");
  };

  return (
    <Box sx={{
      maxWidth: '400px'
    }}>
      {formState === AUTHENTICATION_FORM_STATE.SIGN_UP && (
        <SignUpForm
          onSubmit={handleSignUpSubmit}
          onSwitchToSignInClick={handleSwitchToSignInClick}
        />
      )}
      {formState === AUTHENTICATION_FORM_STATE.SIGN_IN && (
        <SignInForm
          onSubmit={handleSignInSubmit}
          onSwitchToSignUpClick={handleSwitchToSignUpClick}
          onSwitchToForgotPasswordClick={handleSwitchToForgotPasswordClick}
        />
      )}
      {formState === AUTHENTICATION_FORM_STATE.FORGOTTEN_PASSWORD && (
        <ForgotPasswordForm
          onSuccess={handleForgotPasswordSuccess}
          onCancelClick={handleForgotPasswordCancelClick}
        />
      )}
    </Box>
  );
};

export default Authentication;
