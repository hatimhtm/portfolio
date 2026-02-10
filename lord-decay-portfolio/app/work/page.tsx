"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Zap, Clock, Activity, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

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

/* ─── Projects Data ─── */
const projects = [
    {
        id: "01",
        title: "AG1 Dashboard",
        desc: "A comprehensive iOS health & wellness dashboard built with SwiftUI. Real-time data visualization, custom chart components, and 60 FPS animations for tracking nutrition and wellness metrics.",
        tech: ["Swift", "SwiftUI", "iOS 17", "HealthKit", "Charts"],
        color: "bg-electric",
        textColor: "text-cream",
        link: "https://github.com/hatimhtm/AG1Dashboard",
        metrics: ["60 FPS", "iOS 17+", "Real-time"],
    },
    {
        id: "02",
        title: "EchoScribe",
        desc: "AI-powered meeting transcription agent. Records, transcribes via Whisper, generates structured summaries, and posts to Slack — fully automated pipeline running in production.",
        tech: ["Python", "OpenAI", "Whisper", "FastAPI", "Slack SDK"],
        color: "bg-hotpink",
        textColor: "text-cream",
        link: "https://github.com/hatimhtm/EchoScribe",
        metrics: ["99% accuracy", "Auto-post", "< 30s"],
    },
    {
        id: "03",
        title: "Fortress",
        desc: "Enterprise-grade security CLI toolkit for penetration testing and vulnerability assessment. Modular architecture with pluggable scan engines and automated report generation.",
        tech: ["Python", "Nmap", "SQLMap", "Click", "Rich"],
        color: "bg-vivid",
        textColor: "text-cream",
        link: "https://github.com/hatimhtm/Fortress",
        metrics: ["CLI-first", "Modular", "Auto-report"],
    },
    {
        id: "04",
        title: "Portfolio v3",
        desc: "This very site. A neo-brutalist × luxury portfolio built with Next.js 14, Framer Motion, and Tailwind. Custom design system with animated counters, parallax effects, and film grain.",
        tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind"],
        color: "bg-acid",
        textColor: "text-ink",
        link: "https://github.com/hatimhtm",
        metrics: ["< 100ms FCP", "SSR", "Responsive"],
    },
    {
        id: "05",
        title: "LangChain Agents",
        desc: "Custom LLM agent framework with tool-use, memory management, and RAG pipeline integration. Built for production deployment with observability and token optimization.",
        tech: ["Python", "LangChain", "ChromaDB", "OpenAI", "Redis"],
        color: "bg-ink",
        textColor: "text-cream",
        link: "https://github.com/hatimhtm",
        metrics: ["RAG pipeline", "Tool-use", "Production"],
    },
];

/* ─── Stagger ─── */
const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ─── Card Component ─── */
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <Link href={project.link} target="_blank" className="block h-full group">
                <div className={`neo-card ${project.color} ${project.textColor} p-6 md:p-8 h-full flex flex-col justify-between min-h-[22rem] md:min-h-[24rem] relative overflow-hidden neo-glow`}>
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Background ID */}
                    <div className="absolute top-4 right-4 pointer-events-none select-none">
                        <span className="text-[5rem] md:text-[7rem] font-heading font-bold tracking-tighter leading-none opacity-[0.06]">
                            {project.id}
                        </span>
                    </div>

                    {/* Decorative pattern */}
                    <div className="absolute bottom-0 left-0 pointer-events-none opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                        <CircuitPattern className="w-32 h-32" />
                    </div>

                    {/* Top row */}
                    <div className="flex justify-between items-start relative z-10">
                        <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight leading-tight">
                            {project.title}
                        </h3>
                        <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mt-1" />
                    </div>

                    {/* Description */}
                    <p className="font-mono text-sm font-bold opacity-70 mt-4 leading-relaxed max-w-lg relative z-10">
                        {project.desc}
                    </p>

                    {/* Metrics badges */}
                    <div className="flex flex-wrap gap-2 mt-4 relative z-10">
                        {project.metrics.map((m) => (
                            <span key={m} className="flex items-center gap-1 px-2 py-1 bg-current/10 font-mono text-[0.6rem] font-bold uppercase tracking-wider rounded-sm">
                                <Activity size={10} className="opacity-60" />
                                {m}
                            </span>
                        ))}
                    </div>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-2 mt-4 border-t-[3px] border-current/20 pt-4 relative z-10">
                        {project.tech.map((t) => (
                            <span
                                key={t}
                                className="px-3 py-1 border-2 border-current/40 font-mono text-[0.65rem] font-bold uppercase tracking-wider hover:border-current transition-colors"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function WorkPage() {
    return (
        <div className="min-h-screen bg-cream pb-24">

            {/* Status bar */}
            <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                    <span className="font-mono text-xs font-bold text-cream/50 uppercase tracking-widest">system://projects</span>
                </div>
                <span className="font-mono text-xs font-bold text-cream/30 tracking-widest">{projects.length} RECORDS</span>
            </div>

            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16 mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-3">Portfolio</div>
                    <h1 className="text-4xl sm:text-6xl md:text-[7rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase mb-6">
                        The<br />Work
                    </h1>
                    <p className="font-mono text-sm md:text-base font-bold text-ink/60 max-w-lg leading-relaxed">
                        Production-grade software shipped at velocity. Each project built with precision engineering
                        and deployed to real users. No prototypes — only products.
                    </p>
                </motion.div>

                {/* Process mini-strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap items-center gap-3 mt-6"
                >
                    {["Brief", "Build", "Ship", "Scale"].map((step, i) => (
                        <div key={step} className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold uppercase text-ink/40 bg-ink/5 px-3 py-1.5 border-2 border-ink/10">
                                {String(i + 1).padStart(2, "0")}.{step}
                            </span>
                            {i < 3 && <ChevronRight size={12} className="text-ink/20" />}
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* Projects grid */}
            <motion.section
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="grid md:grid-cols-2 gap-5">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </motion.section>

            {/* ══════════════════════════════════════
                DEPLOYED PROJECTS / GITHUB SECTION
               ══════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="neo-card bg-ink text-cream p-6 md:p-10 relative overflow-hidden gradient-top-accent"
                >
                    <GridDots className="absolute top-0 right-0 w-48 h-48 text-cream/5" />
                    <div className="absolute bottom-0 left-0 w-96 h-32 bg-acid/5 blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
                            <div>
                                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-cream/30 mb-2">Open Source</div>
                                <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight">
                                    More on <span className="gradient-text-acid">GitHub</span>
                                </h2>
                                <p className="font-mono text-sm font-bold text-cream/40 mt-2 max-w-md">
                                    All projects are open-source with clean commit histories, documentation, and CI/CD pipelines.
                                </p>
                            </div>
                            <a
                                href="https://github.com/hatimhtm"
                                target="_blank"
                                className="inline-flex items-center gap-3 bg-cream text-ink font-heading font-bold text-base uppercase tracking-wider px-6 py-3 border-[3px] border-cream shadow-neo-inv hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all group"
                            >
                                <Github size={20} />
                                View Profile
                                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>

                        {/* Repo stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { label: "Repositories", value: "10+" },
                                { label: "Languages", value: "5+" },
                                { label: "Contributions", value: "200+" },
                                { label: "Stars", value: "Growing" },
                            ].map((stat) => (
                                <div key={stat.label} className="border-[3px] border-cream/10 p-4 group hover:border-acid/30 transition-colors">
                                    <div className="font-heading font-bold text-2xl text-acid">{stat.value}</div>
                                    <div className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-cream/30 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* CTA */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12"
            >
                <div className="neo-card bg-acid text-ink p-6 md:p-10 text-center relative overflow-hidden">
                    <CircuitPattern className="absolute inset-0 w-full h-full text-ink/5" />
                    <div className="relative z-10">
                        <h3 className="font-heading font-bold text-2xl md:text-4xl uppercase tracking-tight mb-3">
                            Have a project in mind?
                        </h3>
                        <p className="font-mono text-sm font-bold opacity-60 mb-6 max-w-md mx-auto">
                            I&apos;m always excited to work on challenging problems. Let&apos;s build something remarkable together.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block bg-ink text-cream font-heading font-bold text-lg uppercase tracking-wider px-8 py-4 border-[3px] border-ink shadow-neo hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all hover-shake"
                        >
                            Let&apos;s Talk →
                        </Link>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
