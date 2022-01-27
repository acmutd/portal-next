import { container } from 'tsyringe';
import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import ProfileService from '../services/Profile.service';
import Profile, { PartialProfile } from '../schemas/Profile.schema';
import { TypegooseMiddleware } from '../middlewares/typegoose';

@Resolver()
export default class ProfileResolver {
  private profileService: ProfileService;

  constructor() {
    this.profileService = container.resolve(ProfileService);
  }

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
}
