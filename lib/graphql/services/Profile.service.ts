import { ObjectId } from 'mongodb';
import { injectable, singleton } from 'tsyringe';
import { PartialProfile, ProfileModel } from '../schemas/Profile.schema';
import DiscordService from './Discord.service';

@singleton()
@injectable()
export default class ProfileService {
  constructor(private discordService: DiscordService) {}

  async createProfile(profile: PartialProfile) {
    const savedProfile = await ProfileModel.create({
      ...profile,
      _id: new ObjectId().toString(),
    });
    return savedProfile;
  }

  async upsertDiscordMeta(userId: string) {
    const profile = await ProfileModel.findById(userId);
    profile.discordMeta = this.discordService.fetchMetadata();
    await profile.save();
    return profile;
  }

  async findByIds(profileIds: string[]) {
    return Promise.all(profileIds.map((profileId) => ProfileModel.findById(profileId)));
  }
}
