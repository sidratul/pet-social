import React, { ReactNode } from 'react'
import styles from './Card.module.scss';

interface CardProps {
  className?: string;
  children: ReactNode;
}
export const Card = (props: CardProps) => {
  return (
    <div className={`${styles.card} ${props.className}`}>{props.children}</div>
  )
}
