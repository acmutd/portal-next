import { injectable } from 'tsyringe';
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql';
import ProfileService from '../services/Profile.service';
import Profile, { PartialProfile } from '../schemas/Profile.schema';
import { TypegooseMiddleware } from '../middlewares/typegoose';
import User from '../schemas/User.schema';
import UserService from '../services/User.service';

@Resolver(() => Profile)
@injectable()
export default class ProfileResolver {
  constructor(private profileService: ProfileService, private userService: UserService) {}

  @Mutation(() => Profile)
  @UseMiddleware(TypegooseMiddleware)
  async createProfile(@Arg('profile', () => PartialProfile) profile: PartialProfile) {
    const newProfile = await this.profileService.createProfile(profile);
    return newProfile;
  }

  @Mutation(() => Profile)
  @UseMiddleware(TypegooseMiddleware)
  async upsertDiscordMeta(@Arg('userId', () => String) userId: string) {
    return this.profileService.upsertDiscordMeta(userId);
  }

  @Query(() => [Profile])
  @UseMiddleware(TypegooseMiddleware)
  async profiles(@Arg('profileIds', () => [String]) profileIds: string[]) {
    return this.profileService.findByIds(profileIds);
  }

  @FieldResolver(() => User)
  @UseMiddleware(TypegooseMiddleware)
  async user(@Root() profile: Profile) {
    return this.userService.findById(profile.user);
  }
}
