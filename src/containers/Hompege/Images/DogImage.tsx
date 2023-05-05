import React, { useCallback, useState } from 'react'
import { ImageDisplay } from '@/components'
import { dislikeImage, likeImage } from '@/services/firebase/firestore'

interface DogImageProps {
  url: string;
  likedImages: Record<string, string>;
}

export const DogImage = ({url, likedImages }: DogImageProps) => {
  const [liked, setLiked] = useState<boolean>(!!likedImages[url]);
  let timeout: NodeJS.Timeout;

  const handleClick = (isLike: boolean) => {
    if(timeout){
      clearTimeout(timeout);
    }

    timeout = setTimeout(()=>{
      if (liked === isLike) {
        return;
      }

      const action = isLike ? likeImage : dislikeImage;
      setLiked(isLike);
      action(url)
        .catch(e => {
          setLiked(prev => !!prev);
        });
    }, 1000);
  }

  return (
    <ImageDisplay url={url} liked={liked} handleClick={handleClick}/>
  )
}
