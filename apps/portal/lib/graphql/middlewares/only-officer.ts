import { getSession } from 'next-auth/react';
import { MiddlewareFn } from 'type-graphql';
import { CombinedError } from 'urql';
import { TContext } from '../interfaces/context.interface';

export const onlyOfficerAllowed: MiddlewareFn<TContext> = async ({ args, context }, next) => {
  const session = await getSession(context);
  if (!session) {
    throw new CombinedError({
      graphQLErrors: ['Login required'],
      response: args,
    });
  }
  const isOfficer =
    (
      await context.prisma.rolesOnUser.findMany({
        where: {
          role: {
            roleName: 'officer',
          },
          userId: session.id,
        },
      })
    ).length !== 0;
  if (isOfficer) {
    return next();
  }
  throw new CombinedError({
    graphQLErrors: ['Officer permission required'],
    response: args,
  });
};
