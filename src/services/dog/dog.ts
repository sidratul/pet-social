import * as api from '../api';
import { BreedImages, BreedListResponse, DogApiError, RandomImagesByBreedParams } from './types';

/**TODO create as ENV */
const DOG_API = `https://dog.ceo/api`;

export const getAllBreeds = () => {
  return api.get<BreedListResponse, DogApiError>(`${DOG_API}/breeds/list/all`);
}

export const getRandomDogImages = (params : RandomImagesByBreedParams) => {
  const { count, breed, subBreed } = params;
  let url = `${DOG_API}`;

  url += !breed ? `/breeds` : `/breed/${params.breed}`;
  if(subBreed) {
    url += `/${params.subBreed}`;
  }

  return api.get<BreedImages, DogApiError>(`${url}/images/random/${count || 1}`)
}