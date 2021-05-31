import React, { useState, useContext, createContext, useEffect } from "react";
import {
  signUp as userSignUp,
  signIn as userSignIn,
  signOut as userSignOut,
  getCurrentUser,
  isEmailVerified as isUserEmailVerified,
  forgotPasswordFlow,
} from "../api/auth";
import { noop } from "../shared/utils";

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
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      currentUser.getSession((error, session) => {
        if (!error && session) {
          setSession(session);
          setIsAuthenticated(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    setIsEmailVerified(isUserEmailVerified());
  }, [session]);

  const signUp = (
    email,
    password,
    userAttributes = [],
    onSuccess,
    onFailure,
  ) => {
    userSignUp(email, password, onSuccess, onFailure, userAttributes);
  };

  const signIn = (username, password, onSuccess, onFailure) => {
    const onCognitoSuccess = (session) => {
      setSession(session);
      setIsAuthenticated(true);
      onSuccess(session);
    };

    userSignIn(
      username,
      password,
      onCognitoSuccess,
      onFailure,
      noop,
    );
  };

  const signOut = () => {
    userSignOut();
    setIsAuthenticated(false);
    setSession(null);
  };

  return {
    isAuthenticated,
    session,
    signUp,
    signIn,
    signOut,
    isEmailVerified,
    forgotPasswordFlow: forgotPasswordFlow(),
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
};
