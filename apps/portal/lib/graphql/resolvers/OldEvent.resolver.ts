import { Event } from '@generated/type-graphql';
import { injectable } from 'tsyringe';
import { Arg, Ctx, FieldResolver, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import type { TContext } from '../interfaces/context.interface';
import { InjectSessionMiddleware } from '../middlewares/inject-session';
import FirebaseService from '../services/FirebaseService.service';
import AdditionalCRUDEventService from '../services/AdditionalCRUDEvent.service';
import EventCheckinService from '../services/EventCheckin.service';
import { EventCheckin, EventCheckinInput } from '../schemas/EventCheckin';

@Resolver(() => Event)
@injectable()
export default class OldEventResolver {
  constructor(
    private eventService: AdditionalCRUDEventService,
    private checkService: EventCheckinService,
    private firebaseService: FirebaseService,
  ) {}

  @Mutation(() => [EventCheckin])
  async checkInOldEvent(
    @Arg('netID', () => String) netId: string,
    @Arg('email', () => String) email: string,
    @Ctx() context: TContext,
  ): Promise<EventCheckin[]> {
    const event_data = await this.firebaseService.returnEventsbyProfile(netId, email);

    const events = await this.eventService.findOldEventID(event_data);

    const profile = await context.prisma.profile.findFirst({
      where: {
        netid: netId,
      },
    });

    const reservations = await Promise.all(
      events.map((event) =>
        this.checkService.checkInEvent(
          {
            eventId: event.id,
            profileId: profile.id,
          },
          context,
        ),
      ),
    );
    return reservations;
  }
}
