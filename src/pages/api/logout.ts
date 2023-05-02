import { firebaseLogout } from '@/services/firebase';
import { FirebaseError } from 'firebase/app';
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiUserResponse } from './types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiUserResponse>
) {
  if (req.method !== 'PATCH') {
    res.status(404).json({ message : 'Not Found'});
    return;
  }

  firebaseLogout().then( user => {
    res.status(200).json({
      message: 'ok',
    });
  }).catch( e => {
    const error = e as FirebaseError;
    res.status(500).json({
      error,
      message: 'error',
    });
  });
}