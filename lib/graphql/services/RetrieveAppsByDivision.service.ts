import { singleton } from 'tsyringe';
import { Application } from '@generated/type-graphql';
import { getPrismaConnection } from 'lib/prisma/manager';

@singleton()
export default class RetrieveAppsByDivision {
  async retrieveApps(divIds: string[]): Promise<Application[]> {
    const prisma = getPrismaConnection();
    const divisionFilter = {
      where: {
        divisionId: { in: divIds },
      },
    };
    const apps = await prisma.application.findMany(divisionFilter);
    return apps;
  }
}
