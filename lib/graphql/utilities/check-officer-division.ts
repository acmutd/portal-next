import { getPrismaConnection } from "lib/prisma/manager";

export const checkOfficerMatchesDivision = async(userId: string, divisionId: string) => {
    const prisma = getPrismaConnection();
    const isOfficer = await prisma.officer.findFirst({
        where: {
            profile: {
                user: {
                    id: {
                        equals: userId
                    }
                }
            },
            divisionIds: {
                has: divisionId
            }
        }
    });
    return !!isOfficer;
}