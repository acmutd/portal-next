import { injectable } from 'tsyringe';
import { Arg, Ctx, FieldResolver, Query, Resolver, Root, UseMiddleware } from 'type-graphql';
import { TypegooseMiddleware } from '../middlewares/typegoose';
import User, { UserFilter } from '../schemas/User.schema';
import UserService from '../services/User.service';
import EventMetaService from '../services/EventMeta.service';
import Event from '../schemas/Event.schema';
import ProfileService from '../services/Profile.service';
import Profile from '../schemas/Profile.schema';
import SubmissionService from '../services/Submission.service';
import Submission from '../schemas/Submission.schema';

import { TContext } from '../interfaces/context.interface';
import { InjectSessionMiddleware } from '../middlewares/inject-session';


@Resolver(() => User)
@injectable()
export default class UserResolver {
  constructor(
    private userService: UserService,
    private eventMetaService: EventMetaService,
    private profileService: ProfileService,
    private submissionService: SubmissionService,
  ) {}

  @Query(() => [User])
  @UseMiddleware(TypegooseMiddleware)
  async users(
    @Arg('filter', () => UserFilter, { nullable: true }) filter?: UserFilter,
  ): Promise<User[]> {
    return this.userService.getAll(filter);
  }

  @FieldResolver(() => [Event])
  @UseMiddleware(TypegooseMiddleware)
  async rsvp(@Root() user: User) {
    return this.eventMetaService.findRsvpByUserId(user._id);
  }

  @FieldResolver(() => [Event])
  @UseMiddleware(TypegooseMiddleware)
  async checkIn(@Root() user: User) {
    return this.eventMetaService.findCheckInByUserId(user._id);
  }

  @FieldResolver(() => Profile, { nullable: true })
  @UseMiddleware(TypegooseMiddleware)
  async profile(@Root() user: User) {
    return this.profileService.findByUserId(user._id);
  }

  @FieldResolver(() => Boolean)
  async hasProfile(@Root() user: User) {
    const profile = await this.profileService.findByUserId(user._id);
    return !!profile;
  }

  @FieldResolver(() => [Submission])
  @UseMiddleware(TypegooseMiddleware)
  async submissions(@Root() user: User) {
    return this.submissionService.getAll({
      userId: user._id,
    });
    
  @Query(() => User)
  @UseMiddleware(InjectSessionMiddleware)
  @UseMiddleware(TypegooseMiddleware)
  async me(@Ctx() context: TContext) {
    return this.userService.findById(context.session!.id);
  }
}
