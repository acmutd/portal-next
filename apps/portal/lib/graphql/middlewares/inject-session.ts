/* eslint  import/prefer-default-export: "off" */
import { getSession } from 'next-auth/react';
import { MiddlewareFn } from 'type-graphql';
import { TContext } from '../interfaces/context.interface';

export const InjectSessionMiddleware: MiddlewareFn<TContext> = async ({ context }, next) => {
  const session = await getSession(context);
  if (!session) {
    return 'You must login to be able to use this functionality';
  }
  (context.session as any) = session;
  return next();
};
