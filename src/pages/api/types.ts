import { FirebaseError } from 'firebase/app';
import { UserCredential } from 'firebase/auth';

export interface ApiResponse<T, E> {
  message: string;
  data?: T,
  error?: E,
}

export type ApiUserResponse = ApiResponse<UserCredential,FirebaseError>;