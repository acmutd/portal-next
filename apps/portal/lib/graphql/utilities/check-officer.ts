import { getPrismaConnection } from 'lib/prisma/manager';

export const checkIfUserIsOfficer = async (userId: string) => {
  const prisma = getPrismaConnection();

  const isOfficer =
    (
      await prisma.rolesOnUser.findMany({
        where: {
          role: {
            roleName: 'officer',
          },
          userId,
        },
      })
    ).length !== 0;
  return isOfficer;
};
