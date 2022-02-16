/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import cors, { CorsOptions } from '../lib/cors';

export default async function middleware(req: NextRequest) {
  // console.log('===============');
  // console.log(req);
  // console.log(NextResponse.next());
  // console.log('===============');
  const res = NextResponse.next();
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers',
  };
  return cors(req, res, corsOptions);
}
