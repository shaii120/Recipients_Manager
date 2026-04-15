'use client'

import { createContext, useContext, useState } from 'react'

type ProjectContextType = {
    selectedProjectId: string | null
    setSelectedProjectId: (id: string | null) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

    return (
        <ProjectContext.Provider value={{ selectedProjectId, setSelectedProjectId }}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProject() {
    const ctx = useContext(ProjectContext)
    if (!ctx) throw new Error('useProject must be used within ProjectProvider')
    return ctx
}