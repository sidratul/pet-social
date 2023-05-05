import { FavoriteBreed } from './FavoriteBreed'
import { createContext, useContext, useEffect, useState } from 'react';
import { Breed } from '@/services/dog/types';
import { DogImages } from './Images/DogImages';
import { getBreedLabel } from '@/utils';
import { changeFavoriteBreed, getFavoriteBreed } from '@/services/firebase/firestore';
import { useLayoutContext } from '@/layouts';

interface HomepageContextProps {
  breeds: Breed[];
  setBreeds: (breed: Breed[]) => void;
}

const HomepageContext = createContext<HomepageContextProps>({} as HomepageContextProps);

export const Homepage = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const { user } = useLayoutContext();

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
        setBreeds(breeds: Breed[]){
          changeFavoriteBreed(breeds);
          setBreeds(breeds);
        },
      }}
    >
      <div className="flex flex-row space-x-8">
        <div className='basis-1 md:basis-1/3'>
          <FavoriteBreed/>
        </div>
        <div className='md:basis-2/3 bg-white min-h-screen'>
          {
            breeds?.map(breed => (
              <DogImages key={`images-${getBreedLabel(breed)}`} breed={breed}/>
            ))
          }
        </div>
      </div>
    </HomepageContext.Provider>
  )
}

export const useHomepageContext = () => useContext(HomepageContext);