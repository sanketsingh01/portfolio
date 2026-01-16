"use client";

import React, { useRef } from "react";
import { Link } from "next-view-transitions";
import { motion, useMotionValue, useSpring } from "motion/react";

interface SkillProps {
    name: string;
    href: string;
    children: React.ReactNode;
}

export default function Skill({ name, href, children }: SkillProps) {
    const ref = useRef<HTMLAnchorElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, {
        stiffness: 300,
        damping: 15,
        mass: 0.4,
    });

    const springY = useSpring(y, {
        stiffness: 300,
        damping: 15,
        mass: 0.4,
    });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - (rect.left + rect.width / 2);
        const offsetY = e.clientY - (rect.top + rect.height / 2);

        x.set(offsetX * 0.4);
        y.set(offsetY * 0.4);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="inline-block"
        >
            <Link
                ref={ref}
                href={href}
                target="_blank"
                className="inline-flex items-center gap-1.5 rounded-xl border-2 border-dashed
        border-black/20 bg-black/5 px-2 py-1.5 text-sm font-medium text-black
        dark:border-white/20 dark:bg-white/5 dark:text-white
        cursor-pointer select-none"
            >
                <div className="size-4 shrink-0">{children}</div>
                <span>{name}</span>
            </Link>
        </motion.div>
    );
}
