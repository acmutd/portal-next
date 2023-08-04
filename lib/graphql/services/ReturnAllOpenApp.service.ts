import { singleton } from 'tsyringe';
import { Application } from '@generated/type-graphql';
import { getPrismaConnection } from 'lib/prisma/manager';

@singleton()
export default class ReturnAllOpenApp {
  async getOpenApps(currentDate: Date): Promise<Application[]> {
    const prisma = getPrismaConnection();
    const eventFilter = {
      where: {
        expireDate: {
          lte: currentDate,
        },
      },
    };
    const openApps = await prisma.application.findMany(eventFilter);
    return openApps;
  }
}
