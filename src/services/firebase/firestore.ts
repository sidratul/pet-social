import { deleteDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { app } from './config';
import { Breed } from '../dog/types';
import { UserFavBreedParams } from '../user/types';
import { getCurrentUser } from './auth';
import { error } from 'console';
import { getKeyFromImageUrl } from '@/utils';

const USER_DB_NAME = 'users';

interface UserData {
  breeds: Breed[];
}

export const getFavoriteBreed = async () => {
  const db = getFirestore(app);
  const user = getCurrentUser();

  if(!user){
    throw new Error('invalid user');
  }

  const docRef = doc(db, USER_DB_NAME, user.uid);
  const res = await getDoc(docRef);
  if(res.exists()){
    const userData = res.data() as UserData;
    return userData.breeds;
  }

  return [];
}

export const likeImage = (imageUrl: string) => {
  const db = getFirestore(app);
  const user = getCurrentUser();

  if(!user){
    throw new Error('invalid user');
  }
  const fileNameAsKey = getKeyFromImageUrl(imageUrl);
  const docRef = doc(db, USER_DB_NAME, user.uid, 'likes', fileNameAsKey);
  return setDoc(docRef, {
    url: imageUrl,
    date: new Date().toISOString(),
  });
}

export const dislikeImage = (imageUrl: string) => {
  const db = getFirestore(app);
  const user = getCurrentUser();

  if(!user){
    throw new Error('invalid user');
  }
  const fileNameAsKey = getKeyFromImageUrl(imageUrl);

  const docRef = doc(db, USER_DB_NAME, user.uid, 'likes', fileNameAsKey);
  return deleteDoc(docRef);
}

export const getLikeByUrls = async (urls?: string[]) => {
  const db = getFirestore(app);
  const user = getCurrentUser();

  if(!user){
    throw new Error('invalid user');
  }

  const docRef = collection(db, USER_DB_NAME, user.uid, 'likes');
  const q = query(docRef, where('url','in', urls));
  const querySnapshot = await getDocs(q)
  const data: Record<string, string> = {};
  querySnapshot.forEach((doc) => {
    const url = doc.data().url as string;
    data[url] = url;
  });
  return data;
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