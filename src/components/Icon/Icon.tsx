import React from 'react'
import { IconProps } from './types'
import Image from 'next/image'

export const Icon = (props: IconProps) => {
  const { icon, ...others } = props;
  return (
    <Image src={require(`./svg/${icon}.svg`)?.default} {...others} alt={icon}/>
  )
}
