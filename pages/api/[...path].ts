// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'
import dotenv from 'dotenv'

dotenv.config();

type Data = {
  name: string
}

const proxy = httpProxy.createProxyServer()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  req.headers.cookie = ``;
  proxy.web(req,res,{target:"http://localhost:6969", changeOrigin: true, selfHandleResponse: false});
  console.log(process.env.SERVER)

}
