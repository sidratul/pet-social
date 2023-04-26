import React from 'react'
import SvgImage from './Eye.svg';
import Image from 'next/image';
import { IconProps } from '../types';

export const Eye = (props: IconProps) => {
  return (
    <>
      <Image src={SvgImage} alt="Eye" {...props}/>
    </>
  )
}
