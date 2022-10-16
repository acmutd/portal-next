import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';
import { MiddlewareFn } from 'type-graphql';
import { TContext } from '../interfaces/context.interface';

export const checkValidEvent: MiddlewareFn<TContext> = async ({ args, context }, next) => {
  const errorList: string[] = [];

  if (!ObjectId.isValid(args.options.eventId)) {
    errorList.push('Invalid event');
  } else {
    const event = await context.prisma.event.findFirst({
      where: {
        id: args.options.eventId,
      },
    });
    if (!event) {
      errorList.push('Invalid event');
    }
  }

  if (!ObjectId.isValid(args.options.profileId)) {
    errorList.push('Invalid profile');
  } else {
    const profile = await context.prisma.profile.findFirst({
      where: {
        id: args.options.profileId,
      },
    });
    if (!profile) {
      errorList.push('Invalid profile');
    }
  }

  if (errorList.length > 0) {
    throw new GraphQLError(`Validation error: ${errorList.join('; ')}`);
  }

  return next();
};
