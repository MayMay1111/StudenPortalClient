// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy, { ProxyResCallback } from 'http-proxy'
import dotenv from 'dotenv'
import Cookies from 'cookies';

dotenv.config();

type Data = {
  message: string,
  err?: string
}

export const config = {
  api: {
    bodyParser: false,
  },
}

const proxy = httpProxy.createProxyServer()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    if(req.method!=='POST'){
        return res.status(404).json({message:"Method is not supported"})
    }

  return new Promise((resolve,reject) => {
    req.headers.cookie = ``;
    req.headers['content-type']='application/json'

    const handleLoginResponse:ProxyResCallback = (proxyReq, req, res) => {
        let body = ''
        proxyReq.on('data', (chunk) => {
            body+=chunk
        })

        proxyReq.on('end', () => {
            try{
                const {accessToken, expiredAt, err} = JSON.parse(body);

                if(err){
                  throw new Error(err)
                }

                const cookies = new Cookies(req,res, {secure: process.env.NODE_ENV !== 'development'});
                cookies.set('accessToken',accessToken,{
                  httpOnly:true,
                  sameSite: 'lax',
                  expires: new Date(expiredAt)
                });

                (res as NextApiResponse).status(200).json({message:'success'})
            } catch(err){
                (res as NextApiResponse).status(504).json({message:'loggin unsuccessfully',error:(err as Error).message})
            }

            resolve(true)
        });

        proxyReq.on('error',() => {
          res.end('Something went wrong. And we are reporting a custom error message.');
        })
    }
    proxy.web(req,res,{target:"http://localhost:6869", changeOrigin: true, selfHandleResponse: true});
    
    proxy.once('proxyRes', handleLoginResponse)

  })
  

}
