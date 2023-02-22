import { getSession } from 'next-auth/react';
import { MiddlewareFn } from 'type-graphql';
import { CombinedError } from 'urql';
import { TContext } from '../interfaces/context.interface';

export const onlySelfCheckIn: MiddlewareFn<TContext> = async ({ args, context }, next) => {
  const session = await getSession(context);
  if (!session) {
    throw new CombinedError({
      graphQLErrors: ['Login required'],
    });
  }
  const user = await context.prisma.user.findFirst({
    where: {
      profile: args.data.profile.connect,
    },
  });
  if (!user || user.id !== session.id) {
    throw new CombinedError({
      graphQLErrors: ['Invalid user found'],
    });
  }
  return next();
};

export const onlySelfUpdateProfile: MiddlewareFn<TContext> = async ({ context, args }, next) => {
  const session = await getSession(context);
  if (!session) {
    throw new CombinedError({
      graphQLErrors: ['Login required'],
    });
  }
  const profile = await context.prisma.profile.findFirst({
    where: {
      netid: args.where.netid,
    },
  });
  if (!profile) {
    throw new CombinedError({
      graphQLErrors: ['Profile creation required'],
      response: args,
    });
  }
  if (profile.userId !== session.id) {
    throw new CombinedError({
      graphQLErrors: ['Invalid user found'],
    });
  }
  return next();
};
