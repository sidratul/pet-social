import * as api from '../api';
import { UserParam, UserResposne } from './types';

export const login = (data: UserParam) => {
  return api.post<UserResposne>('/api/login', data);
}

export const register = (data: UserParam) => {
  return api.post<UserResposne>('/api/register', data);
}