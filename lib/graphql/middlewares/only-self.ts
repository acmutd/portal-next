import { GraphQLError } from 'graphql/error';
import { getSession } from 'next-auth/react';
import { MiddlewareFn } from 'type-graphql';
import { TContext } from '../interfaces/context.interface';

export const onlySelfCheckIn: MiddlewareFn<TContext> = async ({ args, context }, next) => {
  const session = await getSession(context);
  if (!session) {
    throw new GraphQLError('Login required',
    {
      extensions: {
        code: 'LOGIN_REQUIRED',
      },
    });
  }
  const user = await context.prisma.user.findFirst({
    where: {
      profile: args.data.profile.connect,
    },
  });
  if (!user || user.id !== session.id) {
    throw new GraphQLError('Invalid user found',
    {
      extensions: {
        code : 'INVALID_USER_FOUND',
      }
    });
  }
  return next();
};

export const onlySelfUpdateProfile: MiddlewareFn<TContext> = async ({ context, args }, next) => {
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
    where: {
      netid: args.where.netid,
    },
  });
  if (profile && profile.userId !== session.id) {
    throw new GraphQLError('Invalid user found',
    {
      extensions: {
        code : 'INVALID_USER_FOUND',
      }
    });
  }
  return next();
};
