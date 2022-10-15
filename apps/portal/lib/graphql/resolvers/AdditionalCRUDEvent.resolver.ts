import { Event } from '@generated/type-graphql';
import { injectable } from 'tsyringe';
import { Ctx, Query, Resolver } from 'type-graphql';
import { TContext } from '../interfaces/context.interface';

@Resolver(() => Event)
@injectable()
export default class AdditionalCRUDEventResolver {
  constructor() {}

  @Query(() => [Event])
  async upcomingEvent(@Ctx() context: TContext): Promise<Event[]> {
    const events = await context.prisma.event.findMany({
      where: {
        start: {
          gte: new Date(),
        },
      },
    });
    return events;
  }
}
