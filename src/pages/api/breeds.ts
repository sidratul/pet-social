import type { NextApiRequest, NextApiResponse } from 'next'
import { UserFavBreedParams, UserParam } from '@/services/user/types';
import { changeFavoriteBreed, getFavoriteBreed } from '@/services/firebase/firestore';
import { validateToken } from '@/services/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const authHeader =  req.headers['authorization'];
  if(!authHeader){
    return res.status(403).json({ message : 'permission denied'});
  }

  try{
    const token = authHeader?.split(' ')[1];
    const userdata = await validateToken(token);
  } catch(e) {
    console.log(e);
    return res.status(403).json({ message : 'permission denied'});
  }

  if (req.method == 'GET') {
    const data = req.query;
    console.log("data", data)
    // getFavoriteBreed()
    res.status(404).json({ message : 'Not Found'});
  } else if(req.method == 'PUT') {
    const data = req.body as UserFavBreedParams;
    changeFavoriteBreed(data).then(_ => {
      res.status(201).json({ message : 'ok'});
    }).catch(e=>{
      res.status(500).json({
        error: e,
        message: 'error',
      });
    })
  } else {
    res.status(404).json({ message : 'Not Found'});
  }

  // const data = req.body as UserParam;
  // firebaseRegister(data).then( user => {
  //   res.status(200).json({
  //     message: 'ok',
  //     data: user,
  //   });
  // }).catch( e => {
  //   const error = e as FirebaseError;
  //   res.status(500).json({
  //     error,
  //     message: 'error',
  //   });
  // });
}