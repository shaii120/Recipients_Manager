import { apiFetch } from "./api"
import type { ReceiptModel, ReceiptCreate, ReceiptUpdate, ReceiptResult } from "@receipts/shared-schemas/generated";

export function getReceipts(projectId: string, router?: any) {
    return apiFetch<ReceiptResult[]>(`/api/receipts/${projectId}`, undefined, router);
}

export function createReceipt(data: ReceiptCreate) {
    return apiFetch<ReceiptResult>(`/api/receipts`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
}