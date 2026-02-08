"use client";

import { Link } from "next-view-transitions";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { ThemeToggleButton } from "@/components/common/ThemeSwitch";
import { cn } from "@/lib/utils";
import Logo from "@/components/svgs/Logo";

const navLinks = [
  { href: "/blogs", label: "Blogs" },
  { href: "/projects", label: "Projects" },
  { href: "/work-experience", label: "Experience" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <motion.nav className="w-full pt-3 px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-4 px-4 sm:px-10">
          <div className="pointer-events-auto px-2 sm:px-4 py-2 rounded-full transition-colors duration-300">
            <Link
              href="/"
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={closeMenu}
            >
              <Logo />
            </Link>
          </div>

          {/* Desktop: links + theme */}
          <div className="hidden md:flex items-center gap-4 sm:gap-4">
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

          {/* Mobile: hamburger + theme */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggleButton
              className="rounded-lg border border-border/50 bg-background/80 text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-white/10 dark:hover:bg-white/20 shrink-0"
              blur={false}
            />
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background/80 text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-white/10 dark:hover:bg-white/20"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <div className="flex h-5 w-5 flex-col items-center justify-center gap-1.5">
                <motion.span
                  className="absolute h-0.5 w-5 rounded-full bg-current"
                  animate={{
                    rotate: menuOpen ? 45 : 0,
                    y: menuOpen ? 0 : -4,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
                <motion.span
                  className="absolute h-0.5 w-5 rounded-full bg-current"
                  animate={{
                    opacity: menuOpen ? 0 : 1,
                    scaleX: menuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.15 }}
                />
                <motion.span
                  className="absolute h-0.5 w-5 rounded-full bg-current"
                  animate={{
                    rotate: menuOpen ? -45 : 0,
                    y: menuOpen ? 0 : 4,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="md:hidden overflow-hidden"
            >
              <motion.div
                initial={{ y: -8 }}
                animate={{ y: 0 }}
                exit={{ y: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                className="flex flex-col gap-1 pb-4 pt-2 px-2"
              >
                {navLinks.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ delay: 0.03 * i, duration: 0.2 }}
                  >
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className={cn(
                        "block rounded-lg px-4 py-3 text-base font-medium text-foreground/90",
                        "hover:bg-accent hover:text-accent-foreground transition-colors"
                      )}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
