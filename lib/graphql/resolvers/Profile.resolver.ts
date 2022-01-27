import { container } from 'tsyringe';
import { Arg, Mutation, UseMiddleware } from 'type-graphql';
import ProfileService from '../services/Profile.service';
import Profile, { ProfileInput } from '../schemas/Profile.schema';
import { TypegooseMiddleware } from '../middlewares/typegoose';

export default class ProfileResolver {
  private profileService: ProfileService;

  constructor() {
    this.profileService = container.resolve(ProfileService);
  }

  @Mutation(() => Profile)
  @UseMiddleware(TypegooseMiddleware)
  async createProfile(@Arg('profile', () => ProfileInput) profile: Profile) {
    const newProfile = await this.profileService.createProfile(profile);
    return newProfile;
  }

  @Mutation(() => Profile)
  @UseMiddleware(TypegooseMiddleware)
  async upsertDiscordMeta(@Arg('userId', () => String) userId: string) {
    return this.profileService.upsertDiscordMeta(userId);
  }
}
