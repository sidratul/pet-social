import * as api from '../api';
import { UserFavBreedParams, UserParam, UserResposne } from './types';

export const login = (data: UserParam) => {
  return api.post<UserResposne>('/api/login', data);
}

export const register = (data: UserParam) => {
  return api.post<UserResposne>('/api/register', data);
}

export const getUserFavBreed = (userUID: string) => {
  return api.get<any>(`/api/breeds?userId=${userUID}`);
}

export const setUserFavBreed = (data: UserFavBreedParams) => {
  return api.put<any>('/api/breeds', data);
}