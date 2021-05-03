import UserPool from './UserPool';

const signOut = () => {
  UserPool.getCurrentUser().signOut();
}

export default signOut;