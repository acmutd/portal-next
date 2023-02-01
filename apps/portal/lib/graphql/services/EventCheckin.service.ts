import { EventCheckinInput } from '../schemas/EventCheckin';
import { singleton } from 'tsyringe';
import { TContext } from '../interfaces/context.interface';

@singleton()
export default class EventCheckinService {
  async checkInEvent({ eventId, profileId }: EventCheckinInput, ctx: TContext) {
    return ctx.prisma.eventReservation.upsert({
      where: {
        profileId_eventId: {
          eventId,
          profileId,
        },
      },
      create: {
        profileId,
        eventId,
        status: 'checkin',
      },
      update: {
        status: 'checkin',
      },
    });
  }
}
