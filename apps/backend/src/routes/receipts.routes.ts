import { Router } from "express";
import { createReceipt, getReceipts } from "../receipts/receipts.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router: Router = Router();

router.use(authMiddleware);

router.post("/", createReceipt);
router.get("/", getReceipts);

export default router;
