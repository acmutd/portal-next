import { singleton } from 'tsyringe';
import { Application } from '@generated/type-graphql';
import { getPrismaConnection } from 'lib/prisma/manager';

@singleton()
export default class RetrieveAppsByDivision {
  async getUpcomingEvent(divIds: string[]): Promise<Application[]> {
    const prisma = getPrismaConnection();
    const eventFilter = {
      where: {
        divisionId: { in: divIds },
      },
    };
    const apps = await prisma.application.findMany(eventFilter);
    return apps;
  }
}
