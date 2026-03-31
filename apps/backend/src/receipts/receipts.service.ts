import { prisma } from "../lib/prisma.js";
import { dbExecute } from "../lib/db.js";
import { ReceiptCreate, ReceiptModel } from "@receipts/shared-schemas/generated";

export async function createReceiptService(data: ReceiptCreate): Promise<ReceiptModel> {
  return dbExecute(() =>
    prisma.receipt.create({ data }));
}

export async function getReceiptsService(): Promise<ReceiptModel[]> {
  return dbExecute(() =>
    prisma.receipt.findMany());
}

export async function getReceiptsByProjectService(projectId: string): Promise<ReceiptModel[]> {
  return dbExecute(() =>
    prisma.receipt.findMany({
      where: {
        projectId: projectId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  );
}