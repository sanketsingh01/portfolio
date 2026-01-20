import { type Experience } from "@/config/Experience";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import Image from "next/image";

import Skill from "../common/Skill";
import { GithubIcon } from "../svgs/GitHub";
import { LinkedinIcon } from "../svgs/Linkdedin";
import { DribbbleIcon } from "../svgs/Dribble";
import { TwitterIcon } from "../svgs/Twitter";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "../ui/accordion";

interface ExperienceCardProps {
    experience: Experience;
}

const parseDescription = (text: string): string => {
    return text.replace(/\*(.*?)\*/g, "<b>$1</b>");
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
    return (
        <Accordion
            type="single"
            collapsible
            className="flex flex-col border rounded-xl p-3 pt-0 pb-0 cursor-pointer bg-white/50 dark:bg-white/3 hover:border-black/16 dark:hover:border-white/16 tranition-all duration-300 ease-in-out"
            defaultValue="Alter Dimensions Innovations"
        >
            <div className="flex flex-col gap-4">
                <AccordionItem value={experience.company}>
                    <AccordionTrigger>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full cursor-pointer">

                            {/* Left Side */}
                            <div className="flex items-center gap-4 flex-1">
                                <Image
                                    src={experience.image}
                                    alt={experience.company}
                                    width={100}
                                    height={100}
                                    className="size-12 sm:size-12 rounded-md"
                                />

                                <div className="flex flex-col overflow-hidden">
                                    <div className="flex items-center gap-2 flex-wrap sm:gap-1 truncate text-foreground">
                                        <h3
                                            className={cn(
                                                'text-base lg:text-base font-bold text-foreground truncate',
                                                experience.isBlur ? 'blur-[5px]' : 'blur-none',
                                            )}
                                        >
                                            {experience.company}
                                        </h3>

                                        {experience.website && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={experience.website} target="_blank" className="text-neutral-500">
                                                        <DribbbleIcon />
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>Visit Website</TooltipContent>
                                            </Tooltip>
                                        )}
                                        {experience.linkedin && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={experience.linkedin} target="_blank" className="text-neutral-500">
                                                        <LinkedinIcon />
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>Visit LinkedIn</TooltipContent>
                                            </Tooltip>
                                        )}

                                        {experience.isCurrent && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="flex items-center gap-1 rounded-full border-green-300 bg-green-500/10 px-2 py-2 text-xs">
                                                        <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>Working</TooltipContent>
                                            </Tooltip>
                                        )}
                                    </div>

                                    <p className="dark:text-foreground/60">{experience.position}</p>
                                </div>
                            </div>

                            {/* Right Side */}
                            <div className="text-secondary text-left md:text-right shrink-0">
                                <p>
                                    {experience.startDate} - {experience.isCurrent ? 'Present' : experience.endDate}
                                </p>
                                <p>{experience.location}</p>
                            </div>

                        </div>
                    </AccordionTrigger>


                    <AccordionContent>
                        {/* Technologies */}
                        <div>
                            <h4 className="text-md mt-4 mb-2 font-semibold">Technologies</h4>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {experience.technologies.map((technology, techIndex: number) => (
                                    <Skill
                                        key={techIndex}
                                        name={technology.name}
                                        href={technology.href}
                                    >
                                        {technology.icon}
                                    </Skill>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="text-secondary flex flex-col gap-1.5">
                            {experience.description.map(
                                (description: string, descIndex: number) => (
                                    <p
                                        key={descIndex}
                                        dangerouslySetInnerHTML={{
                                            __html: `• ${parseDescription(description)}`,
                                        }}
                                    />
                                ),
                            )}
                        </div></AccordionContent>
                </AccordionItem>
            </div>
        </Accordion>
    );
}