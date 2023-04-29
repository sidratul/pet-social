import axios from 'axios';
import UseSWR from 'swr';

const fetcher = <T>(url: string): Promise<T> => axios.get<T>(url).then(res => res.data)

export const get = <T,E=unknown>(url: string) => {
  return UseSWR<T, E>(url, fetcher);
}

