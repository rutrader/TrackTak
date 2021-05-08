import React, { useState, useContext, createContext } from "react";
import {
  signUp as cognitoSignUp,
  signIn as cognitoSignIn,
  signOut as cognitoSignOut,
} from "../api/auth";

const AuthContext = createContext();

/**
 *
 * @param children child components
 * @returns wrapped components provided with access to auth object
 */
export const ProvideAuth = (props) => {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

/**
 *
 * Hook for managing authentication
 */
const useProvideAuth = () => {
  const [session, setSession] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signUp = (
    email,
    password,
    userAttributes = [],
    onSuccess,
    onFailure,
  ) => {
    cognitoSignUp(email, password, onSuccess, onFailure, userAttributes);
  };

  const signIn = (username, password, onSuccess, onFailure) => {
    const onCognitoSuccess = (session) => {
      setSession(session);
      setIsAuthenticated(true);
      onSuccess();
    };

    const onNewPasswordRequired = () => {
      console.error("New password required"); // TODO
    };

    cognitoSignIn(
      username,
      password,
      onCognitoSuccess,
      onFailure,
      onNewPasswordRequired,
    );
  };

  const signOut = () => {
    cognitoSignOut();
    setIsAuthenticated(false);
    setSession(null);
  };

  const sendPasswordResetEmail = (email) => {};

  return {
    isAuthenticated,
    session,
    signUp,
    signIn,
    signOut,
    sendPasswordResetEmail,
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
};
