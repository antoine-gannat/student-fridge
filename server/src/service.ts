import * as auth from './controllers/auth/auth';
import * as user from './controllers/user/user';

export default {
  signIn: auth.signIn,
  signUp: auth.signUp,
  signOut: auth.signOut,
  currentSession: user.currentSession
}