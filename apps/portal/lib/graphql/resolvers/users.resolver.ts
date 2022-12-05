import { Ctx, FieldResolver, Query, Resolver, Root, UseMiddleware } from 'type-graphql';
import { User, Event } from '@generated/type-graphql';
import { TContext } from '../interfaces/context.interface';
import { InjectSessionMiddleware } from '../middlewares/inject-session';
import { injectable } from 'tsyringe';
import UsersService from '../services/users.service';

@Resolver(() => User)
@injectable()
export default class AdditionalUserResolver {
  constructor(private userService: UsersService) {}

  @Query(() => User)
  @UseMiddleware(InjectSessionMiddleware)
  async me(@Ctx() context: TContext) {
    return context.prisma.user.findFirst({
      where: {
        id: context.session.id,
      },
    });
  }

  @FieldResolver(() => String)
  async resumeFilename(@Root() user: User): Promise<string> {
    return this.userService.getResumeFileName(user.id);
  }

  @FieldResolver(() => Boolean)
  async isOfficer(@Root() user: User, @Ctx() context: TContext): Promise<boolean> {
    const officerRole = await context.prisma.role.findFirst({
      where: {
        roleName: 'officer',
      },
    });
    const isOfficer = await context.prisma.rolesOnUser.findFirst({
      where: {
        roleId: officerRole.id,
        userId: user.id,
      },
    });
    return !!isOfficer;
  }

  @FieldResolver(() => [Event])
  async attendedEvents(@Root() user: User, @Ctx() context: TContext): Promise<Event[]> {
    const profile = await context.prisma.profile.findFirst({
      where: {
        userId: user.id,
      },
    });
    if (!profile) {
      return [];
    }
    const events = await context.prisma.eventReservation.findMany({
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
