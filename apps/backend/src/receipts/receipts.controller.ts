import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { createReceiptService, getReceiptsByProjectService } from "./receipts.service.js";
import { ReceiptCreateSchema } from "@receipts/shared-schemas";
import { ProjectRequest } from "../types/requests.js";

export async function createReceipt(req: Request, res: Response) {
    try {
        const data = ReceiptCreateSchema.parse(req.body);
        const receipt = await createReceiptService(data);
        res.json(receipt);
    } catch (err: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
}

export async function getReceiptsByProject(req: ProjectRequest, res: Response) {
    const projectId: string = req.params.projectId;
    const receipts = await getReceiptsByProjectService(projectId);
    res.json(receipts);
}
