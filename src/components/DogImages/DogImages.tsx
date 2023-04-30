import { getRandomDogImages } from '@/services/dog/dog';
import { Breed } from '@/services/dog/types';
import Image from 'next/image';
import React from 'react'

interface DogImagesProps {
  breed: Breed;
}

export const DogImages = (props: DogImagesProps) => {
  const { breed } = props;
  const {data, error, isLoading} = getRandomDogImages({
    ...breed,
    count: 10,
  });

  if(!data || isLoading || error) {
    return <></>;
  }

  return (
    <div>
      {data.message.map( url => (
        <Image key={url} src={url} alt={url} width={200} height={200}/>
      ))}
    </div>
  )
}
