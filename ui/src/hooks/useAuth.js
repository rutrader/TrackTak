import React, { useState, useContext, createContext, useEffect } from "react";
import {
  signUp as userSignUp,
  signIn as userSignIn,
  signOut as userSignOut,
  getCurrentUser,
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

    const onNewPasswordRequired = () => {
      console.error("New password required"); // TODO
    };

    userSignIn(
      username,
      password,
      onCognitoSuccess,
      onFailure,
      onNewPasswordRequired,
    );
  };

  const signOut = () => {
    userSignOut();
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
