import { singleton } from 'tsyringe';
import { Event } from '@generated/type-graphql';
import { getPrismaConnection } from 'lib/prisma/manager';

@singleton()
export default class AdditionalCRUDEventService {
  async getUpcomingEvent(userIsOfficer: boolean): Promise<Event[]> {
    const prisma = getPrismaConnection();
    const eventFilter = {
      where: {
        isPublic: true,
        start: {
          gte: new Date(),
        },
      },
    };
    if (userIsOfficer) {
      delete eventFilter.where.isPublic;
    }
    const events = await prisma.event.findMany(eventFilter);
    return events;
  }
}
