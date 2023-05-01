import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth as adminAuth } from "firebase-admin";
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

export const validateToken = (token: string) => {
  const auth = getAuth(app);
  return adminAuth(app).verifyIdToken(token);
}
