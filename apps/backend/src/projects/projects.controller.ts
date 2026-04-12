import { Request, Response } from "express";

import { ProjectCreateSchema, ProjectUpdateSchema } from '@receipts/shared-schemas/generated';
import { createProject, deleteProject, getProjects, updateProject } from './projects.service.js'
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

export async function getProjectsController(req: Request, res: Response) {
    const userId = req.user!.userId;
    const projects = await getProjects(userId);

    res.json(projects);
}

export async function deleteProjectController(req: ProjectRequest, res: Response) {
    const { projectId } = req.params;
    await deleteProject(projectId);

    res.json({ success: true });
}