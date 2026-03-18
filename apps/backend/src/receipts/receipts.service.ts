import { prisma } from "../lib/prisma.js";

export async function createReceiptService(data: any) {
  return prisma.receipt.create({ data });
}

export async function getReceiptsService() {
  return prisma.receipt.findMany();
}
