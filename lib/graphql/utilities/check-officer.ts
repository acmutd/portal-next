import { getPrismaConnection } from 'lib/prisma/manager';

export const checkIfUserIsOfficer = async (userId: string) => {
  const prisma = getPrismaConnection();
  const isOfficer = await prisma.officer.findFirst({
    where: {
      profile: {
        userId
      }
    }
  });
  return !!isOfficer;
};
