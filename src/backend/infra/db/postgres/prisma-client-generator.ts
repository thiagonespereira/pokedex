import { PrismaClient } from "@prisma/client";

export const getClient = (): PrismaClient => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL || "",
      },
    },
  });
};
