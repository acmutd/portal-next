import { getSession } from 'next-auth/react';
import { MiddlewareFn } from 'type-graphql';
import { CombinedError } from 'urql';
import { TContext } from '../interfaces/context.interface';
import { checkIfUserIsOfficer } from '../utilities/check-officer';

export const onlyOfficerAllowed: MiddlewareFn<TContext> = async ({ args, context }, next) => {
  const session = await getSession(context);
  if (!session) {
    throw new CombinedError({
      graphQLErrors: ['Login required'],
      response: args,
    });
  }
  const isOfficer = await checkIfUserIsOfficer(context.session.id);
  if (isOfficer) {
    return next();
  }
  throw new CombinedError({
    graphQLErrors: ['Officer permission required'],
    response: args,
  });
};
