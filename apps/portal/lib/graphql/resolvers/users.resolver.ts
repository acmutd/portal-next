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
    return this.userService.findUserById(context.session.id, context);
  }

  @FieldResolver(() => String)
  async resumeFilename(@Root() user: User): Promise<string> {
    return this.userService.getResumeFileName(user.id);
  }

  @FieldResolver(() => Boolean)
  async isOfficer(@Root() user: User, @Ctx() context: TContext): Promise<boolean> {
    return this.userService.checkIfUserIsOfficer(user.id, context);
  }

  @FieldResolver(() => [Event])
  async attendedEvents(@Root() user: User, @Ctx() context: TContext): Promise<Event[]> {
    return this.userService.fetchAttendedEventsByUserId(user.id, context);
  }
}
