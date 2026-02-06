"use client";

import { skillsConfig, SkillItem } from "@/config/Skills";
import Skill from "../common/Skill";

import Container from "../common/Container";

export default function Skills() {
    return (
        <Container className="mt-7 relative z-10 rounded-2xl border p-4 sm:p-8 md-6 pt-8 sm:pt-8 bg-white/60 border-black/8 dark:bg-white/2 dark:border-white/8 opacity-100 transform-none mx-auto max-w-3xl">
            <h1 className="font-space-grotesk text-lg sm:text-xl font-semibold text-foreground">My Skills & Technologies</h1>
            <div className="mt-6 flex flex-wrap gap-1.5 sm:gap-2 items-center">
                {skillsConfig.map((skill: SkillItem) => (
                    <Skill key={skill.name} name={skill.name} href="#">
                        {skill.icon}
                    </Skill>
                ))}
            </div>
        </Container>
    )
}