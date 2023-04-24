import React from 'react'
import SvgImage from './Hourglass.svg';
import Image from 'next/image';
import { IconProps } from '../types';

export const Hourglass = (props: IconProps) => {
  return (
    <>
      <Image src={SvgImage} alt="Hourglass" {...props}/>
    </>
  )
}
