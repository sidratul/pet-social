import React, { InputHTMLAttributes, useState } from 'react'
import styles from './BaseTextInput.module.scss';
import { Eye, EyeOff } from '@/components/Icons';

interface BaseTextInputProps extends Pick<InputHTMLAttributes<HTMLInputElement>, 'type' | 'name' | 'placeholder' | 'id'> {
  label: string;
  isPassword?: boolean;
  error?: string;
  info?: string
}

export const BaseTextInput = (props: BaseTextInputProps) => {
  const { id, label, error, type, info, ...others} = props;
  const isPassword = props.type === 'password';
  const [view, setView]= useState(!isPassword);
  const Icon = view? Eye : EyeOff;
  const passStyle = isPassword && !view ? styles.password : '';
  return (
    <div className={`${styles.root} ${error && styles['error']} ${passStyle}`}>
      <label className={styles.label} htmlFor={id}> {label}</label>
      <input
        id={id}
        type={isPassword? 'text' : type}
        className={`${styles.input}`}
        {...others}
      />
      {
        isPassword && (
          <span className={styles.icon}>
            <Icon onClick={()=>setView(!view)}/>
          </span>
        )
      }
      {error && (
        <div className={styles.message}>{error}</div>
      )}
      { info && (
        <div className={styles.info}>{info}</div>
      )}
    </div>
  )
}

export default BaseTextInput;