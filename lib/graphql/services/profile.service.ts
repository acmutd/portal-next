import { PrismaClient } from ".prisma/client";
import { getPrismaConnection } from "lib/prisma/manager";
import { singleton } from "tsyringe";
import { Profile } from '@generated/type-graphql';

@singleton()
export default class ProfileService {
    private prismaConnection: PrismaClient;
    constructor() {
        this.prismaConnection = getPrismaConnection();
    }

    async getAllProfiles(): Promise<Profile[]> {
        return this.prismaConnection.profile.findMany();
    }
}