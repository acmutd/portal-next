import { getSession } from 'next-auth/react';
import { MiddlewareFn } from 'type-graphql';
import { CombinedError } from 'urql';
import { TContext } from '../interfaces/context.interface';

export const checkNetId: MiddlewareFn<TContext> = async ({ args, context }, next) => {
  const session = await getSession(context);
  if (!session) {
    throw new CombinedError({
      graphQLErrors: ['Login required'],
    });
  }

  const profile = await context.prisma.profile.findFirst({
    where: { netid: args.where.netid },
  });

  if (profile && profile.userId !== session.id) {
    // TODO: create error type
    throw new CombinedError({ graphQLErrors: ['[VALIDATION_ERROR]: NetID exists'] });
  }

  return next();
};
