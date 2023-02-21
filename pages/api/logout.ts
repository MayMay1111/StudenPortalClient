// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv'
import Cookies from 'cookies';

dotenv.config();

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if(req.method!=='POST'){
    return res.status(404).json({message: 'method is not supported'})
  }

  const cookie = new Cookies(req,res)
  cookie.set('accessToken')

  res.status(200).json({message:'log out successfully'})
}
