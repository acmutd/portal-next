/* eslint-disable @next/next/no-server-import-in-page */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import cors, { CorsOptions } from '../../../lib/cors';

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const corsOptions: CorsOptions = {
    origin: [
      'http://localhost:4200',
      'https://studio.apollographql.com',
      'https://next.portal.acmutd.co',
    ],
    credentials: true,
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
      'Access-Control-Allow-Headers',
      'Content-Disposition',
    ],
    exposedHeaders: ['Content-Disposition'],
  };
  return cors(req, res, corsOptions);
}
