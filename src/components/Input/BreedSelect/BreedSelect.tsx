import { getAllBreeds } from '@/services/dog/dog';
import { Breed } from '@/services/dog/types';
import { error } from 'console';
import React, { useEffect, useState } from 'react';
import Select from 'react-select'

interface BreedSelect {
  onChange: (breed: Breed[]) => void;
  maxCount?: number;
  defaultValue?: Breed[];
}

export const BreedSelect = (props: BreedSelect) => {
  const { onChange, defaultValue, maxCount } = props;
  const { data, error, isLoading } = getAllBreeds();
  const [ currentBreeds, setBreed ] = useState<Breed[]>(defaultValue || []);

  useEffect(()=>{
    if(!defaultValue){
      return;
    }

    setBreed(defaultValue);
  }, [defaultValue])

  const handleChange = (breeds: Breed[]) => {
    if( maxCount && breeds.length > maxCount ) {
      breeds.splice(0, breeds.length - maxCount);
    }

    setBreed(breeds);
    onChange(breeds);
  }

  if (isLoading || !data || error) {
    return <></>;
  }

  const options = Object.keys(data.message).reduce((breeds: Array<Breed>, breed) => {
    const subBreed = data.message[breed];
    if( !subBreed || subBreed.length === 0 ) {
      breeds.push({breed});
    }

    subBreed.forEach(subBreed => {
      breeds.push({subBreed, breed});
    })

    return breeds;
  }, [] );

  return (
    <div>
      <Select
        isMulti
        options={options}
        onChange={(breeeds)=>handleChange(breeeds as Breed[])}
        value={currentBreeds}
        defaultValue={defaultValue}
        getOptionValue={(breed)=> breed.breed}
        getOptionLabel={(breed)=> `${breed.breed} ${breed.subBreed ? '- '+breed.subBreed : ''}`}
      />
    </div>
  )
}
