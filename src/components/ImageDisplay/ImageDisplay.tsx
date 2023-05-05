import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { string } from 'yup'
import { Icon } from '../Icon';

interface ImageDisplay {
  url: string;
  liked: boolean;
  handleClick?: (isLike: boolean) => void;
}

export const ImageDisplay = (props: ImageDisplay) => {
  const { url , liked, handleClick } = props;
  const [like, setLike] = useState<boolean>(false);

  useEffect(()=>{
    setLike(liked);
  },[liked]);

  const onClick = () => {
    handleClick && handleClick(!like);
    setLike((prev)=>{
      return !prev;
    });
  }

  return (
    <div className='h-[250px] relative' onClick={onClick}>
      {like && (
        <div className='absolute z-[1000] bot-0 bottom-1.5 right-1.5' >
          <Icon icon='Heart'/>
        </div>
      )}
      <Image
        src={url}
        alt={url}
        fill
        style={{objectFit:"cover"}}
        priority={true}
      />
    </div>
  )
}
