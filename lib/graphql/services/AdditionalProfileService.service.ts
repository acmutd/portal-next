import { PrismaClient } from "@prisma/client";
import { getPrismaConnection } from "lib/prisma/manager";
import { singleton } from "tsyringe";
import { TypeformSubmission } from '@generated/type-graphql';

@singleton()
export default class AdditionalProfileService {
  private prismaConnection: PrismaClient;
  constructor() {
    this.prismaConnection = getPrismaConnection();
  }
  async getTypeformSubmissionsByProfileEmail(profileEmail: string): Promise<TypeformSubmission[]> {
    return this.prismaConnection.typeformSubmission.findMany({
      where: {
        email: {
          equals: profileEmail
        }
      }
    });
  }
}