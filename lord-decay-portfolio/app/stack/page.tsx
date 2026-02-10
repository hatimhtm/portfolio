"use client";

import { motion, useInView } from "framer-motion";
import { Code2, Server, Smartphone, Brain, Cloud, Cpu, ArrowUpRight, Sparkles, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

/* ─── SVGs ─── */
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

/* ─── Animated Progress Bar ─── */
function ProgressBar({ value, color = "bg-acid" }: { value: number; color?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-30px" });

    return (
        <div ref={ref} className="h-1.5 bg-ink/10 w-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${value}%` } : { width: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`h-full ${color}`}
            />
        </div>
    );
}

/* ─── Tech Data ─── */
const categories = [
    {
        title: "Frontend",
        icon: Code2,
        color: "bg-electric",
        textColor: "text-cream",
        accentColor: "bg-electric",
        desc: "Pixel-perfect interfaces with blazing performance",
        tools: [
            { name: "React / Next.js", exp: "3+ years", level: 95 },
            { name: "TypeScript", exp: "3+ years", level: 90 },
            { name: "Tailwind CSS", exp: "2+ years", level: 92 },
            { name: "Framer Motion", exp: "2+ years", level: 85 },
            { name: "HTML/CSS", exp: "5+ years", level: 98 },
        ],
    },
    {
        title: "Backend",
        icon: Server,
        color: "bg-vivid",
        textColor: "text-cream",
        accentColor: "bg-vivid",
        desc: "Scalable APIs and resilient server architectures",
        tools: [
            { name: "Node.js", exp: "3+ years", level: 90 },
            { name: "Python / FastAPI", exp: "3+ years", level: 92 },
            { name: "PostgreSQL", exp: "2+ years", level: 85 },
            { name: "Redis", exp: "2+ years", level: 80 },
            { name: "Supabase", exp: "2+ years", level: 88 },
        ],
    },
    {
        title: "Mobile",
        icon: Smartphone,
        color: "bg-hotpink",
        textColor: "text-cream",
        accentColor: "bg-hotpink",
        desc: "Native iOS experiences with SwiftUI & UIKit",
        tools: [
            { name: "SwiftUI", exp: "2+ years", level: 88 },
            { name: "UIKit", exp: "2+ years", level: 82 },
            { name: "CoreData", exp: "1+ year", level: 75 },
            { name: "HealthKit", exp: "1+ year", level: 78 },
        ],
    },
    {
        title: "AI / ML",
        icon: Brain,
        color: "bg-acid",
        textColor: "text-ink",
        accentColor: "bg-acid",
        desc: "LLM integration, agents, and RAG pipelines",
        tools: [
            { name: "OpenAI / GPT-4", exp: "2+ years", level: 92 },
            { name: "LangChain", exp: "1+ year", level: 85 },
            { name: "ChromaDB / Pinecone", exp: "1+ year", level: 80 },
            { name: "Whisper / TTS", exp: "1+ year", level: 78 },
        ],
    },
    {
        title: "DevOps",
        icon: Cloud,
        color: "bg-ink",
        textColor: "text-cream",
        accentColor: "bg-ink",
        desc: "CI/CD, containers, and cloud infrastructure",
        tools: [
            { name: "Docker", exp: "2+ years", level: 85 },
            { name: "Vercel", exp: "3+ years", level: 92 },
            { name: "GitHub Actions", exp: "2+ years", level: 88 },
            { name: "AWS / GCP", exp: "1+ year", level: 75 },
        ],
    },
];

const learningNow = [
    { name: "Rust", reason: "Systems-level performance for backend services" },
    { name: "Go", reason: "High-concurrency microservices and CLIs" },
    { name: "WebAssembly", reason: "Near-native performance in the browser" },
    { name: "Three.js", reason: "3D web experiences and interactive data viz" },
];

/* ─── Stagger ─── */
const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function StackPage() {
    return (
        <div className="min-h-screen bg-cream pb-24">

            {/* Status bar */}
            <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                    <span className="font-mono text-xs font-bold text-cream/50 uppercase tracking-widest">system://arsenal</span>
                </div>
                <span className="font-mono text-xs font-bold text-cream/30 tracking-widest">{categories.length} MODULES</span>
            </div>

            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16 mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-3">Technology</div>
                    <h1 className="text-4xl sm:text-6xl md:text-[7rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase mb-6">
                        The<br />Arsenal
                    </h1>
                    <p className="font-mono text-sm md:text-base font-bold text-ink/60 max-w-lg leading-relaxed">
                        A carefully curated full-stack toolkit optimized for shipping fast and scaling hard.
                        Every tool chosen for production reliability and developer velocity.
                    </p>
                </motion.div>
            </section>

            {/* ══════════════════════════════════════
                STATS ROW
               ══════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 md:mb-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { value: "20+", label: "Technologies" },
                        { value: "5+", label: "Languages" },
                        { value: "Full", label: "Stack Coverage" },
                        { value: "3+", label: "Years Experience" },
                    ].map((s) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="neo-card bg-ink text-cream p-4 text-center neo-glow"
                        >
                            <div className="font-heading font-bold text-2xl md:text-3xl text-acid">{s.value}</div>
                            <div className="font-mono text-[0.6rem] font-bold uppercase tracking-widest mt-1 opacity-50">{s.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════
                CATEGORY CARDS (with progress bars)
               ══════════════════════════════════════ */}
            <motion.section
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20 space-y-5"
            >
                {categories.map((cat, catIdx) => {
                    const Icon = cat.icon;
                    return (
                        <motion.div key={cat.title} variants={fadeUp}>
                            <div className={`neo-card ${cat.color} ${cat.textColor} p-6 md:p-8 relative overflow-hidden gradient-top-accent neo-glow`}>
                                <CircuitPattern className="absolute top-0 right-0 w-32 h-32 opacity-[0.05]" />

                                <div className="relative z-10">
                                    {/* Title row */}
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="p-2 border-[3px] border-current/20">
                                            <Icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight">{cat.title}</h3>
                                            <p className="font-mono text-xs font-bold opacity-50">{cat.desc}</p>
                                        </div>
                                    </div>

                                    {/* Tools with progress */}
                                    <div className="mt-6 space-y-4">
                                        {cat.tools.map((tool) => (
                                            <div key={tool.name}>
                                                <div className="flex justify-between items-center mb-1.5">
                                                    <span className="font-mono text-sm font-bold">{tool.name}</span>
                                                    <span className="font-mono text-[0.6rem] font-bold uppercase tracking-wider opacity-50">{tool.exp}</span>
                                                </div>
                                                <ProgressBar
                                                    value={tool.level}
                                                    color={cat.textColor === "text-cream" ? "bg-cream" : "bg-ink"}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.section>

            {/* ══════════════════════════════════════
                TOOLS TICKER
               ══════════════════════════════════════ */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
                <div className="border-[3px] border-ink bg-ink py-4 overflow-hidden">
                    <div className="marquee-container font-mono font-bold text-cream/30 uppercase tracking-[0.2em] text-sm">
                        <div className="marquee-content animate-marquee" style={{ animationDuration: "25s" }}>
                            {categories.flatMap((c) => c.tools.map((t) => t.name)).map((name, i) => (
                                <span key={i} className="px-5">{name}&nbsp;•&nbsp;</span>
                            ))}
                        </div>
                        <div className="marquee-content animate-marquee" aria-hidden="true" style={{ animationDuration: "25s" }}>
                            {categories.flatMap((c) => c.tools.map((t) => t.name)).map((name, i) => (
                                <span key={`dup-${i}`} className="px-5">{name}&nbsp;•&nbsp;</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════
                CURRENTLY LEARNING
               ══════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">Growing</div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-6">Currently Learning</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {learningNow.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                        >
                            <div className="neo-card bg-cream p-5 h-full relative overflow-hidden group neo-glow">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-acid via-electric to-hotpink animate-gradient" />
                                <Sparkles size={18} className="text-electric mb-3 group-hover:animate-spin-slow" />
                                <h4 className="font-heading font-bold text-lg uppercase tracking-tight mb-2">{tech.name}</h4>
                                <p className="font-mono text-xs font-bold text-ink/50 leading-relaxed">{tech.reason}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ══════════════════════════════════════
                EXPERIENCE SUMMARY
               ══════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12"
            >
                <div className="neo-card bg-ink text-cream p-6 md:p-10 relative overflow-hidden gradient-top-accent">
                    <GridDots className="absolute top-0 right-0 w-48 h-48 text-cream/5" />
                    <div className="absolute bottom-0 left-0 w-64 h-32 bg-electric/5 blur-3xl pointer-events-none" />

                    <div className="relative z-10 grid md:grid-cols-2 gap-8">
                        <div>
                            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-cream/30 mb-2">Summary</div>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight mb-4">
                                Full-Stack <span className="gradient-text-acid">Fluency</span>
                            </h2>
                            <p className="font-mono text-sm font-bold text-cream/50 leading-relaxed mb-6">
                                I don&apos;t specialize in one layer — I own the entire stack. From native mobile UIs
                                to database schemas to Kubernetes configs, I can debug, build, and ship at every level.
                            </p>
                            <Link
                                href="/work"
                                className="inline-flex items-center gap-2 bg-acid text-ink font-heading font-bold text-sm uppercase tracking-wider px-6 py-3 border-[3px] border-acid hover:bg-cream hover:border-ink transition-all group"
                            >
                                See My Work
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: "Frontend & Mobile", pct: 92, color: "bg-electric" },
                                { label: "Backend & APIs", pct: 90, color: "bg-vivid" },
                                { label: "AI & Machine Learning", pct: 85, color: "bg-hotpink" },
                                { label: "DevOps & Cloud", pct: 82, color: "bg-acid" },
                            ].map((skill) => (
                                <div key={skill.label}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-mono text-sm font-bold">{skill.label}</span>
                                        <span className="font-mono text-xs font-bold text-acid">{skill.pct}%</span>
                                    </div>
                                    <ProgressBar value={skill.pct} color={skill.color} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
