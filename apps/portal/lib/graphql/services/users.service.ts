import { singleton } from 'tsyringe';
import googleCloudStorage from '../../google-cloud';
import { User } from '@generated/type-graphql';
import { TContext } from '../interfaces/context.interface';

@singleton()
export default class UsersService {
  async getResumeFileName(userId: string): Promise<string> {
    const bucketName = 'acm-core.appspot.com';
    const fileName = `resumes/${userId}`;
    const fileRef = googleCloudStorage.bucket(bucketName).file(fileName);
    const hasResume = await fileRef.exists();
    if (!hasResume[0]) {
      return 'N/A';
    }
    const data = await fileRef.getMetadata();
    const contentDisposition: string = data[0].contentDisposition;
    return contentDisposition.substring(22, contentDisposition.length - 1);
  }

  async findUserById(userId: string, ctx: TContext): Promise<User> {
    return ctx.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }

  async checkIfUserIsOfficer(userId: string, ctx: TContext): Promise<boolean> {
    const officerRole = await ctx.prisma.role.findFirst({
      where: {
        roleName: 'officer',
      },
    });
    const isOfficer = await ctx.prisma.rolesOnUser.findFirst({
      where: {
        roleId: officerRole.id,
        userId: userId,
      },
    });
    return !!isOfficer;
  }

  async fetchAttendedEventsByUserId(userId: string, ctx: TContext) {
    const profile = await ctx.prisma.profile.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!profile) {
      return [];
    }
    const events = await ctx.prisma.eventReservation.findMany({
      where: {
        profileId: profile.id,
        status: 'checkin',
      },
      include: {
        event: true,
      },
    });
    return events.map(({ event }) => event);
  }
}
