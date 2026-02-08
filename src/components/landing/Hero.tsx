import React from "react";
import { HeroConfig } from "@/config/Hero";
import Image from "next/image";
import { Link } from "next-view-transitions";

import Container from "@/components/common/Container";
import CV from "../svgs/CV";
import SendIcon from "../svgs/SendIcon";
import { Button } from "../ui/button";

export default function Hero() {
    const { badge, socialsData } = HeroConfig;
    return (
        <Container className="relative z-10 rounded-2xl border p-6 sm:p-8 md-6 pt-14 sm:pt-12 bg-white/60 border-black/8 dark:bg-white/2 dark:border-white/8 opacity-100 transform-none mx-auto max-w-3xl">
            <div className="mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="font-space-grotesk text-xl sm:text-2xl font-semibold text-foreground">Sanket Singh</h1>
                    <Image
                        src={badge}
                        alt="badge"
                        width={24}
                        height={24}
                        className="h-6 w-6"
                    />
                </div>
                <div className="h-5 overflow-hidden">
                    <p className="sm:block text-muted-foreground text-sm">20 • Engineer • Developer • Builder</p>
                </div>
            </div>
            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-5 sm:mb-6">
                I like starting from a blank slate and turning it into a finished product. From frontend and backend to deployment, I focus on building software that's practical, usable, and reliable.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-6">
                <Button variant={'outline'} className="px-4 sm:px-5 py-3 sm:py-2.5 text-xs sm:text-xs font-medium transition-all duration-300 ease-in-out hover:scale-105">
                    <CV />
                    <Link href={`/`}>Resume / CV</Link>
                </Button>
                <Button variant={'default'} className="px-4 sm:px-5 py-3 sm:py-2.5 text-xs sm:text-xs font-medium main-button transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 dark:text-white">
                    <SendIcon />
                    <Link href={`/`}>Let's talk</Link>
                </Button>
            </div>
            <div className="mb-5 sm:mb-6">
                <p className="text-xs sm:text-sm mb-2 sm:mb-3">Me on <strong>Internet!</strong></p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {socialsData.map((social) => (
                        <a key={social.url} href={social.url} target="_blank">
                            <Button variant={"outline"} className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-sx sm:text-sm flex items-center transition-all duration-300 ease-in-out hover:shadow-lg">
                                {social.icon}
                                {social.name}
                            </Button>
                        </a>
                    ))}
                </div>
            </div>
            <div className="mb-5 sm:mb-6">
                <p className="text-xs sm:text-sm mb-2 sm:mb-3 text-foreground/60 ">Recently <strong>Listening</strong></p>
                <a href="https://open.spotify.com/track/1YgDGKyKhFlimPw3mLavPG" target="_blank" className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-colors bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10">
                    <img src={'https://i.scdn.co/image/ab67616d0000b2733e3bb917af94bd82074c5d47'} alt="song" width={14} height={14} className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg shrink-0">
                    </img>

                    <div className="flex flex-col min-w-0 gap-0.5">
                        <span className="text-sm sm:text-base font-medium text-foreground truncate">Gift</span>
                        <span className="text-sx sm:text-xs text-foreground/60 truncate">Cheema Y, Gur Sidhu</span>
                    </div>
                </a>
            </div>
        </Container>
    )
}