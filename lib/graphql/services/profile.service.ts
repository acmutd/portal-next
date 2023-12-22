import { PrismaClient } from ".prisma/client";
import { getPrismaConnection } from "lib/prisma/manager";
import { singleton } from "tsyringe";

@singleton()
export default class ProfileService {
    private prismaConnection: PrismaClient;
    constructor() {
        this.prismaConnection = getPrismaConnection();
    }
}