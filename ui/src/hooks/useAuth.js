import React, { useState, useContext, createContext, useEffect } from "react";
import {
  signUp as userSignUp,
  signIn as userSignIn,
  signOut as userSignOut,
  getCurrentUser,
  forgotPasswordFlow,
  getUserData,
  changePassword,
  updateContactDetails as userUpdateContactDetails,
  getEmailVerificationCode,
  submitEmailVerificationCode as userSubmitEmailVerificationCode,
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

export const getAccessToken = async () => {
  const session = await new Promise((resolve, reject) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      currentUser.getSession((error, session) => {
        if (!error && session) {
          resolve(session);
        } else {
          reject(error);
        }
      });
    }
  });

  return session.accessToken;
};

const getUpdatedUserDetails = (_, updatedUserDataArray) => {
  if (updatedUserDataArray) {
    const updatedUserData = updatedUserDataArray.reduce(
      (attributes, current) => ({
        ...attributes,
        [current.Name]: current.Value,
      }),
      {},
    );
    const isEmailVerified = updatedUserData?.email_verified === "true";

    return [updatedUserData, isEmailVerified];
  }

  return [];
};

/**
 *
 * Hook for managing authentication
 */
const useProvideAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [hasLoadedAuthDetails, setHasLoadedAuthDetails] = useState(false);
  const [userData, setUserData] = useState();
  const [isExternalIdentityProvider, setIsExternalIdentityProvider] = useState(false);

  useEffect(() => {
    const handleGetUserData = (...args) => {
      const [updatedUserData, isEmailVerified] = getUpdatedUserDetails(...args);

      setUserData(updatedUserData);
      setIsEmailVerified(isEmailVerified);

      if (updatedUserData.identities) {
        setIsExternalIdentityProvider(true);
      }
    };

    const currentUser = getCurrentUser();

    if (currentUser) {
      currentUser.getSession((error, session) => {
        setHasLoadedAuthDetails(true);
        if (!error && session) {
          setIsAuthenticated(true);
          getUserData(handleGetUserData);
        }
      });
    } else {
      setHasLoadedAuthDetails(true);
    }
  }, [isAuthenticated]);

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
      setIsAuthenticated(true);
      onSuccess(session);
    };

    userSignIn(username, password, onCognitoSuccess, onFailure, noop);
  };

  const signOut = () => {
    userSignOut();
    setIsAuthenticated(false);
    setUserData(null);
    setIsExternalIdentityProvider(false);
  };

  const submitEmailVerificationCode = (code, onSuccess, onFailure) => {
    const onVerificationSuccess = () => {
      setIsEmailVerified(true);
      onSuccess();
    };
    userSubmitEmailVerificationCode(code, onVerificationSuccess, onFailure);
  };

  const updateContactDetails = (updatedAttributes, onSuccess, onFailure) => {
    const onUpdateSuccess = () => {
      if (
        updatedAttributes.email &&
        updatedAttributes.email !== userData.email
      ) {
        setIsEmailVerified(false);
      }
      onSuccess();
    };
    userUpdateContactDetails(updatedAttributes, onUpdateSuccess, onFailure);
  };

  return {
    isAuthenticated,
    hasLoadedAuthDetails,
    userData,
    isExternalIdentityProvider,
    signUp,
    signIn,
    signOut,
    isEmailVerified,
    forgotPasswordFlow: forgotPasswordFlow(),
    changePassword,
    updateContactDetails,
    getEmailVerificationCode,
    submitEmailVerificationCode,
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
};
