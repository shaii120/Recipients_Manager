import { Router } from "express";
import { createReceipt, getReceiptsByProject } from "../receipts/receipts.controller.js";
import { authMiddleware, projectAccessMiddleware } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.use(authMiddleware);

router.get("/:projectId", projectAccessMiddleware, getReceiptsByProject);
router.post("/", createReceipt);

export default router;
