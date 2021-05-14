import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { navigate } from "gatsby";
import { useAuth } from "../hooks/useAuth";
import { setMessage } from "../redux/actions/snackbarActions";
import ForgotPasswordForm from "./ForgotPasswordForm";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { Box, styled } from "@material-ui/core";

export const AUTHENTICATION_FORM_STATE = {
  SIGN_UP: "SIGN_UP",
  SIGN_IN: "SIGN_IN",
  FORGOTTEN_PASSWORD: "FORGOTTEN_PASSWORD",
};

const StyledBox = styled(Box)(() => ({
  width: "500px",
}));

const noop = () => {};

const Authentication = ({
  initialState = AUTHENTICATION_FORM_STATE.SIGN_IN,
  onSuccess = noop,
  onFailure = noop,
  isModal = false,
}) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(initialState);
  const {
    signUp,
    signIn,
  } = useAuth();

  const onError = (error) => {
    dispatch(
      setMessage({
        message: error?.message,
        severity: "error",
      }),
    );

    onFailure();
  };

  const onSignUpSuccess = () => {
    dispatch(
      setMessage({
        message:
          "Please check your email and click on the link provided to verify your account.",
        severity: "success",
      }),
    );
    onSuccess();
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
      onSignUpSuccess,
      onError,
    );
  };

  const handleSignInSubmit = (event, payload) => {
    event.preventDefault();
    signIn(payload.email, payload.password, onSuccess, onError);
  };

  return (
    <StyledBox>
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
        <ForgotPasswordForm />
      )}
    </StyledBox>
  );
};

export default Authentication;
