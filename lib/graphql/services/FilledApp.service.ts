import { singleton } from 'tsyringe';
import { Event, FilledApplication } from '@generated/type-graphql';
import { getPrismaConnection } from 'lib/prisma/manager';

@singleton()
export default class FilledApp {
  async getFilledApp(fillAppId: string): Promise<FilledApplication | null> {
    const prisma = getPrismaConnection();
    const eventFilter = {
      where: {
        id: fillAppId
      },
    };
    const filled_app = await prisma.filledApplication.findFirst(eventFilter);
    return filled_app;
  }

  async updateFilledApp(fillAppId: string, status: string, score:number, notes:string, interviewLink:string) {
    const prisma = getPrismaConnection();
    return prisma.filledApplication.update({ 
      where: {
        id: fillAppId
      },
      data: {
        status: status,
        score: score,
        notes: notes,
        interviewLink: interviewLink
      },
    });
  }
}
