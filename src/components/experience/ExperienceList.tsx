import React from "react";
import { type Experience } from "@/config/Experience";

import { ExperienceCard } from "./ExperienceCard";

interface ExperienceListProps {
    experiences: Experience[];
}

export function ExperienceList({ experiences }: ExperienceListProps) {
    if (experiences.length === 0) {
        return (
            <div className="flex flex-col gap-8">
                <p className="text-muted-foreground text-sm">No experience found.</p>
            </div>
        )
    }


    return (
        <div className="flex flex-col gap-8">
            {experiences.map((experience) => (
                <ExperienceCard key={experience.company} experience={experience} />
            ))}
        </div>
    );
}