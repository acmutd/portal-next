import { Event } from '@generated/type-graphql';
import { injectable } from 'tsyringe';
import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import type { TContext } from '../interfaces/context.interface';
import { InjectSessionMiddleware } from '../middlewares/inject-session';
import AdditionalCRUDEventService from '../services/AdditionalCRUDEvent.service';
import { checkIfUserIsOfficer } from '../utilities/check-officer';

@Resolver(() => Event)
@injectable()
export default class AdditionalCRUDEventResolver {
  constructor(private eventSerivce: AdditionalCRUDEventService) {}

  @Query(() => [Event])
  @UseMiddleware(InjectSessionMiddleware)
  async upcomingEvents(@Ctx() context: TContext): Promise<Event[]> {
    const userIsOfficer = await checkIfUserIsOfficer(context.session!.id);
    return this.eventSerivce.getUpcomingEvent(userIsOfficer);
  }
}
