import { EventCheckinInput } from '../schemas/EventCheckin';
import pubsubclient from 'lib/pubsub';
import { singleton } from 'tsyringe';
import { TContext } from '../interfaces/context.interface';

@singleton()
export default class EventCheckinService {
  async pubCheckinEvent(options: EventCheckinInput) {
    const topicName = 'projects/acm-core/topics/TEST_PUBSUB';

    try {
      console.log('1');
      const messageId = await pubsubclient.topic(topicName).publishMessage({ json: options });
      return messageId;
    } catch (error: any) {
      console.error(`Received error while publishing: ${error.message}`);
    }
  }

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
