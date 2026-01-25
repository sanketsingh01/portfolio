import { type Projects } from "@/config/Projects";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { LinkIcon } from "../svgs/Link";
import { GithubIcon } from "../svgs/GitHub";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ProjectCardProps {
    project: Projects;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="flex flex-col sm:flex-row items-start overflow-hidden border border-black/8 dark:border-muted rounded-lg p-3 gap-3 shadow-sm bg-sky-50/50 dark:bg-white/3 transition-all duration-300 hover:shadow-md dark:hover:shadow-netural-900/50">
            <div className="overflow-hidden h-40 w-full sm:h-32 sm:w-80 rounded-md">
                <Image src={project.image} alt={project.name} width={200} height={200} className="object-cover w-full h-full rounded-md overflow-hidden transition-transform duration-300 hover:scale-105" />
            </div>
            <div className="flex flex-col h-40 sm:h-32 justify-between w-full py-1">
                <div className="flex flex-row justify-between w-full">
                    <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-lg font-semibold text-foreground">
                            {project.name}
                        </span>

                        {project.isCompleted === false && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-1 rounded-full border-yellow-300 bg-yellow-500/10 px-2 py-2 text-xs">
                                        <div className="size-2 animate-pulse rounded-full bg-yellow-500"></div>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>In progress</TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                    <div className="flex flex-row gap-2">
                        {project.liveLink && (
                            <Link href={project.liveLink} target="_blank" className="text-sm sm:text-xs flex flex-row items-center gap-1 py-1 px-2 text-neutral-500 bg-white/50 dark:text-white/50 dark:bg-white/2 rounded-xl border border-black/8 dark:border-muted hover:text-black dark:hover:text-white">
                                <LinkIcon size={14} /> Live
                            </Link>
                        )}

                        {project.gitHub && (
                            <Link href={project.gitHub} target="_blank" className="text-sm sm:text-xs flex flex-row items-center gap-1 py-1 px-2 text-neutral-500 bg-white/50 dark:text-white/50 dark:bg-white/2 rounded-xl border border-black/8 dark:border-muted hover:text-black dark:hover:text-white">
                                <GithubIcon size={14} /> GitHub
                            </Link>
                        )}
                    </div>
                </div>
                <div className="flex flex-row overflow-hidden">
                    <p className="text-xs text-muted-foreground leading-relaxed">{project.description}</p>
                </div>
                <div className="flex flex-row gap-1.5 text-sm">
                    {project.technologies.map((technology, index) => (
                        <Tooltip key={index}>
                            <TooltipTrigger>
                                <div className="size-6 transition-all duration-300 hover:scale-120 hover:cursor-pointer">
                                    {technology.icon}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{technology.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>
            </div>
        </div>
    )
}