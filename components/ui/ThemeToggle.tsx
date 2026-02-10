"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative w-9 h-9 border-[3px] border-cream/40 text-cream/60 flex items-center justify-center hover:bg-acid hover:text-ink hover:border-acid transition-all group"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
            <AnimatePresence mode="wait" initial={false}>
                {theme === "light" ? (
                    <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Moon size={14} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Sun size={14} />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
}
