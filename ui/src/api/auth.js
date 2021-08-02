import {
  AuthenticationDetails,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { noop } from "../shared/utils";

const POOL_CONFIG = {
  UserPoolId: process.env.GATSBY_COGNITO_USER_POOL_ID,
  ClientId: process.env.GATSBY_COGNITO_APP_CLIENT_ID,
};

const userPool = new CognitoUserPool(POOL_CONFIG);

const AwsException = {
  NOT_AUTHORIZED_EXCEPTION: "NotAuthorizedException",
  USERNAME_EXISTS_EXCEPTION: "UsernameExistsException",
};

const onCognitoFailure = (err, onError) => {
  if (err.code === AwsException.NOT_AUTHORIZED_EXCEPTION) {
    onError(Error("Incorrect username or password"));
    return;
  }

  if (err.code === AwsException.USERNAME_EXISTS_EXCEPTION) {
    onError(Error("This email address has already been registered"));
    return;
  }

  onError(Error("An error occured"));
};

export const signIn = (
  username,
  password,
  onSuccess,
  onFailure,
  newPasswordRequired = () => {},
) => {
  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  const authDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  user.authenticateUser(authDetails, {
    onSuccess,
    onFailure: (err) => onCognitoFailure(err, onFailure),
    newPasswordRequired,
  });
};

export const signOut = () => {
  const user = getCurrentUser();
  if (user) {
    user.signOut();
  }
};

export const signUp = (
  email,
  password,
  onSuccess,
  onFailure,
  userAttributes = [],
) => {
  userPool.signUp(email, password, userAttributes, null, (err, result) => {
    if (err) {
      onCognitoFailure(err, onFailure);
      return;
    }
    onSuccess(result, email, password);
  });
};

const getUserFromHash = (hash) => {
  const split = hash?.slice(1).split("&");
  if (!split || split.length < 2) {
    return null;
  }

  const values = split.map((val) => val.split("=")[1]);

  const token = {
    accessToken: values[0],
    idToken: values[1],
  };

  const IdToken = new CognitoIdToken({
    IdToken: token.idToken,
  });
  const AccessToken = new CognitoAccessToken({
    AccessToken: token.accessToken,
  });
  const RefreshToken = new CognitoRefreshToken({ RefreshToken: "" });

  const user = new CognitoUser({
    Username: IdToken.payload.username || IdToken.payload["cognito:username"],
    Pool: userPool,
  });

  user.setSignInUserSession(
    new CognitoUserSession({
      IdToken,
      AccessToken,
      RefreshToken,
    }),
  );

  return user;
};

export const getCurrentUser = () => {
  const user = window.location.hash
    ? getUserFromHash(window.location?.hash)
    : userPool.getCurrentUser();
  if (user) {
    user.getSession(noop);
  }
  return user;
};

export const verificationFlow = (onVerificationSuccess, onVerificationFailure) => {
  const customChallengeSessionKey = "customChallengeSession";
  const customChallengeUsernameKey = "customChallengeUsername";
  const customChallengeNewPasswordKey = "customChallengeNewPassword";

  const clearCustomChallengeStorage = () => {
    localStorage.removeItem(customChallengeSessionKey);
    localStorage.removeItem(customChallengeUsernameKey);
    localStorage.removeItem(customChallengeNewPasswordKey);
  };

  return {
    sendEmailVerification: (
      username,
      onChallenge,
      onSuccess,
      onFailure,
      newPassword,
    ) => {
      const user = new CognitoUser({
        Username: username,
        Pool: userPool,
      });
      user.initiateAuth(
        new AuthenticationDetails({
          Username: user.getUsername(),
        }),
        {
          onSuccess: (session) => {
            onVerificationSuccess();
            onSuccess(session);
          },
          onFailure: (err) => {
            onVerificationFailure();
            onCognitoFailure(err, onFailure);
          },
          customChallenge: (params) => {
            localStorage.setItem(customChallengeSessionKey, user.Session);
            localStorage.setItem(customChallengeUsernameKey, username);
            localStorage.setItem(customChallengeNewPasswordKey, newPassword);
            onChallenge(params);
          },
        },
      );
    },
    sendChallengeAnswer: (
      challengeAnswer,
      onSuccess,
      onFailure,
      onChallengeFailure,
    ) => {
      try {
        const user = new CognitoUser({
          Username: localStorage.getItem(customChallengeUsernameKey),
          Pool: userPool,
        });
        user.Session = localStorage.getItem(customChallengeSessionKey);
        const newPassword = localStorage.getItem(customChallengeNewPasswordKey);
        user.sendCustomChallengeAnswer(
          challengeAnswer,
          {
            onSuccess: (session, userConfirmationNecessary) => {
              clearCustomChallengeStorage();
              onVerificationSuccess();
              onSuccess(session, userConfirmationNecessary);
            },
            onFailure: (err) => {
              clearCustomChallengeStorage();
              onVerificationFailure();
              onCognitoFailure(err, onFailure);
            },
            customChallenge: (params) => {
              onVerificationFailure();
              onChallengeFailure(params);
            },
          },
          {
            ...(newPassword && {
              newPassword,
            }),
          },
        );
      } catch (e) {
        clearCustomChallengeStorage();
        onVerificationFailure();
        onFailure(e);
      }
    },
  };
};

export const getUserData = (handleGetUserData) => {
  const user = getCurrentUser();
  return user.getUserAttributes(handleGetUserData);
};

export const changePassword = (
  oldPassword,
  newPassword,
  onSuccess,
  onError,
) => {
  const user = getCurrentUser();
  user.changePassword(oldPassword, newPassword, (err, result) => {
    if (err) {
      onCognitoFailure(err, onError);
      return;
    }

    onSuccess(result);
  });
};

export const updateContactDetails = (contactDetails, onSuccess, onError) => {
  const user = getCurrentUser();
  const updatedAttributes = Object.keys(contactDetails).map((key) => ({
    Name: key,
    Value: contactDetails[key],
  }));

  user.updateAttributes(updatedAttributes, (err, result) => {
    if (err) {
      onCognitoFailure(err, onError);
      return;
    }

    onSuccess(result);
  });
};
