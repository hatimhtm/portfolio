"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { Smartphone, Bot, Shield, Terminal, Code2, Zap, ArrowUpRight, Github, Mail, ChevronDown, Quote, Star } from "lucide-react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

/* ─── Decorative SVGs ─── */
const CircuitPattern = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 20h40v40H20z" stroke="currentColor" strokeWidth="2" />
        <path d="M60 40h40" stroke="currentColor" strokeWidth="2" />
        <path d="M100 20h40v40h-40z" stroke="currentColor" strokeWidth="2" />
        <circle cx="100" cy="40" r="4" fill="currentColor" />
        <path d="M140 40h40" stroke="currentColor" strokeWidth="2" />
        <path d="M20 80h60" stroke="currentColor" strokeWidth="2" />
        <circle cx="80" cy="80" r="6" fill="currentColor" />
        <path d="M86 80h34" stroke="currentColor" strokeWidth="2" />
        <path d="M120 60v40" stroke="currentColor" strokeWidth="2" />
        <path d="M120 100h60" stroke="currentColor" strokeWidth="2" />
        <path d="M20 120h40v40H20z" stroke="currentColor" strokeWidth="2" />
        <circle cx="40" cy="140" r="6" fill="currentColor" />
        <path d="M60 140h80" stroke="currentColor" strokeWidth="2" />
        <path d="M140 120v40" stroke="currentColor" strokeWidth="2" />
        <path d="M140 160h40" stroke="currentColor" strokeWidth="2" />
        <circle cx="160" cy="160" r="4" fill="currentColor" />
        <path d="M160 160v20" stroke="currentColor" strokeWidth="2" />
    </svg>
);

const GridDots = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 10 }).map((_, row) =>
            Array.from({ length: 10 }).map((_, col) => (
                <circle key={`${row}-${col}`} cx={5 + col * 10} cy={5 + row * 10} r="1.5" opacity={0.3} />
            ))
        )}
    </svg>
);

const CrossHatch = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
                <line x1={0} y1={i * 15} x2={120} y2={i * 15} opacity="0.15" />
                <line x1={i * 15} y1={0} x2={i * 15} y2={120} opacity="0.15" />
            </g>
        ))}
        <rect x="30" y="30" width="60" height="60" strokeWidth="2" opacity="0.3" />
        <line x1="30" y1="30" x2="90" y2="90" opacity="0.2" />
        <line x1="90" y1="30" x2="30" y2="90" opacity="0.2" />
    </svg>
);

/* ─── Animated Counter Hook ─── */
function useCounter(end: number, duration: number = 2000, startCounting: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startCounting) return;
        let startTime: number | null = null;
        let animationFrame: number;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.floor(eased * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(step);
            }
        };

        animationFrame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, startCounting]);

    return count;
}

/* ─── Counter Component ─── */
function AnimatedStat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const count = useCounter(value, 2000, isInView);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="neo-card bg-ink text-cream p-4 md:p-6 text-center relative overflow-hidden neo-glow"
        >
            <GridDots className="absolute inset-0 w-full h-full text-cream/5" />
            <div className="relative z-10">
                <div className="font-heading font-bold text-3xl md:text-5xl text-acid">
                    {count}{suffix}
                </div>
                <div className="font-mono text-[0.6rem] md:text-xs font-bold uppercase tracking-widest mt-2 opacity-70">{label}</div>
            </div>
        </motion.div>
    );
}

/* ─── Stats Data ─── */
const stats = [
    { value: 5, suffix: "+", label: "Projects Shipped" },
    { value: 12, suffix: "H", label: "Avg. Turnaround" },
    { value: 3, suffix: "+", label: "Languages" },
    { value: 99, suffix: "%", label: "Uptime" },
];

/* ─── Testimonials Data ─── */
const testimonials = [
    {
        quote: "Hatim delivered our MVP in under 48 hours. The quality was production-grade from day one.",
        author: "Tech Startup Founder",
        role: "SaaS Platform",
        accent: "bg-electric",
    },
    {
        quote: "The speed and attention to detail is unmatched. Our AI integration was flawless.",
        author: "Product Lead",
        role: "AI Company",
        accent: "bg-hotpink",
    },
    {
        quote: "Working with Hatim feels like having a senior engineering team, packed into one person.",
        author: "CTO",
        role: "Fintech Startup",
        accent: "bg-vivid",
    },
];

/* ─── Tech Logos ─── */
const techLogos = ["React", "Next.js", "Python", "SwiftUI", "TypeScript", "Node.js", "PostgreSQL", "OpenAI", "Docker", "Tailwind", "FastAPI", "Redis"];

/* ─── Stagger Variants ─── */
const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Home() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div className="min-h-screen bg-cream overflow-hidden pb-24">

            {/* ══════════════════════════════════════
                TOP MARQUEE
               ══════════════════════════════════════ */}
            <div className="w-full bg-ink border-b-[3px] border-ink py-3 overflow-hidden">
                <div className="marquee-container font-heading font-bold text-xl md:text-3xl text-cream uppercase tracking-tight">
                    <div className="marquee-content animate-marquee">
                        <span className="px-4">SHIP FASTER&nbsp;///&nbsp;</span>
                        <span className="px-4">BUILD STRONGER&nbsp;///&nbsp;</span>
                        <span className="px-4">DEPLOY NOW&nbsp;///&nbsp;</span>
                        <span className="text-acid px-4">12H TURNAROUND&nbsp;///&nbsp;</span>
                        <span className="px-4">SHIP FASTER&nbsp;///&nbsp;</span>
                        <span className="px-4">BUILD STRONGER&nbsp;///&nbsp;</span>
                        <span className="px-4">DEPLOY NOW&nbsp;///&nbsp;</span>
                        <span className="text-acid px-4">12H TURNAROUND&nbsp;///&nbsp;</span>
                    </div>
                    <div className="marquee-content animate-marquee" aria-hidden="true">
                        <span className="px-4">SHIP FASTER&nbsp;///&nbsp;</span>
                        <span className="px-4">BUILD STRONGER&nbsp;///&nbsp;</span>
                        <span className="px-4">DEPLOY NOW&nbsp;///&nbsp;</span>
                        <span className="text-acid px-4">12H TURNAROUND&nbsp;///&nbsp;</span>
                        <span className="px-4">SHIP FASTER&nbsp;///&nbsp;</span>
                        <span className="px-4">BUILD STRONGER&nbsp;///&nbsp;</span>
                        <span className="px-4">DEPLOY NOW&nbsp;///&nbsp;</span>
                        <span className="text-acid px-4">12H TURNAROUND&nbsp;///&nbsp;</span>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════
                HERO SECTION (Parallax + Gradient Blobs)
               ══════════════════════════════════════ */}
            <section ref={heroRef} className="relative p-4 md:p-8 max-w-7xl mx-auto mt-8 md:mt-16 mb-6 md:mb-12 min-h-[50vh] md:min-h-[65vh] flex flex-col justify-center">
                {/* Animated gradient blobs */}
                <div className="absolute top-10 right-10 w-64 h-64 md:w-96 md:h-96 rounded-full bg-acid/10 blur-3xl animate-blob pointer-events-none" />
                <div className="absolute bottom-20 left-20 w-48 h-48 md:w-72 md:h-72 rounded-full bg-electric/8 blur-3xl animate-blob-delay pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 w-40 h-40 md:w-64 md:h-64 rounded-full bg-hotpink/5 blur-3xl animate-blob-delay-2 pointer-events-none" />

                {/* Decorative background dots */}
                <GridDots className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 text-ink opacity-20" />

                <motion.div style={{ y: heroY, opacity: heroOpacity }}>
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <div className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-ink/50 mb-4">
                                Portfolio / 2025
                            </div>
                            <h1 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase">
                                Hatim<br />
                                <span className="relative inline-block">
                                    El Hassak
                                    <span className="absolute -right-2 -top-2 md:-right-5 md:-top-5 w-5 h-5 md:w-8 md:h-8 bg-acid border-[3px] border-ink animate-spin-slow" />
                                </span>
                            </h1>
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <span className="inline-block bg-acid text-ink font-mono font-bold text-xs md:text-base px-3 md:px-4 py-2 border-[3px] border-ink shadow-neo animate-glow-pulse">
                                    FULL STACK ENGINEER
                                </span>
                                <span className="w-3 h-3 bg-neo-green border-2 border-ink animate-pulse-dot inline-block" />
                                <span className="font-mono text-xs font-bold uppercase tracking-wider opacity-60">Available for hire</span>
                            </div>
                        </motion.div>

                        {/* Status badge — desktop only */}
                        <motion.div
                            initial={{ opacity: 0, rotate: 6 }}
                            animate={{ opacity: 1, rotate: 2 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="neo-card bg-electric text-cream p-5 md:p-6 max-w-[260px] sticker hidden md:block relative overflow-hidden neo-glow-blue"
                        >
                            <CircuitPattern className="absolute inset-0 w-full h-full text-cream/10" />
                            <div className="relative z-10">
                                <p className="font-heading font-bold text-xl md:text-2xl leading-tight uppercase">
                                    Zero<br />Latency<br />Engineering.
                                </p>
                                <div className="flex gap-2 mt-4 items-center border-t-[3px] border-cream/30 pt-3">
                                    <div className="w-3 h-3 bg-acid border-2 border-cream animate-pulse-dot" />
                                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Online & Ready</span>
                                </div>
                            </div>
                        </motion.div>
                    </header>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-ink/30"
                >
                    <span className="font-mono text-[0.6rem] font-bold uppercase tracking-widest">Scroll</span>
                    <ChevronDown size={16} className="animate-bounce" />
                </motion.div>
            </section>

            {/* ══════════════════════════════════════
                STATS STRIP (Animated Counters)
               ══════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {stats.map((s) => (
                        <AnimatedStat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════
                ABOUT / BIO SECTION
               ══════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="grid md:grid-cols-5 gap-5">
                    {/* Photo card */}
                    <div className="md:col-span-2 neo-card bg-acid p-0 relative overflow-hidden min-h-[300px] md:min-h-[400px]">
                        <Image
                            src="/headshot.png"
                            alt="Hatim El Hassak"
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, 40vw"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent p-6">
                            <div className="font-mono text-xs font-bold text-cream/60 tracking-widest uppercase">Based in Morocco</div>
                        </div>
                        {/* Corner decoration */}
                        <div className="absolute top-3 right-3 w-8 h-8 border-[3px] border-ink bg-acid animate-spin-slow" />
                    </div>

                    {/* Bio card */}
                    <div className="md:col-span-3 neo-card bg-cream p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
                        <CrossHatch className="absolute top-0 right-0 w-32 h-32 text-ink" />
                        <div className="relative z-10">
                            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-3">About</div>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-6 leading-tight">
                                Engineering at<br />the speed of thought
                            </h2>
                            <p className="font-mono text-sm md:text-base font-bold text-ink/70 leading-relaxed mb-4">
                                I&apos;m a full-stack engineer who ships production-ready products in hours, not weeks.
                                From native iOS apps to AI-powered agents, I build systems that are fast, resilient, and designed to scale.
                            </p>
                            <p className="font-mono text-sm md:text-base font-bold text-ink/70 leading-relaxed">
                                My stack spans the full depth — SwiftUI on the front, Python and Node on the back,
                                LLMs and vector databases wherever intelligence is needed. I don&apos;t prototype. I ship.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t-[3px] border-ink/10 relative z-10">
                            <a href="https://github.com/hatimhtm" target="_blank" className="neo-pill bg-ink text-cream hover:bg-acid hover:text-ink flex items-center gap-2">
                                <Github size={14} /> GitHub
                            </a>
                            <a href="mailto:hatimelhassak.official@gmail.com" className="neo-pill bg-ink text-cream hover:bg-electric hover:text-cream flex items-center gap-2">
                                <Mail size={14} /> Email
                            </a>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ══════════════════════════════════════
                TECH LOGO MARQUEE
               ══════════════════════════════════════ */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
                <div className="border-[3px] border-ink bg-ink py-4 overflow-hidden">
                    <div className="marquee-container font-mono font-bold text-cream/40 uppercase tracking-[0.3em] text-xs md:text-sm">
                        <div className="marquee-content animate-marquee" style={{ animationDuration: "30s" }}>
                            {techLogos.map((logo) => (
                                <span key={logo} className="px-6 md:px-8 hover:text-acid transition-colors">{logo}&nbsp;•&nbsp;</span>
                            ))}
                        </div>
                        <div className="marquee-content animate-marquee" aria-hidden="true" style={{ animationDuration: "30s" }}>
                            {techLogos.map((logo) => (
                                <span key={`dup-${logo}`} className="px-6 md:px-8">{logo}&nbsp;•&nbsp;</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════
                BENTO GRID — PROJECTS
               ══════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-end justify-between mb-6"
                >
                    <div>
                        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">Featured</div>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink">Selected Work</h2>
                    </div>
                    <a href="/work" className="font-mono text-sm font-bold uppercase tracking-wider text-ink hover:text-electric transition-colors flex items-center gap-1 group">
                        View All <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </motion.div>

                <BentoGrid className="md:auto-rows-[18rem] gap-5">
                    {/* AG1 Dashboard */}
                    <BentoGridItem
                        index={0}
                        className="md:col-span-2 md:row-span-2"
                        title="AG1 Dashboard"
                        description="iOS 17 • SwiftUI • 60FPS Analytics"
                        bgColor="bg-electric"
                        textColor="text-cream"
                        icon={<Smartphone size={36} className="text-cream" />}
                        href="https://github.com/hatimhtm/AG1Dashboard"
                        header={
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-[8rem] md:text-[14rem] font-heading font-bold tracking-tighter text-cream/8 leading-none select-none">iOS</span>
                            </div>
                        }
                    />

                    {/* EchoScribe */}
                    <BentoGridItem
                        index={1}
                        className="md:col-span-1 md:row-span-2"
                        title="EchoScribe"
                        description="AI Agent • Python • OpenAI"
                        bgColor="bg-hotpink"
                        textColor="text-cream"
                        icon={<Bot size={36} className="text-cream" />}
                        href="https://github.com/hatimhtm/EchoScribe"
                        header={
                            <div className="h-full flex flex-col justify-center space-y-3 font-mono text-sm font-bold pl-3 border-l-[3px] border-cream/30 ml-4 mt-4">
                                <p className="text-cream/60">&gt; Audio Transcribed.</p>
                                <p className="text-cream/60">&gt; Summary Generated.</p>
                                <p className="text-cream/60">&gt; Sent to Slack.</p>
                                <p className="text-cream animate-blink">_</p>
                            </div>
                        }
                    />

                    {/* Fortress */}
                    <BentoGridItem
                        index={2}
                        className="md:col-span-1"
                        title="Fortress"
                        description="Security CLI • Python"
                        bgColor="bg-vivid"
                        textColor="text-cream"
                        icon={<Shield size={28} className="text-cream" />}
                        href="https://github.com/hatimhtm/Fortress"
                        header={
                            <div className="absolute inset-0 pointer-events-none">
                                <CircuitPattern className="w-full h-full text-cream/10" />
                            </div>
                        }
                    />

                    {/* The Arsenal Link */}
                    <BentoGridItem
                        index={3}
                        className="md:col-span-1"
                        title="The Arsenal"
                        description="My full tech stack"
                        bgColor="bg-acid"
                        textColor="text-ink"
                        icon={<Terminal size={28} className="text-ink" />}
                        href="/stack"
                        header={
                            <div className="absolute top-3 right-3 animate-spin-slow">
                                <Code2 size={40} className="opacity-10 text-ink" />
                            </div>
                        }
                    />

                    {/* System status filler */}
                    <BentoGridItem
                        index={4}
                        className="md:col-span-1"
                        title=""
                        description=""
                        bgColor="bg-ink"
                        header={
                            <div className="h-full w-full flex flex-col justify-between p-4">
                                <div className="font-mono text-[0.6rem] font-bold text-cream/30 text-right tracking-widest uppercase">SYS://882-991-X</div>
                                <div className="flex justify-between items-end h-16 w-full gap-[2px]">
                                    {[...Array(24)].map((_, i) => (
                                        <div key={i} className="bg-acid/50 w-[3px] transition-all duration-300" style={{ height: `${20 + Math.random() * 80}%` }} />
                                    ))}
                                </div>
                                <div className="font-heading font-bold text-base text-cream uppercase tracking-tight">System Normal</div>
                            </div>
                        }
                    />
                </BentoGrid>
            </section>

            {/* ══════════════════════════════════════
                PHILOSOPHY / APPROACH
               ══════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="neo-card bg-ink text-cream p-6 md:p-12 relative overflow-hidden gradient-top-accent">
                    <CircuitPattern className="absolute top-0 right-0 w-48 md:w-80 h-48 md:h-80 text-cream/5" />
                    <GridDots className="absolute bottom-0 left-0 w-40 h-40 text-cream/5" />
                    {/* Subtle gradient glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-electric/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-16">
                        <div>
                            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-cream/30 mb-3">Philosophy</div>
                            <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-cream leading-tight mb-6">
                                Speed is a<br /><span className="gradient-text-acid">Feature</span>
                            </h2>
                            <p className="font-mono text-sm font-bold text-cream/60 leading-relaxed mb-6">
                                Most teams spend weeks debating architecture while opportunities slip away.
                                I believe in shipping fast, learning from production, and iterating with real data.
                                Every hour of delay is a hour of lost insight.
                            </p>
                            <div className="flex items-center gap-3 p-4 border-[3px] border-cream/10">
                                <div className="w-3 h-3 bg-acid animate-pulse-dot flex-shrink-0" />
                                <span className="font-mono text-xs font-bold text-cream/40 uppercase tracking-wider">Currently shipping at full velocity</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[
                                { num: "01", title: "Brief", desc: "30-min call. I understand your vision, constraints, and timeline." },
                                { num: "02", title: "Build", desc: "Heads-down engineering. Real commits, not slide decks." },
                                { num: "03", title: "Ship", desc: "Production deployment. Real users, real feedback." },
                                { num: "04", title: "Scale", desc: "Optimize, iterate, and grow based on data." },
                            ].map((step, idx) => (
                                <motion.div
                                    key={step.num}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                                    className="flex gap-4 items-start group"
                                >
                                    <div className="font-heading font-bold text-2xl md:text-3xl text-acid w-12 flex-shrink-0 group-hover:translate-x-1 transition-transform">{step.num}</div>
                                    <div className="border-l-[3px] border-cream/10 pl-4 group-hover:border-acid/40 transition-colors">
                                        <div className="font-heading font-bold text-lg uppercase tracking-tight">{step.title}</div>
                                        <div className="font-mono text-xs font-bold text-cream/40 mt-1">{step.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ══════════════════════════════════════
                TESTIMONIALS / SOCIAL PROOF
               ══════════════════════════════════════ */}
            <motion.section
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">Reputation</div>
                <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink mb-8">What People Say</h2>

                <div className="grid md:grid-cols-3 gap-5">
                    {testimonials.map((t, i) => (
                        <motion.div key={i} variants={fadeUp}>
                            <div className="neo-card bg-cream p-6 md:p-8 h-full flex flex-col relative overflow-hidden neo-glow group">
                                {/* Accent corner */}
                                <div className={`absolute top-0 left-0 w-16 h-16 ${t.accent} opacity-[0.08] group-hover:opacity-[0.15] transition-opacity`} />
                                <div className="relative z-10 flex flex-col h-full">
                                    <Quote size={24} className="text-ink/10 mb-4 flex-shrink-0" />
                                    <p className="font-mono text-sm font-bold text-ink/70 leading-relaxed mb-6 flex-grow">
                                        &ldquo;{t.quote}&rdquo;
                                    </p>
                                    <div className="border-t-[3px] border-ink/10 pt-4">
                                        <div className="font-heading font-bold text-base uppercase tracking-tight">{t.author}</div>
                                        <div className="font-mono text-[0.65rem] font-bold text-ink/40 uppercase tracking-wider">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ══════════════════════════════════════
                SERVICES PREVIEW
               ══════════════════════════════════════ */}
            <motion.section
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">What I Do</div>
                <div className="flex items-end justify-between mb-6">
                    <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink">Services</h2>
                    <a href="/services" className="font-mono text-sm font-bold uppercase tracking-wider text-ink hover:text-vivid transition-colors flex items-center gap-1 group">
                        Details <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    <motion.div variants={fadeUp}>
                        <div className="neo-card bg-acid text-ink p-6 md:p-8 h-full relative overflow-hidden group gradient-top-accent neo-glow">
                            <CrossHatch className="absolute top-0 right-0 w-24 h-24 text-ink opacity-50" />
                            <div className="relative z-10">
                                <Zap size={32} className="mb-4" />
                                <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-3">Velocity Launch</h3>
                                <p className="font-mono text-sm font-bold opacity-70 leading-relaxed mb-4">
                                    Production-ready MVPs in 12 hours. Full-stack, deployed, and converting.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {["Web App", "iOS", "API", "DB"].map((t) => (
                                        <span key={t} className="px-2 py-1 border-2 border-ink/30 font-mono text-[0.6rem] font-bold uppercase">{t}</span>
                                    ))}
                                </div>
                                <a href="/services" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                                    Learn More <ArrowUpRight size={14} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeUp}>
                        <div className="neo-card bg-electric text-cream p-6 md:p-8 h-full relative overflow-hidden group gradient-top-accent neo-glow-blue">
                            <CircuitPattern className="absolute bottom-0 left-0 w-32 h-32 text-cream/10" />
                            <div className="relative z-10">
                                <Bot size={32} className="mb-4 text-acid" />
                                <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-3">AI Augmentation</h3>
                                <p className="font-mono text-sm font-bold opacity-70 leading-relaxed mb-4">
                                    LLM integration, custom agents, RAG pipelines. Intelligence built into every layer.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {["LLMs", "Agents", "RAG", "Fine-tune"].map((t) => (
                                        <span key={t} className="px-2 py-1 border-2 border-cream/30 font-mono text-[0.6rem] font-bold uppercase">{t}</span>
                                    ))}
                                </div>
                                <a href="/services" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                                    Learn More <ArrowUpRight size={14} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ══════════════════════════════════════
                CTA SECTION (Gradient Border)
               ══════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12"
            >
                <div className="neo-card bg-hotpink text-cream p-8 md:p-12 text-center relative overflow-hidden gradient-top-accent">
                    <GridDots className="absolute inset-0 w-full h-full text-cream/5" />
                    {/* Gradient glow */}
                    <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-acid/10 blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="font-heading font-bold text-3xl md:text-6xl uppercase tracking-tight mb-4">Ready to build?</h2>
                        <p className="font-mono text-sm md:text-base font-bold opacity-80 mb-4 max-w-xl mx-auto">
                            I&apos;m currently available for freelance projects, contract work, and exciting collaborations.
                        </p>
                        <div className="flex items-center justify-center gap-2 mb-8 text-cream/60">
                            <Star size={14} className="text-acid" />
                            <span className="font-mono text-xs font-bold uppercase tracking-wider">Average response time: &lt; 2 hours</span>
                            <Star size={14} className="text-acid" />
                        </div>
                        <a
                            href="/contact"
                            className="inline-block bg-cream text-ink font-heading font-bold text-lg uppercase tracking-wider px-8 py-4 border-[3px] border-ink shadow-neo hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all hover-shake"
                        >
                            Start a Project →
                        </a>
                    </div>
                </div>
            </motion.section>

            {/* ══════════════════════════════════════
                BOTTOM MARQUEE
               ══════════════════════════════════════ */}
            <div className="w-full bg-acid border-t-[3px] border-ink py-3 overflow-hidden">
                <div className="marquee-container font-mono font-bold text-ink uppercase tracking-widest text-sm">
                    <div className="marquee-content animate-marquee-reverse">
                        <span className="px-6">AVAILABLE FOR HIRE&nbsp;///&nbsp;</span>
                        <span className="px-6">OPEN FOR CONTRACT&nbsp;///&nbsp;</span>
                        <span className="px-6">REMOTE READY&nbsp;///&nbsp;</span>
                        <span className="px-6">AVAILABLE FOR HIRE&nbsp;///&nbsp;</span>
                        <span className="px-6">OPEN FOR CONTRACT&nbsp;///&nbsp;</span>
                        <span className="px-6">REMOTE READY&nbsp;///&nbsp;</span>
                    </div>
                    <div className="marquee-content animate-marquee-reverse" aria-hidden="true">
                        <span className="px-6">AVAILABLE FOR HIRE&nbsp;///&nbsp;</span>
                        <span className="px-6">OPEN FOR CONTRACT&nbsp;///&nbsp;</span>
                        <span className="px-6">REMOTE READY&nbsp;///&nbsp;</span>
                        <span className="px-6">AVAILABLE FOR HIRE&nbsp;///&nbsp;</span>
                        <span className="px-6">OPEN FOR CONTRACT&nbsp;///&nbsp;</span>
                        <span className="px-6">REMOTE READY&nbsp;///&nbsp;</span>
                    </div>
                </div>
            </div>

            {/* Easter egg */}
            {/* // lord_decay was here */}
        </div>
    );
}
