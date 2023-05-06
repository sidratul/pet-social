import React, { useEffect, useState } from 'react';
import { getRandomDogImages } from '@/services/dog/dog';
import { Breed } from '@/services/dog/types';
import { DogImage } from './DogImage';
import { getLikeByUrls } from '@/services/firebase/firestore';
import { useHomepageContext } from '../Homepage';

interface DogImagesProps {
  breed: Breed;
}

export const DogImages = (props: DogImagesProps) => {
  const { breed } = props;
  const { setMutate } = useHomepageContext();

  const {data, error, isLoading, mutate} = getRandomDogImages({
    ...breed,
    count: 6,
  });

  useEffect(()=>{
    setMutate(breed,mutate);
  },[breed, setMutate, mutate]);

  const [likedImages, setLikedImages] = useState<Record<string,string>>({});

  useEffect(()=>{
    if(!data) {
      return;
    }
    getLikeByUrls(data.message).then(urls => setLikedImages(urls));
  }, [data]);

  if(!data || isLoading || error) {
    return <></>;
  }

  return (
    <div className='grid md:grid-cols-3 gap-4 px-4 my-4'>
      {data.message.map( url => (
        <DogImage key={url} url={url} likedImages={likedImages}/>
      ))}
    </div>
  )
}
