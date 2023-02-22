import { PrismaClient } from '@prisma/client';
import { Session } from 'next-auth';

export interface TContext {
  req: any;
  session?: Session;
  prisma: PrismaClient;
}
