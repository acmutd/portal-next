import { Officer, Profile } from "@generated/type-graphql";
import { injectable } from "tsyringe";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import OfficerService from "../services/officer.service";
import { AddUserToDivisionInput } from "../schemas/Officer";

@Resolver(() => Officer)
@injectable()
export default class OfficerResolver {
    constructor(private officerService: OfficerService) {}
    @Mutation(() => String)
    async addUserToDivision(
        @Arg('data', () => AddUserToDivisionInput) data: AddUserToDivisionInput
    ) {
        await this.officerService.addUserToDivision(data.profileId, data.divisionId);
        return "done";
    }

    @Query(() => [Profile])
    async officerEligibleProfiles() {
        return this.officerService.getOfficerEligibleProfiles();
    }
} 