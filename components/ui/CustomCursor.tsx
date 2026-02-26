"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const HOVER_SELECTOR = "a, button, [role='button'], input, textarea, select";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    const moveCursor = useCallback(
        (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        },
        [cursorX, cursorY, isVisible]
    );

    useEffect(() => {
        // Detect touch device
        const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) {
            setIsTouch(true);
            return;
        }

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseenter", handleMouseEnter);
        window.addEventListener("mouseleave", handleMouseLeave);

        // Track hoverable elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Use closest to check if the target or any of its ancestors match the selector
            const isHoverable = target.closest(HOVER_SELECTOR);
            setIsHovering(!!isHoverable);
        };

        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseenter", handleMouseEnter);
            window.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [moveCursor]);

    if (isTouch) return null;

    return (
        <>
            {/* Dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 0 : 8,
                        height: isHovering ? 0 : 8,
                        opacity: isVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.15 }}
                    className="bg-acid"
                    style={{ borderRadius: 0 }}
                />
            </motion.div>

            {/* Ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 56 : 36,
                        height: isHovering ? 56 : 36,
                        opacity: isVisible ? 1 : 0,
                        borderWidth: isHovering ? 3 : 2,
                    }}
                    transition={{ duration: 0.2 }}
                    className="border-acid"
                    style={{ borderStyle: "solid", borderRadius: 0 }}
                />
            </motion.div>
        </>
    );
}
