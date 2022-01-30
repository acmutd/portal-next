import { injectable } from 'tsyringe';
import { FieldResolver, Query, Resolver, Root, UseMiddleware } from 'type-graphql';
import { TypegooseMiddleware } from '../middlewares/typegoose';
import User from '../schemas/User.schema';
import UserService from '../services/User.service';
import EventMetaService from '../services/EventMeta.service';
import Event from '../schemas/Event.schema';
import ProfileService from '../services/Profile.service';
import Profile from '../schemas/Profile.schema';

@Resolver(() => User)
@injectable()
export default class UserResolver {
  constructor(
    private userService: UserService,
    private eventMetaService: EventMetaService,
    private profileService: ProfileService,
  ) {}

  @Query(() => [User])
  @UseMiddleware(TypegooseMiddleware)
  async users(): Promise<User[]> {
    return this.userService.getAll();
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
}
