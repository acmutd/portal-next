import { PrismaClient } from "@prisma/client";
import { getPrismaConnection } from "lib/prisma/manager";
import { singleton } from "tsyringe";
import { Application } from '@generated/type-graphql';

@singleton()
export default class ApplicationService {
    private prismaConnection: PrismaClient;
    constructor() {
        this.prismaConnection = getPrismaConnection();
    }

    async getOpenApplications() : Promise<Application[]> {
        return this.prismaConnection.application.findMany({
            where: {
                expireDate: {
                    gt: new Date()
                }
            }
        });
    }
}