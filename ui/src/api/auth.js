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
  USERNAME_EXISTS_EXCEPTION: "UsernameExistsException"
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
  const split = hash?.slice(1).split('&');
  if (!split || split.length < 2) {
    return null;
  }
  const values = split.map(val => val.split('=')[1]);

  const token = {
    idToken: values[0],
    accessToken: values[1],
  }

  const IdToken = new CognitoIdToken({
    IdToken: token.idToken,
  });
  const AccessToken = new CognitoAccessToken({
    AccessToken: token.accessToken,
  });
  const RefreshToken = new CognitoRefreshToken({RefreshToken: '' });

  const user = new CognitoUser({
    Username: IdToken.payload['cognito:username'],
    Pool: userPool,
  });

  user.setSignInUserSession(new CognitoUserSession({
    IdToken,
    AccessToken,
    RefreshToken,
  }));

  return user;
}

export const getCurrentUser = () => {
  const user = userPool.getCurrentUser() || getUserFromHash(window.location?.hash);;
  if (user) {
    user.getSession(noop);
  }
  return user;
};

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
            onCognitoFailure(err, onFailure);
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
      onChallengeFailure,
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
            onCognitoFailure(err, onFailure);
          },
          customChallenge: (params) => {
            onChallengeFailure(params);
          },
        },
        {
          newPassword: newPassword,
        },
      );
    },
  };
};

export const getUserData = (handleGetUserData) => {
  const user = getCurrentUser();
  return user.getUserAttributes(handleGetUserData);
}

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

export const getEmailVerificationCode = (onError) => {
  const user = getCurrentUser();
  user.getAttributeVerificationCode("email", {
    onSuccess: noop,
    onFailure: (err) => onCognitoFailure(err, onError),
    inputVerificationCode: noop,
  });
};

export const submitEmailVerificationCode = (code, onSuccess, onError) => {
  const user = getCurrentUser();
  user.verifyAttribute("email", code, {
    onSuccess,
    onFailure: (err) => onCognitoFailure(err, onError),
  })
}
