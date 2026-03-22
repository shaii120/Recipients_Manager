import { prisma } from "../lib/prisma.js";
import { dbExecute } from "../lib/db.js";

export async function createReceiptService(data: any) {
  return dbExecute(() =>
    prisma.receipt.create({ data }));
}

export async function getReceiptsService() {
  return dbExecute(() =>
    prisma.receipt.findMany());
}
