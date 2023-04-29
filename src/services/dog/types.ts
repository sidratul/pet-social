export interface DogBaseResponse<T> {
  status: 'success' | 'error';
  message: T;
  code?: number;
}

export type BreedListResponse = DogBaseResponse<Breeds>;

export type Breeds = {
  [key: string]: string[]
}

export type DogApiError = DogBaseResponse<string>;
export type BreedImages = DogBaseResponse<string[]>;