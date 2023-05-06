import { FavoriteBreed } from './FavoriteBreed'
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Breed, BreedImages } from '@/services/dog/types';
import { DogImages } from './Images/DogImages';
import { getBreedLabel } from '@/utils';
import { changeFavoriteBreed, getFavoriteBreed } from '@/services/firebase/firestore';
import { useLayoutContext } from '@/layouts';
import { Card } from '@/components';
import { KeyedMutator } from 'swr';

interface HomepageContextProps {
  breeds: Breed[];
  setBreeds: (breed: Breed[]) => void;
  refetch: () => void;
  setMutate: (breed: Breed, mutate: KeyedMutator<BreedImages>) => void;
}

const HomepageContext = createContext<HomepageContextProps>({} as HomepageContextProps);

export const Homepage = () => {
  const [breeds, setBreedsData] = useState<Breed[]>([]);
  const [mutates, setMutates] = useState<Record<string,KeyedMutator<BreedImages>>>({});
  const { user } = useLayoutContext();

  const setMutate = useCallback((breed: Breed, mutate: KeyedMutator<BreedImages> )=>{
    setMutates(prev => {
      const key = getBreedLabel(breed);
      return {...prev, [key]: mutate};
    });
  },[]);

  const setBreeds = (breeds: Breed[]) => {
    setMutates(prev => {
      const activeMutate: Record<string, KeyedMutator<BreedImages>>= {};
      breeds.forEach(breed => {
        const key = getBreedLabel(breed);
        if(!prev[key]){
          return;
        }

        activeMutate[key] = prev[key];
      });

      return activeMutate;
    });
    setBreedsData(breeds);
  }

  useEffect(()=>{
    if(!user) {
      return;
    }

    getFavoriteBreed().then(breeds => {
      setBreeds(breeds);
    });
  },[user]);

  return (
    <HomepageContext.Provider
      value={{
        breeds,
        setMutate,
        setBreeds(breeds: Breed[]){
          changeFavoriteBreed(breeds);
          setBreeds(breeds);
        },
        refetch(){
          Object.values(mutates).map(mutate => mutate())
        }
      }}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <div className=''>
          <FavoriteBreed/>
        </div>
        <Card className='bg-white lg:col-span-2'>
          {breeds.length === 0 && (
            <h2 className='text-center p-8'>Please Add Favorite Dog Breed</h2>
          )}
          {
            breeds?.map(breed => (
              <DogImages key={`images-${getBreedLabel(breed)}`} breed={breed}/>
            ))
          }
        </Card>
      </div>
    </HomepageContext.Provider>
  )
}

export const useHomepageContext = () => useContext(HomepageContext);