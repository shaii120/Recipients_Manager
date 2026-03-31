import { Router } from "express";
import { createReceipt, getReceipts } from "../receipts/receipts.controller.js";
import { authMiddleware, projectAccessMiddleware } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.use(authMiddleware);

router.get("/:projectId", projectAccessMiddleware, getReceipts);
router.post("/", createReceipt);
router.get("/", getReceipts);

export default router;
