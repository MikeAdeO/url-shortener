import { APP } from '../config/env.config';
import { PrismaClient } from '../generated/prisma';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], 
  });

if (APP.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
