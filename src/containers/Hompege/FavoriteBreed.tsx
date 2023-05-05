import { BreedSelect } from '@/components/Input/BreedSelect/BreedSelect'
import { useHomepageContext } from './Homepage';
import { getBreedLabel } from '@/utils';
import { Card } from '@/components';
import { Breed } from '@/services/dog/types';

export const FavoriteBreed = () => {
  const { setBreeds, breeds } = useHomepageContext();
  let favBreeds = breeds;
  if(breeds.length < 3) {
    favBreeds = breeds.concat(Array(3 - breeds.length).fill(''))
  }

  console.log("defaultValue", breeds)

  return (
    <div className='grid gap-2'>
      <Card className='p-3'>
        <h2>My Favorite Breeds</h2>
        <ul>
        { favBreeds.map((breed: Breed, i) => (
          <li key={`label-${breed.breed? getBreedLabel(breed): i}`}>{i+1}. {breed.breed ? getBreedLabel(breed) : '-'}</li>
        ))}
        </ul>
      </Card>
      <Card className='p-3'>
        <BreedSelect
          maxCount={3}
          defaultValue={breeds}
          onChange={(breeds)=> setBreeds(breeds)}
        />
      </Card>
    </div>

  )
}
