
import React from 'react'
import { BaseTextInput, Button } from '@/components'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLayoutContext } from '@/layouts';
import { UserParam, UserResposne } from '@/services/user/types';
import { toast } from 'react-toastify';
import { login } from '@/services/user';
import { ApiError } from '@/services/api';
import { getFirebaseMessage } from '@/services/firebase';

export const LoginForm = () => {
  const { userLogin } = useLayoutContext();

  const onSubmit = async (values: UserParam) => {
    try{
      const user = await login(values);
      userLogin(user.data.data);
    } catch(e) {
      const error = e as ApiError<UserResposne>;
      const message = getFirebaseMessage(error.response?.data.error.code);
      toast.error(message);
    }
  }

  const { errors, handleSubmit, handleChange} = useFormik<UserParam>({
    onSubmit,
    initialValues: {} as UserParam,
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
    }),
  });

  return (
    <form className='grid gap-6' onSubmit={handleSubmit}>
      <BaseTextInput type='text' name='email' label='email' error={errors.email} onChange={handleChange}/>
      <BaseTextInput type='password' name='password' label='password' error={errors.password} onChange={handleChange}/>
      <Button type='submit' label='Login' style='primary'/>
    </form>
  )
}