import { Breed } from "@/services/dog/types";

export const getBreedLabel = (breed: Breed) => `${breed.breed}${breed.subBreed? ' - '+breed.subBreed : ''}`;
export const getKeyFromImageUrl = (url: string) => url.replace(/^.*[\\\/]/, '');

export * from './firebase';
