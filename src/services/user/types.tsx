import { ApiUserResponse } from "@/pages/api/types";

export interface UserParam {
  email: string;
  password: string;
}

export type UserResposne = Required<Exclude<ApiUserResponse, 'error'>>;