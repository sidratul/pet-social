import { DocumentData, addDoc, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { app } from './config';
import { Breed } from '../dog/types';
import { UserFavBreedParams } from '../user/types';
import { getCurrentUser } from './auth';
import { error } from 'console';

const USER_DB_NAME = 'users';

export const getFavoriteBreed = () => {
  const db = getFirestore(app);
  const user = getCurrentUser();

  if(!user){
    throw new Error('invalid user');
  }

  const docRef = doc(db, USER_DB_NAME, user.uid);
  return getDoc<DocumentData>(docRef);
}

export const like = (breeds: Breed[]) => {
  const db = getFirestore(app);
  const user = getCurrentUser();

  if(!user){
    throw new Error('invalid user');
  }

  // const docRef = collection(db, USER_DB_NAME, user.uid);
  // return setDoc(docRef, {
  //   breeds,
  // });
}

export const changeFavoriteBreed = (breeds: Breed[]) => {
  const db = getFirestore(app);
  const user = getCurrentUser();

  if(!user){
    throw new Error('invalid user');
  }

  const docRef = doc(db, USER_DB_NAME, user.uid);
  return setDoc(docRef, {
    breeds,
  }, { merge: true });
}