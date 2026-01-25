import React from "react";
import { type Projects } from "@/config/Projects";

import { ProjectCard } from "./ProjectCard";

interface projectgridProps {
    projects: Projects[];
}

export function projectGrid({ projects }: projectgridProps) {
    if (projects.length === 0) {
        return (
            <div className="flex flex-col gap-8">
                <p className="text-muted-foreground text-sm">No experience found.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-grid gap-4">
            {projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
            ))}
        </div>
    )
}