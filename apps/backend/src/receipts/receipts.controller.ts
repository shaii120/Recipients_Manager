import { Request, Response } from "express";
import { createReceiptService, getReceiptsService } from "./receipts.service.js";
import { ReceiptCreateSchema } from "@receipts/shared-schemas";

export async function createReceipt(req: Request, res: Response) {
    try {
        const data = ReceiptCreateSchema.parse(req.body);
        const receipt = await createReceiptService(data);
        res.json(receipt);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export async function getReceipts(_req: Request, res: Response) {
    const receipts = await getReceiptsService();
    res.json(receipts);
}
