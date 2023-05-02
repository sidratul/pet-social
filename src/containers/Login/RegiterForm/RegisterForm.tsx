
import React from 'react'
import { BaseTextInput, Button } from '@/components'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLayoutContext } from '@/layouts';
import { UserParam, UserResposne } from '@/services/user/types';
import { toast } from 'react-toastify';
import { getFirebaseMessage } from '@/utils';
import { firebaseRegister } from '@/services/firebase';
import { FirebaseError } from 'firebase-admin';

interface UserRegister extends UserParam {
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { userLogin } = useLayoutContext();

  const onSubmit = async (values: UserRegister) => {
    try{
      const user = await firebaseRegister(values);
      userLogin(user);
      toast.success('Register success');
    } catch(e) {
      const error = e as FirebaseError;
      const message = getFirebaseMessage(error.code);
      toast.error(message);
    }
  }

  const { errors, handleSubmit, handleChange} = useFormik<UserRegister>({
    onSubmit,
    initialValues: {} as UserRegister,
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
      confirmPassword: Yup.string().required().oneOf([Yup.ref('password')], 'Passwords do not match'),
    }),
  });

  return (
    <form className='grid gap-6' onSubmit={handleSubmit}>
      <BaseTextInput type='text' name='email' label='email' error={errors.email} onChange={handleChange}/>
      <BaseTextInput type='password' name='password' label='password' error={errors.password} onChange={handleChange}/>
      <BaseTextInput type='password' name='confirmPassword' label='confirm  password' error={errors.confirmPassword} onChange={handleChange}/>
      <Button type='submit' label='Login' style='primary'/>
    </form>
  )
}
