import { ApiUserResponse } from "@/pages/api/types";
import { Breed } from "../dog/types";

export interface UserParam {
  email: string;
  password: string;
}

export type UserResposne = Required<Exclude<ApiUserResponse, 'error'>>;

export interface UserFavBreedParams {
  userUID: string;
  breeds: Breed[];
}