import axios, { AxiosError, AxiosResponse } from 'axios';
import UseSWR from 'swr';

const fetcher = <T>(url: string): Promise<T> => axios.get<T>(url).then(res => res.data)

export type ApiError<T> = AxiosError<T>;

export const get = <T,E=unknown>(url: string) => {
  return UseSWR<T, E>(url, fetcher);
}

export const post = <T, D=unknown>(url: string, data: D) => {
  return axios.post<T, AxiosResponse<T>, D>(url, data)
}

export const put = <T, D=unknown>(url: string, data: D) => {
  return axios.put<T, AxiosResponse<T>, D>(url, data)
}
