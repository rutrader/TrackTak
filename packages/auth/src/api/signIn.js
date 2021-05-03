import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";

const login = (username, password, onSuccess, onFailure, newPasswordRequired = () => {}) => {
  const user = new CognitoUser({
    Username: username,
    Pool: UserPool,
  });

  const authDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  user.authenticateUser(authDetails, {
    onSuccess,
    onFailure,
    newPasswordRequired
  });
};

export default login;
