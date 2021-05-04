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
export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

/**
 *
 * Hook for managing authentication
 */
const useProvideAuth = () => {
  const [session, setSession] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const signUp = (
    email,
    password,
    onSuccess,
    onFailure,
    userAttributes = [],
  ) => {
    cognitoSignUp(email, password, onSuccess, onFailure, userAttributes);
  };

  const signIn = (username, password) => {
    const onSuccess = (session) => {
      setSession(session);
      setIsAuthenticated(true);
      setError(null);
    };
    const onFailure = (err) => {
      console.error(err);
      setError(err);
      setIsAuthenticated(false);
    };
    const onNewPasswordRequired = () => {
      console.error("New password required"); // TODO
    };
    cognitoSignIn(username, password, onSuccess, onFailure, onNewPasswordRequired);
  };

  const signOut = () => {
    cognitoSignOut();
    setIsAuthenticated(false);
    setSession(null);
  };

  const sendPasswordResetEmail = (email) => {};

  return [
    isAuthenticated,
    session,
    signUp,
    signIn,
    signOut,
    sendPasswordResetEmail,
    error,
  ];
};

export const useAuth = () => {
  return useContext(AuthContext);
};
