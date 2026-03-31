import { Request, Response } from "express";

import { ProjectCreateSchema, ProjectUpdateSchema } from '@receipts/shared-schemas/generated';
import { createProject, updateProject } from './projects.service.js'
import { ProjectRequest } from '../types/requests.js';

export async function createProjectController(req: Request, res: Response) {
    const userId = req.user!.userId;
    const parsed = ProjectCreateSchema.parse(req.body);
    const project = await createProject(userId, parsed);

    res.json(project);
}

export async function updateProjectController(req: ProjectRequest, res: Response) {
    const { projectId } = req.params;
    const parsed = ProjectUpdateSchema.parse(req.body);
    await updateProject(projectId, parsed);

    res.json({ success: true });
}