import { PrismaClient } from "@prisma/client";
import { getPrismaConnection } from "lib/prisma/manager";
import { singleton } from "tsyringe";
import { Profile } from '@generated/type-graphql';

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
            }
        });
        if (!officer) {
            await this.prismaConnection.officer.create({
                data: {
                    divisionIds: [divisionId],
                    profileId
                }
            });
        } else {
            await this.prismaConnection.officer.update({
                data: {
                    divisionIds: {
                        push: divisionId
                    }
                },
                where: {
                    profileId
                }
            })
        }
            
    }
    async getOfficerEligibleProfiles(): Promise<Profile[]> {
        return this.prismaConnection.profile.findMany({
            where: {
                user: {
                    accounts: {
                        some: {
                            provider: {
                                equals: "google_admin"
                            }
                        }
                    }
                }
            }
        })
    }
}