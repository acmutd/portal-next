import { PrismaClient } from '@prisma/client';
import { getPrismaConnection } from 'lib/prisma/manager';
import { singleton } from 'tsyringe';
import { User, Event } from '@generated/type-graphql';
import googleCloudStorage from '../../google-cloud';

@singleton()
export default class AdditionalUserService {
  private prismaConnection: PrismaClient;
  constructor() {
    this.prismaConnection = getPrismaConnection();
  }
  async getUserById(userId: string): Promise<User | null> {
    return this.prismaConnection.user.findFirst({
      where: {
        id: userId,
      },
    });
  }

  async checkIfUserIsOfficer(userId: string): Promise<boolean> {
    const officerRole = await this.prismaConnection.role.findFirst({
      where: {
        roleName: 'officer',
      },
    });
    const isOfficer = await this.prismaConnection.rolesOnUser.findFirst({
      where: {
        roleId: officerRole!.id,
        userId,
      },
    });
    return !!isOfficer;
  }

  async getAttendedEventsByUserId(userId: string): Promise<Event[]> {
    const profile = await this.prismaConnection.profile.findFirst({
      where: {
        userId,
      },
    });
    if (!profile) return [];
    const events = await this.prismaConnection.eventReservation.findMany({
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
}
