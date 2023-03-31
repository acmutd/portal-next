import { GraphQLError } from 'graphql/error';
import { getSession } from 'next-auth/react';
import { MiddlewareFn } from 'type-graphql';
import { TContext } from '../interfaces/context.interface';

export const checkNetId: MiddlewareFn<TContext> = async ({ args, context }, next) => {
  const session = await getSession(context);
  if (!session) {
    throw new GraphQLError('Login required',
    {
      extensions: {
        code: 'LOGIN_REQUIRED',
      },
    });
  }

  const profile = await context.prisma.profile.findFirst({
    where: { netid: args.where.netid },
  });

  if (profile && profile.userId !== session.id) {
    throw new GraphQLError('[VALIDATION_ERROR]: NetID exists',
    {
      extensions: {
        code: 'NETID_EXISTS',
      },
    });
  }

  return next();
};
