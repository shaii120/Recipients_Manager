'use client'

import { useEffect, useState } from 'react'
import { ProjectResult } from '@receipts/shared-schemas/generated'
import styles from './ProjectSidebar.module.css'
import { createProject, getProjects } from '@/lib/projects'
import { useProject } from '@/context/ProjectContext'

export function ProjectSidebar() {
    const [projects, setProjects] = useState<ProjectResult[]>([])
    const { selectedProjectId, setSelectedProjectId } = useProject()
    const [creating, setCreating] = useState(false)

    function handleCreateProject() {
        const name = prompt('Project name')

        if (!name) return

        setCreating(true)

        createProject(name)
            .then((newProject) => {
                setSelectedProjectId(newProject.id)
                return getProjects()
            })
            .then(setProjects)
            .catch(err => {
                console.error(err)
                alert('Failed to create project')
            })
            .finally(() => setCreating(false))
    }

    useEffect(() => {
        getProjects()
            .then(setProjects)
            .catch(err => {
                console.error(err)
                setProjects([])
            })
    }, [])

    return (
        <aside className={styles.sidebar}>
            <button
                onClick={handleCreateProject}
                className={styles.createButton}
            >
                <svg className={styles.createButtonIcon} viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12h14" />
                </svg>

                Add New Project
            </button>
            {projects.map(p => (
                <div
                    key={p.id}
                    onClick={() => setSelectedProjectId(p.id)}
                    className={`${styles.item} ${selectedProjectId === p.id ? styles.active : ''}`}
                >
                    {p.name}
                </div>
            ))}
        </aside>
    )
}