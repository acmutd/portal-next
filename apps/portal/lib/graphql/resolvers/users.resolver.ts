import { Ctx, FieldResolver, Query, Resolver, Root, UseMiddleware } from 'type-graphql';
import { User, Event } from '@generated/type-graphql';
import { TContext } from '../interfaces/context.interface';
import { InjectSessionMiddleware } from '../middlewares/inject-session';
import { injectable } from 'tsyringe';
import AdditionalUserService from '../services/users.service';

@Resolver(() => User)
@injectable()
export default class AdditionalUserResolver {
  constructor(private userService: AdditionalUserService) {}

  @Query(() => User)
  @UseMiddleware(InjectSessionMiddleware)
  async me(@Ctx() context: TContext) {
    return this.userService.getUserById(context.session.id);
  }

  @FieldResolver(() => Boolean)
  async isOfficer(@Root() user: User): Promise<boolean> {
    return this.userService.checkIfUserIsOfficer(user.id);
  }

  @FieldResolver(() => [Event])
  async attendedEvents(@Root() user: User): Promise<Event[]> {
    return this.userService.getAttendedEventsByUserId(user.id);
  }

  @FieldResolver(() => String)
  async resumeFilename(@Root() user: User): Promise<string> {
    return this.userService.getResumeFileName(user.id);
  }
}
