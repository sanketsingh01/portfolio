"use client";

import React from "react";
import Image from "next/image";
import { HeroConfig } from "@/config/Hero";

import Container from "../common/Container";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function Contact() {
    const { socialsData } = HeroConfig;

    return (
        <Container className="mt-7 relative z-10 rounded-2xl border p-6 sm:p-8 md-6 pt-14 sm:pt-12 bg-white/60 border-black/8 dark:bg-white/2 dark:border-white/8 opacity-100 transform-none mx-auto max-w-3xl">
            <div className="flex flex-col items-center justify-center text-center py-8 sm:py-12">
                <p className="font-space-grotesk text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-6 sm:mb-8">
                    Let&apos;s build something extraordinary together
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                    {socialsData.map((social) => {
                        const previewImage = "previewImage" in social ? social.previewImage : null;
                        const emailDisplay = "emailDisplay" in social ? social.emailDisplay : null;

                        return (
                            <Tooltip key={social.url} delayDuration={200}>
                                <TooltipTrigger asChild>
                                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                                        <Button
                                            variant="outline"
                                            className="group px-4 sm:px-5 py-2.5 sm:py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 border-border/80 hover:border-foreground/30"
                                        >
                                            <span className="transition-transform duration-300 group-hover:scale-110">
                                                {social.icon}
                                            </span>
                                            {social.name}
                                        </Button>
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="top"
                                    sideOffset={12}
                                    hideArrow
                                    className="rounded-xl overflow-hidden border border-border/50 bg-card shadow-xl p-0 w-auto max-w-[280px] text-foreground"
                                >
                                    {previewImage ? (
                                        <div className="relative">
                                            <Image
                                                src={previewImage}
                                                alt={`${social.name} preview`}
                                                width={280}
                                                height={160}
                                                className="object-cover w-full h-auto rounded-xl"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                                                <span className="text-xs font-medium text-white drop-shadow-sm">
                                                    {social.name}
                                                </span>
                                            </div>
                                        </div>
                                    ) : emailDisplay ? (
                                        <div className="px-4 py-3 flex items-center gap-2 min-w-[200px]">
                                            <span className="text-muted-foreground text-xs">Email</span>
                                            <span className="text-sm font-medium text-foreground truncate" title={emailDisplay}>
                                                {emailDisplay}
                                            </span>
                                        </div>
                                    ) : null}
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
            </div>
        </Container>
    );
}
