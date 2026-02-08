import React from "react";

import Container from "@/components/common/Container";
import { quote } from "@/config/Quote";

export default function Quote() {
    return (
        <Container className="mt-12 relative z-10 rounded-2xl bg-white/60 border-black/8 dark:bg-white/2 dark:border-white/8 opacity-100 transform-none mx-auto max-w-3xl overflow-hidden">
            <div className="relative w-full py-16 md:py-24 flex flex-col items-center justify-center overflow-hidden">
                <div className="quote-video absolute inset-0 w-full h-full z-0 pointer-events-none">
                    <video autoPlay loop playsInline muted className="w-full h-full object-cover opacity-60 md:opacity-60 dark:opacity-40 dark:md:opacity-40 grayscale">
                        <source src={quote.url} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-linear-to-t from-[#FDFCF8] via-[#FDFCF8]/80 to-[#FDFCF8] dark:from-[#09090b] dark:via-[#09090b]/80 dark:to-[#09090b] opacity-30 md:opacity-30">
                    </div>
                </div>
                <div className="relative z-10 max-w-4xl px-6 pt-6 text-center">
                    <p className="font-space-grotesk italic text-[22px] md:text-3xl text-black dark:text-white leading-tight tracking-tight">
                        "{quote.quote.slice(0, 41)} <br />
                        {quote.quote.slice(41, quote.quote.length)}"
                    </p>
                </div>
                <div className="mt-8">
                    <span className="font-instrument italic text-lg text-black dark:text-zinc-200 tracking-wide">
                        - {quote.author}
                    </span>
                </div>
            </div>
        </Container>
    )
}