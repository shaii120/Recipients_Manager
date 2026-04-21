import { prisma } from "prisma-my-db/connector";
import { dbExecute } from "../lib/db.js";
import { ReceiptCreate, ReceiptModel } from "@receipts/shared-schemas";

export async function createReceiptService(data: ReceiptCreate): Promise<ReceiptModel> {
  const dataInput = { ...data, vendor: data.vendor ?? null };
  return dbExecute(() =>
    prisma.receipt.create({ data: dataInput }));
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