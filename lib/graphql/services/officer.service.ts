import { PrismaClient } from "@prisma/client";
import { getPrismaConnection } from "lib/prisma/manager";
import { singleton } from "tsyringe";
import { Profile, Officer } from '@generated/type-graphql';

@singleton()
export default class OfficerService {
    private prismaConnection: PrismaClient;
    constructor() {
        this.prismaConnection = getPrismaConnection();
    }
    async addUserToDivision(profileId: string, divisionId: string) {
        const division = await this.prismaConnection.division.findFirst({
            where: {
                id: divisionId,
            },
        });
        if (!division) {
            return;
        }
        const officer = await this.prismaConnection.officer.findFirst({
            where: {
                profileId,
            }
        });
        if (!officer) {
            const newOfficer = await this.prismaConnection.officer.create({
                data: {
                    divisionIds: [divisionId],
                    profileId
                }
            });
            await this.prismaConnection.division.update({
                data: {
                    officerIds: {
                        push: newOfficer.id
                    }
                },
                where: {
                    id: divisionId
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
            });
            await this.prismaConnection.division.update({
                data: {
                    officerIds: {
                        push: officer.id
                    }
                },
                where: {
                    id: divisionId
                }
            });
        }
            
    }
    async getOfficerEligibleProfiles(): Promise<Profile[]> {
        return this.prismaConnection.profile.findMany({
            where: {
                participant: {
                    is: {
                      divisions: {
                        some: {} // ensures there's at least one associated division
                      }
                    }
                  }
            }
        })
    }
    async getDirectorEligibleOfficersByDivision(divisionName: string): Promise<Officer[]> {
        return this.prismaConnection.officer.findMany({
            where: {
                divisions: {
                    some: {
                        deptName: {
                            equals: divisionName
                        }
                    }
                }
            }
        });
	};
}
