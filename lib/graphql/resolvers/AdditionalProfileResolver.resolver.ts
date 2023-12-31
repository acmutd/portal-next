import { injectable } from "tsyringe";
import { FieldResolver, Resolver, Root } from "type-graphql";
import { Profile, TypeformSubmission } from '@generated/type-graphql';
import AdditionalProfileService from "../services/AdditionalProfileService.service";

@Resolver(() => Profile)
@injectable()
export default class AdditionalProfileResolver {
  constructor(private profileService: AdditionalProfileService) { }

  @FieldResolver(() => [TypeformSubmission])
  async typeformSubmissions(@Root() profile: Profile): Promise<TypeformSubmission[]> {
    return this.profileService.getTypeformSubmissionsByProfileEmail(profile.email);
  }
}