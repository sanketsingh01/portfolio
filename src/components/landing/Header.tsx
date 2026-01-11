import { headerConfig } from "@/config/Header";
import Image from "next/image";
import React from "react";

import Container from "../common/Container";
import { ThemeToggleButton } from "../common/ThemeSwitch";
import { Button } from "../ui/button";

export default function Header() {
    const { avatar, banner } = headerConfig
    return (
        <Container className="mx-auto max-w-3xl">
            <div className="relative mb-6 opacity-100 transform-none">
                <div className="relative overflow-hidden rounded-2xl min-h-32 sm:h-40 ">
                    <Image
                        src={banner}
                        alt="banner"
                        width={1000}
                        height={1000}
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute top-3 right-3 p-2">
                        <ThemeToggleButton blur />
                    </div>
                </div>

                <div className="absolute -bottom-12 left-6 sm:left-8">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 shadow-xl border-white bg-white">
                        <Image
                            src={avatar}
                            alt="avatar"
                            width={1000}
                            height={1000}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </Container>
    )
}