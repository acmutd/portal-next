import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;

export const getPrismaConnection = () => {
  if (!prisma) prisma = new PrismaClient();
  return prisma;
};
