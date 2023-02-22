import { getPrismaConnection } from 'lib/prisma/manager';

const getRoleObjByName = async (roleName: string) => {
  const prisma = getPrismaConnection();
  const role = await prisma.role.findFirst({
    where: {
      roleName,
    },
  });
  if (role !== null) return role;
  const newRole = await prisma.role.create({
    data: {
      roleName,
    },
  });
  return newRole;
};

const userAlreadyHaveRole = async (userId: string, roleId: string) => {
  const prisma = getPrismaConnection();
  const roleObj = await prisma.rolesOnUser.findFirst({
    where: {
      roleId,
      userId,
    },
  });
  return !!roleObj;
};

export const grantRole = async (userId: string, roleName: string) => {
  const prisma = getPrismaConnection();
  const role = await getRoleObjByName(roleName);

  const alreadyHasRole = await userAlreadyHaveRole(userId, role.id);
  if (alreadyHasRole) {
    return;
  }

  const roleUser = await prisma.rolesOnUser.create({
    data: {
      roleId: role.id,
      userId: userId,
    },
  });
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      roles: {
        connect: {
          id: roleUser.id,
        },
      },
    },
  });
};
