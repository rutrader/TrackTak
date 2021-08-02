import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import {
  signUp as userSignUp,
  signIn as userSignIn,
  signOut as userSignOut,
  getCurrentUser,
  verificationFlow as userVerificationFlow,
  getUserData,
  changePassword,
  updateContactDetails as userUpdateContactDetails,
  signOut,
} from "../api/auth";
import { noop, removeQueryParams } from "../shared/utils";

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
          signOut();
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

export const getUrlAuthParameters = () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  return {
    code,
  };
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
  const [isExternalIdentityProvider, setIsExternalIdentityProvider] = useState(
    false,
  );

  const signInWithSession = useCallback(() => {
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
      const isVerifyingAuthParameter = !!getUrlAuthParameters().code;
      setHasLoadedAuthDetails(!isVerifyingAuthParameter);
    }
  }, []);

  useEffect(() => {
    signInWithSession();
  }, [isAuthenticated, signInWithSession]);

  const signIn = (username, password, onSuccess, onFailure) => {
    const onCognitoSuccess = (session) => {
      setIsAuthenticated(true);
      onSuccess(session);
    };

    userSignIn(username, password, onCognitoSuccess, onFailure, noop);
  };

  const signUp = (
    email,
    password,
    userAttributes = [],
    onSuccess,
    onFailure,
  ) => {
    userSignUp(email, password, onSuccess, onFailure, userAttributes);
  };

  const signOut = () => {
    userSignOut();
    setIsAuthenticated(false);
    setUserData(null);
    setIsExternalIdentityProvider(false);
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

  const verificationFlow = () => {
    const handleVerificationSuccess = () => {
      signInWithSession();
      removeQueryParams();
    };
    const handleVerificationFailure = () => {
      removeQueryParams();
    };
    return userVerificationFlow(
      handleVerificationSuccess,
      handleVerificationFailure,
    );
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
    verificationFlow: verificationFlow(),
    changePassword,
    updateContactDetails,
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
};
