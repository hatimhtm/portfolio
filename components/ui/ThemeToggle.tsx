"use client";

import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative px-2.5 md:px-3 py-1.5 border-[2px] md:border-[3px] border-cream/30 text-cream/60 font-mono text-[0.6rem] md:text-xs font-bold uppercase tracking-wider hover:bg-acid hover:text-ink hover:border-acid transition-all flex items-center gap-1.5"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
            <motion.span
                key={theme}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-sm leading-none"
            >
                {theme === "light" ? "☾" : "☀"}
            </motion.span>
            <span className="hidden md:inline">
                {theme === "light" ? "Dark" : "Light"}
            </span>
        </button>
    );
}
