import { injectable } from 'tsyringe';
import { Arg, Resolver, Mutation } from 'type-graphql';
import { EventCheckin, EventCheckinInput } from '../schemas/EventCheckin';
import EventCheckinService from '../services/EventCheckin.service';

@Resolver(() => EventCheckin)
@injectable()
export default class EventCheckinResolver {
  constructor(private eventCheckinService: EventCheckinService) {}

  @Mutation(() => EventCheckin)
  checkinToEvent(@Arg('options', () => EventCheckinInput) options: EventCheckinInput) {
    const messageId = this.eventCheckinService.pubCheckinEvent(options);
    return {
      eventId: options.eventId,
      profileId: options.profileId,
      messageId,
    };
  }
}
