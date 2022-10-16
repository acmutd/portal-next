import { PrismaClient } from '@prisma/client';
import { getPrismaConnection } from 'lib/prisma/manager';
import { singleton } from 'tsyringe';
import { User, Event } from '@generated/type-graphql';

@singleton()
export default class AdditionalUserService {
  private prismaConnection: PrismaClient;
  constructor() {
    this.prismaConnection = getPrismaConnection();
  }
  async getUserById(userId: string): Promise<User> {
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
        roleId: officerRole.id,
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
}
