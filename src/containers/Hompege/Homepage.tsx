import { RightSide } from './RightSide/RightSide'
import { createContext, useContext, useState } from 'react';
import { Breed } from '@/services/dog/types';
import { DogImages } from '@/components/DogImages/DogImages';
import { getBreedLabel } from '@/utils';

interface HomepageContextProps {
  breeds?: Breed[];
  setBreeds: (breed: Breed[]) => void;
}

const HomepageContext = createContext<HomepageContextProps>({} as HomepageContextProps);

export const Homepage = () => {
  const [breeds, setBreeds] = useState<Breed[]>();
  return (
    <HomepageContext.Provider
      value={{
        breeds,
        setBreeds,
      }}
    >
      <div className="flex flex-row space-x-8">
        <div className='basis-1/3'>
          <RightSide/>
        </div>
        <div className='basis-2/3 bg-white min-h-screen'>
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