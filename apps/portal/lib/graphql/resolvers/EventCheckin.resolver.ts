import { getSession } from 'next-auth/react';
import { injectable } from 'tsyringe';
import { Arg, Resolver, Mutation, Ctx } from 'type-graphql';
import EventCheckinService from '../services/EventCheckin.service';
import { EventCheckin, EventCheckinInput } from '../schemas/EventCheckin';

@Resolver(() => EventCheckin)
@injectable()
export default class EventCheckinResolver {
  constructor(private EventCheckinService: EventCheckinService) {}

  @Mutation(() => EventCheckin)
  async checkinToEvent(
    @Arg('options', () => EventCheckinInput) options: EventCheckinInput,
    @Ctx() context: any,
  ) {
    //const session = (await getSession(context)) as any;
    const messageId = await this.EventCheckinService.pubCheckinEvent(options);
    return {
      eventId: options.eventId,
      profileId: options.profileId,
      messageId,
    };
  }
}
