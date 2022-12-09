import { singleton } from 'tsyringe';
import { Event } from '@generated/type-graphql';
import { getPrismaConnection } from 'lib/prisma/manager';

@singleton()
export default class AdditionalCRUDEventService {
  async getUpcomingEvent(): Promise<Event[]> {
    const prisma = getPrismaConnection();
    const events = await prisma.event.findMany({
      where: {
        start: {
          gte: new Date(),
        },
      },
    });
    return events;
  }
}
