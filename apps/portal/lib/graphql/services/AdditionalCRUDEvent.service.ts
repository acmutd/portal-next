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

  async findOldEventID(event_names: string[]): Promise<Event[]> {
    //finds the event id in the new mongodb from the old events in firebase
    const prisma = getPrismaConnection();

    const event_desc = [];
    var temp = event_names[0];

    for (var i = 0; i < temp.length; i++) {
      var elem = JSON.parse(JSON.stringify(temp[i]));
      event_desc.push(elem.name);
    }

    return prisma.event.findMany({
      where: {
        description: { in: event_desc },
      },
    });
  }
}
