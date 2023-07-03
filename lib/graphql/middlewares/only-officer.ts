import { GraphQLError } from 'graphql/error';
import { getSession } from 'next-auth/react';
import { MiddlewareFn } from 'type-graphql';
import { TContext } from '../interfaces/context.interface';
import { checkIfUserIsOfficer } from '../utilities/check-officer';

export const onlyOfficerAllowed: MiddlewareFn<TContext> = async ({ args, context }, next) => {
  const session = await getSession(context);
  if (!session) {
    throw new GraphQLError('Login required',
    {
      extensions: {
        code: 'LOGIN_REQUIRED',
      },
    });
  }
  const isOfficer = await checkIfUserIsOfficer(session.id);
  if (isOfficer) {
    return next();
  }
  throw new GraphQLError('Officer permission required',
  {
    extensions: {
      code: 'OFFICER_PERMISSION_REQUIRED',
    }
  });
};
