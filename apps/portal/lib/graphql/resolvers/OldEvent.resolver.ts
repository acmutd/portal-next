import { Event } from '@generated/type-graphql';
import { injectable } from 'tsyringe';
import { Ctx, FieldResolver, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import type { TContext } from '../interfaces/context.interface';
import { InjectSessionMiddleware } from '../middlewares/inject-session';
import Firebase from '../services/Firebase.service';
import AdditionalCRUDEventService from '../services/AdditionalCRUDEvent.service';
import EventCheckin from '../services/EventCheckin.service';

@Resolver(() => Event)
@injectable()
export default class OldEventResolver {
  constructor(
    private eventSerivce: AdditionalCRUDEventService,
    private checkService: EventCheckin,
    private firebase: Firebase,
  ) {}

  @FieldResolver(() => String)
  async checkinToEvent() {}
}
