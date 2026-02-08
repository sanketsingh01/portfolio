"use client";

import { Link } from "next-view-transitions";
import { motion } from "motion/react";

import { ThemeToggleButton } from "@/components/common/ThemeSwitch";
import { cn } from "@/lib/utils";
import Logo from "@/components/svgs/Logo";

const navLinks = [
  { href: "/blogs", label: "Blogs" },
  { href: "/projects", label: "Projects" },
  { href: "/work-experience", label: "Experience" },
];

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-transparent">
      <motion.nav className="w-full pt-3 px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-4 px-10">

          <div className="pointer-events-auto px-4 py-2 rounded-full transition-colors duration-300">
            <Link href="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
              <Logo />
            </Link>
          </div>

          <div className="flex items-center gap-4 sm:gap-4">
            <div className="flex items-center gap-3.5 sm:gap-3.5">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "text-sm font-medium text-foreground/80 transition-colors hover:text-foreground",
                    "underline-offset-4 hover:underline"
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
            <ThemeToggleButton
              className="rounded-lg border border-border/50 bg-background/80 text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-white/10 dark:hover:bg-white/20"
              blur={false}
            />
          </div>

        </div>
      </motion.nav>
    </header>
  );
}
