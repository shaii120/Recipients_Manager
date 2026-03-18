import { PrismaClient } from "@prisma/client";
import { PrismaMssql } from "@prisma/adapter-mssql";

const adapter = new PrismaMssql(process.env.DATABASE_URL);

// Single shared Prisma instance
export const prisma = new PrismaClient({ adapter });
