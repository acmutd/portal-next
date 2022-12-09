import { Event } from '@generated/type-graphql';
import { injectable } from 'tsyringe';
import { Ctx, Query, Resolver } from 'type-graphql';
import AdditionalCRUDEventService from '../services/AdditionalCRUDEvent.service';

@Resolver(() => Event)
@injectable()
export default class AdditionalCRUDEventResolver {
  constructor(private eventSerivce: AdditionalCRUDEventService) {}

  @Query(() => [Event])
  async upcomingEvent(): Promise<Event[]> {
    return this.eventSerivce.getUpcomingEvent();
  }
}
