import { Router } from "express";

import { createProjectController, deleteProjectController, getProjectsController, updateProjectController } from "../projects/projects.controller.js";
import { authMiddleware, projectAccessMiddleware } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.use(authMiddleware);

router.get("/", getProjectsController);
router.post("/", createProjectController);
router.put("/:projectId", projectAccessMiddleware, updateProjectController);
router.delete("/:projectId", projectAccessMiddleware, deleteProjectController);

export default router;