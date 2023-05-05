import React, { useEffect, useState } from 'react';
import { getRandomDogImages } from '@/services/dog/dog';
import { Breed } from '@/services/dog/types';
import { DogImage } from './DogImage';
import { getLikeByUrls } from '@/services/firebase/firestore';

interface DogImagesProps {
  breed: Breed;
}

export const DogImages = (props: DogImagesProps) => {
  const { breed } = props;
  const {data, error, isLoading} = getRandomDogImages({
    ...breed,
    count: 6,
  });

  const [likedImages, setLikedImages] = useState<Record<string,string>>({});

  useEffect(()=>{
    if(!data) {
      return;
    }

    getLikeByUrls(data.message).then(urls => setLikedImages(urls));
  }, [data])

  if(!data || isLoading || error) {
    return <></>;
  }

  return (
    <div className='grid grid-cols-3 gap-4 p-4'>
      {data.message.map( url => (
        <DogImage key={url} url={url} likedImages={likedImages}/>
      ))}
    </div>
  )
}
