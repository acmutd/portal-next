import { PrismaClient } from "@prisma/client";
import { getPrismaConnection } from "lib/prisma/manager";
import { singleton } from "tsyringe";

@singleton()
export default class OfficerService {
    private prismaConnection: PrismaClient;
    constructor() {
        this.prismaConnection = getPrismaConnection();
    }
    async addUserToDivision(profileId: string, divisionId: string) {
        const officer = await this.prismaConnection.officer.findFirst({
            where: {
                profileId,
                divisionIds: {
                    has: divisionId
                } 
            }
        });
        if (!officer) {
            await this.prismaConnection.officer.create({
                data: {
                    divisionIds: [divisionId],
                    profileId
                }
            });
        }
            
    }
}