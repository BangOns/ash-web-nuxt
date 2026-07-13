import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Prevent multiple instances of Prisma Client in development due to hot reloading
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const dbUrl = process.env.DATABASE_URL || "file:./dev.db";

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url: dbUrl }),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
