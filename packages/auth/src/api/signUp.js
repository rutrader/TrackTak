import UserPool from './UserPool';

const signUp = (email, password, onSuccess, onFailure, userAttributes = []) => {
  UserPool.signUp(email, password, userAttributes, null, (err, result) => {
    if (err) {
      onFailure(err);
    }
    onSuccess(result);
  })
}

export default signUp;