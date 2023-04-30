import { BreedSelect } from '@/components/Input/BreedSelect/BreedSelect'
import React, { useState } from 'react'
import { useHomepageContext } from '../Homepage';
import { Breed } from '@/services/dog/types';
import { getBreedLabel } from '@/utils';

export const RightSide = () => {
  const { setBreeds, breeds } = useHomepageContext();
  return (
    <div>
      <div>
        { breeds && breeds.map(breed => (
          <div key={`label-${getBreedLabel(breed)}`}>{getBreedLabel(breed)}</div>
        ))}
      </div>
      <BreedSelect
        maxCount={3}
        defaultValue={breeds}
        onChange={(breeds)=> setBreeds(breeds)}
      />
    </div>

  )
}
