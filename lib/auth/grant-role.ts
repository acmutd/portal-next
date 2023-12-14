import { getPrismaConnection } from 'lib/prisma/manager';

async function getProfileByUserId(userId: string) {
  const prisma = getPrismaConnection();
  const profileObj = await prisma.profile.findFirst({
    where: {
      userId
    }
  });
  return profileObj;
}

const userAlreadyHaveOfficerRole = async (profileId: string) => {
  const prisma = getPrismaConnection();
  const officerObj = await prisma.officer.findFirst({
    where: {
      profileId
    }
  })
  return !!officerObj;
};

async function grantOfficerRole(userId: string) {
  const prisma = getPrismaConnection();
  const userProfile = await getProfileByUserId(userId);
  if (!userProfile) {
    return;
  }
  const alreadyHasRole = await userAlreadyHaveOfficerRole(userProfile.id);
  if (alreadyHasRole) {
    return;
  }
  await prisma.officer.create({
    data: {
      profileId: userProfile.id,
      divisionIds: []
    }
  });
}

export const grantRole = async (userId: string, roleName: string) => {
  if (roleName === "officer") {
    await grantOfficerRole(userId);
  }
};
