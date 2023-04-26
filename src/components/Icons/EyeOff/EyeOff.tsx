import React from 'react'
import SvgImage from './EyeOff.svg';
import Image from 'next/image';
import { IconProps } from '../types';

export const EyeOff = (props: IconProps) => {
  return (
    <>
      <Image src={SvgImage} alt="Eye off" {...props}/>
    </>
  )
}
