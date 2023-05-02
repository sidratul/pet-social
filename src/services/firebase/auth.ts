import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  signInWithCustomToken,
  signInWithCredential,
  GoogleAuthProvider
} from 'firebase/auth';
import { app } from './config';
import { UserParam } from '../user/types';

export const firebaseRegister = (props: UserParam) => {
  const auth = getAuth(app);
  const {email, password} = props;
  return createUserWithEmailAndPassword(auth, email, password);
}

export const firebaseLogin = (props: UserParam) => {
  const auth = getAuth(app);
  const {email, password} = props;
  return signInWithEmailAndPassword(auth, email, password);
}

export const getUserSession = (): Promise<User>  => {
  const auth = getAuth(app);
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        return resolve(user);
      }

      reject(new Error('User not found'));
    });
  });
}

export const firebaseLogout = () => {
  const auth = getAuth(app);
  return signOut(auth);
}

export const getCurrentUser = (): User | null => {
  const auth = getAuth(app);
  return auth.currentUser;
}
