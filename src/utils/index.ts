import { Breed } from "@/services/dog/types";

export const getBreedLabel = (breed: Breed) => `${breed.breed}${breed.subBreed? ' - '+breed.subBreed : ''}`;


export * from './firebase';
