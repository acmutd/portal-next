import { Session } from 'next-auth';

export interface TContext {
  req: any;
  session?: Session;
}
