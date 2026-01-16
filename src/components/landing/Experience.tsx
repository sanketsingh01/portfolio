import React from "react";
import { type Experience, experiences } from "@/config/Experience";
import { Link } from "next-view-transitions";

import Container from "../common/Container";
import { ExperienceCard } from "../experience/ExperienceCard";
import { Button } from "../ui/button";

export default function Experience() {
    return (
        <Container className="mt-7 relative z-10 rounded-2xl border p-4 sm:p-8 md-6 pt-8 sm:pt-8 content-background border-black/8 dark:bg-white/2 dark:border-white/8 opacity-100 transform-none mx-auto max-w-3xl">
            <h1 className="font-space-grotesk text-base sm:text-lg font-semibold text-foreground">Experience</h1>
            <div className="mt-4 flex flex-col gap-8">
                {experiences.slice(0, 2).map((experience: Experience) => (
                    <ExperienceCard key={experience.company} experience={experience} />
                ))}
            </div>
            <div className="mt-8 flex justify-center">
                <Button variant="outline">
                    <Link href="/work-experience">Show all work experiences</Link>
                </Button>
            </div>
        </Container>
    );
}
