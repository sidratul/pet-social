import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
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