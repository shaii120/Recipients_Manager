import { apiFetch } from "./api.js"
import { type ReceiptModel } from "@receipts/shared-schemas";

export function getReceipts(router?: any) {
    return apiFetch<ReceiptModel[]>(`/api/receipts`, router);
}