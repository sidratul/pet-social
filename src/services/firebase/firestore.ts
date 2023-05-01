import { DocumentData, addDoc, collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from './config';
import { Breed } from '../dog/types';
import { UserFavBreedParams } from '../user/types';

const USER_DB_NAME = 'users';

export const getFavoriteBreed = (userId: string) => {
  const db = getFirestore(app);
  const docRef = doc(db, USER_DB_NAME, userId);
  return getDoc<DocumentData>(docRef);
}

export const changeFavoriteBreed = (data: UserFavBreedParams) => {
  const db = getFirestore(app);
  const docRef = doc(db, USER_DB_NAME, data.userUID);
  return setDoc(docRef,data);
}