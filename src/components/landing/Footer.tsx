import React from "react";

import Container from "../common/Container";

export default function Footer() {
    return (
        <Container className="mt-2 relative z-10 rounded-2xl p-6 sm:p-8 md-6 pt-14 sm:pt-12 bg-white/60 border-black/8 dark:bg-white/2 dark:border-white/8 opacity-100 transform-none mx-auto max-w-3xl flex justify-center">
            <div className="flex flex-col justify-center gap-1">
                <div className="flex gap-2 items-center">
                    <span className="text-xs sm:text-sm text-foreground">Designed and Developed by</span><p className="underline"> Sanket Singh</p>
                </div>
                <div className="flex gap-2 justify-center">
                    <span>&copy; {new Date().getFullYear()} All Rights Reserved</span>
                </div>
            </div>
        </Container>
    )
}