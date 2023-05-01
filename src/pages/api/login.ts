import { firebaseLogin, firebaseRegister } from '@/services/firebase';
import { FirebaseError } from 'firebase/app';
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiUserResponse } from './types';
import { UserParam } from '@/services/user/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiUserResponse>
) {
  if (req.method !== 'POST') {
    res.status(404).json({ message : 'Not Found'});
    return;
  }

  const data = req.body as UserParam;
  firebaseLogin(data).then( user => {
    res.status(200).json({
      message: 'ok',
      data: user,
    });
  }).catch( e => {
    const error = e as FirebaseError;
    res.status(500).json({
      error,
      message: 'error',
    });
  });
}