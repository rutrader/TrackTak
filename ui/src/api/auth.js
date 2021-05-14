import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

const POOL_CONFIG = {
  UserPoolId: process.env.GATSBY_COGNITO_USER_POOL_ID,
  ClientId: process.env.GATSBY_COGNITO_APP_CLIENT_ID,
};

const userPool = new CognitoUserPool(POOL_CONFIG);

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
    onFailure,
    newPasswordRequired,
  });
};

export const signOut = () => {
  const user = userPool.getCurrentUser();
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
      onFailure(err);
      return;
    }
    onSuccess(result);
  });
};

export const getCurrentUser = () => userPool.getCurrentUser();

export const isEmailVerified = () => getCurrentUser()?.isEmailVerified;

export const forgotPasswordFlow = () => {
  let user = {};
  return {
    sendEmailVerification: (username, onChallenge, onSuccess, onFailure) => {
      user = new CognitoUser({
        Username: username,
        Pool: userPool,
      });
      user.initiateAuth(
        new AuthenticationDetails({
          Username: user.getUsername(),
        }),
        {
          onSuccess: (session) => {
            onSuccess(session);
          },
          onFailure: (err) => {
            onFailure(err);
          },
          customChallenge: (params) => {
            onChallenge(params);
          },
        },
      );
    },
    sendChallengeAnswer: (
      challengeAnswer,
      newPassword,
      onSuccess,
      onFailure,
    ) => {
      if (!user) {
        throw Error("Send verification email to user first!");
      }
      user.sendCustomChallengeAnswer(
        challengeAnswer,
        {
          onSuccess: (session, userConfirmationNecessary) => {
            onSuccess(session, userConfirmationNecessary);
          },
          onFailure: (err) => {
            onFailure(err);
          },
          customChallenge: (params) => {
            console.log(params);
          },
        },
        {
          newPassword: newPassword,
        },
      );
    },
  };
};
