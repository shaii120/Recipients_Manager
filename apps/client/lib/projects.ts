import { ProjectUpdate, ProjectCreate } from '@receipts/shared-schemas/generated';
import type { ProjectModel, ProjectResult } from '@receipts/shared-schemas/generated';
import { apiFetch } from './api';

export function getProjects() {
    return apiFetch<ProjectResult[]>('/api/projects')
}

export function createProject(name: string) {
    const project: ProjectCreate = {
        name: name,
        receiptsId: [],
        usersId: []
    }
    return apiFetch<ProjectResult>('/api/projects', {
        method: 'POST',
        body: JSON.stringify(project),
        headers: { 'Content-Type': 'application/json' },
    })
}

export function updateProject(id: string, updatedProject: ProjectUpdate) {
    return apiFetch<ProjectResult>(`/api/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedProject),
        headers: { 'Content-Type': 'application/json' },
    })
}

export function deleteProject(id: string) {
    return apiFetch<ProjectResult>(`/api/projects/${id}`, {
        method: 'DELETE',
    })
}