import { ObjectId } from 'mongodb';
import { PartialProfile, ProfileModel } from '../schemas/Profile.schema';
import DiscordService from './Discord.service';

export default class ProfileService {
  private discordService: DiscordService;

  constructor() {
    this.discordService = new DiscordService();
  }

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
}
