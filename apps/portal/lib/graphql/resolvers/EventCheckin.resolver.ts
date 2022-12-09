import { injectable } from 'tsyringe';
import { Arg, Resolver, Mutation, Ctx, UseMiddleware } from 'type-graphql';
import EventCheckinService from '../services/EventCheckin.service';
import { EventCheckin, EventCheckinInput } from '../schemas/EventCheckin';
import type { TContext } from '../interfaces/context.interface';
import { checkValidEvent } from '../middlewares/check-valid-event';

@Resolver(() => EventCheckin)
@injectable()
export default class EventCheckinResolver {
  constructor(private EventCheckinService: EventCheckinService) {}

  @Mutation(() => EventCheckin)
  @UseMiddleware(checkValidEvent)
  async checkinToEvent(
    @Arg('options', () => EventCheckinInput) options: EventCheckinInput,
    @Ctx() context: TContext,
  ) {
    return this.EventCheckinService.checkInEvent(options, context);
  }
}
