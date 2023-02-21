// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'
import dotenv from 'dotenv'
import Cookies from 'cookies';

dotenv.config();

type Data = {
  name: string
}

const proxy = httpProxy.createProxyServer()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  return new Promise((resolve, reject) => {
    const cookie = new Cookies(req,res)
    const accessToken = cookie.get('accessToken')
    if(accessToken){
      req.headers.Authorization = `Bearer ${accessToken}`
    }

    req.headers.cookie = ``;

    proxy.web(req,res,{target:"http://127.0.0.1:6869", changeOrigin: true, selfHandleResponse: false});
    

    proxy.once('proxyRes', () => {
      resolve(true)
    })
  })
  

}
