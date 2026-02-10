"use client";

import { motion, useInView } from "framer-motion";
import { Zap, Bot, ArrowRight, ArrowUpRight, Check, X, Clock, Shield, Layers, Rocket, Star, ChevronRight } from "lucide-react";
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

/* ─── Comparison Data ─── */
const comparison = [
    { feature: "Delivery Timeline", me: "12–48 hours", agency: "6–12 weeks" },
    { feature: "Tech Stack", me: "Latest & optimized", agency: "Whatever the team knows" },
    { feature: "Communication", me: "Direct with engineer", agency: "Through project manager" },
    { feature: "Revisions", me: "Unlimited during sprint", agency: "Scoped & charged" },
    { feature: "CI/CD & DevOps", me: "Included", agency: "Extra cost" },
    { feature: "AI Integration", me: "Built-in capability", agency: "Outsourced" },
    { feature: "Code Ownership", me: "100% yours", agency: "100% yours" },
];

/* ─── Process Steps ─── */
const processSteps = [
    { num: "01", title: "Brief", desc: "30-minute strategy call to break down your vision, constraints, and success metrics.", icon: Layers, color: "bg-electric" },
    { num: "02", title: "Build", desc: "Focused engineering sprint. Real code, real commits, real progress. No slide decks.", icon: Rocket, color: "bg-vivid" },
    { num: "03", title: "Ship", desc: "Production deployment with CI/CD, monitoring, and performance optimization.", icon: Zap, color: "bg-hotpink" },
    { num: "04", title: "Scale", desc: "Post-launch iteration based on real user data. Optimize, refine, and grow.", icon: Star, color: "bg-acid" },
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

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-cream pb-24">

            {/* Status bar */}
            <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                    <span className="font-mono text-xs font-bold text-cream/50 uppercase tracking-widest">system://services</span>
                </div>
                <span className="font-mono text-xs font-bold text-cream/30 tracking-widest">2 PROTOCOLS</span>
            </div>

            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16 mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-3">Offerings</div>
                    <h1 className="text-4xl sm:text-6xl md:text-[7rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase mb-6">
                        The 12-Hour<br /><span className="gradient-text-acid">Protocol</span>
                    </h1>
                    <p className="font-mono text-sm md:text-base font-bold text-ink/60 max-w-lg leading-relaxed">
                        Two battle-tested service packages engineered for founders who need production-grade
                        software yesterday. Not next quarter — now.
                    </p>
                </motion.div>
            </section>

            {/* ══════════════════════════════════════
                SERVICE CARDS
               ══════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
                <div className="grid md:grid-cols-2 gap-5">

                    {/* Velocity Launch */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="neo-card bg-acid text-ink p-6 md:p-10 h-full flex flex-col relative overflow-hidden gradient-top-accent neo-glow">
                            <CircuitPattern className="absolute top-0 right-0 w-32 h-32 text-ink/10" />
                            <div className="absolute bottom-0 right-0 w-48 h-48 bg-electric/5 blur-3xl pointer-events-none" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="p-3 border-[3px] border-ink bg-cream w-fit mb-6 shadow-neo-sm">
                                    <Zap size={32} />
                                </div>
                                <h3 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight mb-2 leading-tight">
                                    Velocity<br />Launch
                                </h3>
                                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink/40 mb-6">Full-Stack MVP Delivery</p>
                                <p className="font-mono text-sm font-bold mb-8 border-l-[3px] border-ink pl-4 leading-relaxed opacity-80">
                                    I don&apos;t build &quot;prototypes&quot;. I build production-ready MVPs that convert users and generate revenue from day one. Your idea, deployed and live within hours.
                                </p>

                                <ul className="space-y-3 font-mono text-sm font-bold mb-8 flex-grow">
                                    {[
                                        "Full-Stack Web Application",
                                        "TestFlight / App Store Deployment",
                                        "Stripe / Payment Integration",
                                        "Scalable Vercel + Supabase Stack",
                                        "Full CI/CD Pipeline",
                                        "Performance & SEO Optimized",
                                    ].map((item) => (
                                        <li key={item} className="flex items-center gap-3">
                                            <div className="w-4 h-4 bg-ink flex-shrink-0 flex items-center justify-center">
                                                <Check size={10} className="text-acid" />
                                            </div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/contact" className="w-full bg-ink text-cream font-heading font-bold text-lg uppercase tracking-wider py-4 border-[3px] border-ink hover:bg-cream hover:text-ink transition-all flex items-center justify-center gap-3 group">
                                    Start Project
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* AI Augmentation */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="neo-card bg-electric text-cream p-6 md:p-10 h-full flex flex-col relative overflow-hidden gradient-top-accent neo-glow-blue">
                            <GridDots className="absolute top-0 right-0 w-32 h-32 text-cream/5" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-hotpink/5 blur-3xl pointer-events-none" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="p-3 border-[3px] border-cream bg-ink w-fit mb-6 shadow-neo-sm">
                                    <Bot size={32} className="text-acid" />
                                </div>
                                <h3 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight mb-2 leading-tight">
                                    AI<br />Augmentation
                                </h3>
                                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream/40 mb-6">Intelligence Layer Integration</p>
                                <p className="font-mono text-sm font-bold mb-8 border-l-[3px] border-cream/30 pl-4 leading-relaxed opacity-80">
                                    Transform your existing product with AI. Custom LLM integrations, autonomous agents, RAG pipelines, and intelligent automation. Not a chatbot — a competitive advantage.
                                </p>

                                <ul className="space-y-3 font-mono text-sm font-bold mb-8 flex-grow">
                                    {[
                                        "Custom LLM Integration (GPT-4, Claude)",
                                        "Autonomous AI Agents",
                                        "RAG Pipeline (ChromaDB / Pinecone)",
                                        "Voice Processing (Whisper + TTS)",
                                        "Fine-tuning & Prompt Engineering",
                                        "Production Observability",
                                    ].map((item) => (
                                        <li key={item} className="flex items-center gap-3">
                                            <div className="w-4 h-4 bg-acid flex-shrink-0 flex items-center justify-center">
                                                <Check size={10} className="text-ink" />
                                            </div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/contact" className="w-full bg-cream text-ink font-heading font-bold text-lg uppercase tracking-wider py-4 border-[3px] border-cream hover:bg-ink hover:text-cream hover:border-cream transition-all flex items-center justify-center gap-3 group">
                                    Start Project
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════
                PROCESS STEPS (with connecting line)
               ══════════════════════════════════════ */}
            <motion.section
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">Workflow</div>
                <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink mb-8">The Process</h2>

                <div className="grid md:grid-cols-4 gap-5 relative">
                    {/* Connecting line (desktop only) */}
                    <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-[3px] bg-ink/10 z-0">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-acid via-electric to-hotpink"
                        />
                    </div>

                    {processSteps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <motion.div key={step.num} variants={fadeUp} className="relative z-10">
                                <div className="neo-card bg-cream p-6 h-full relative overflow-hidden group neo-glow">
                                    <div className={`absolute top-0 left-0 right-0 h-1 ${step.color}`} />
                                    <div className={`w-12 h-12 ${step.color} ${step.color === "bg-acid" ? "text-ink" : "text-cream"} border-[3px] border-ink flex items-center justify-center mb-4 shadow-neo-sm group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all`}>
                                        <Icon size={20} />
                                    </div>
                                    <div className="font-heading font-bold text-sm text-ink/20 uppercase tracking-wider mb-1">{step.num}</div>
                                    <h4 className="font-heading font-bold text-xl uppercase tracking-tight mb-2">{step.title}</h4>
                                    <p className="font-mono text-xs font-bold text-ink/50 leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>

            {/* ══════════════════════════════════════
                COMPARISON TABLE
               ══════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">Comparison</div>
                <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink mb-8">
                    Me vs. <span className="gradient-text-warm">Traditional Agency</span>
                </h2>

                <div className="neo-card bg-ink text-cream p-0 overflow-hidden gradient-top-accent">
                    {/* Table header */}
                    <div className="grid grid-cols-3 border-b-[3px] border-cream/10">
                        <div className="p-4 md:p-6 font-mono text-xs font-bold uppercase tracking-widest text-cream/30">Feature</div>
                        <div className="p-4 md:p-6 font-heading font-bold text-base md:text-lg uppercase tracking-tight text-acid border-x-[3px] border-cream/10 text-center">Hatim</div>
                        <div className="p-4 md:p-6 font-mono text-xs font-bold uppercase tracking-widest text-cream/30 text-center">Agency</div>
                    </div>

                    {/* Table rows */}
                    {comparison.map((row, i) => (
                        <div key={row.feature} className={`grid grid-cols-3 ${i < comparison.length - 1 ? "border-b-[2px] border-cream/5" : ""} group hover:bg-cream/5 transition-colors`}>
                            <div className="p-4 md:p-5 font-mono text-sm font-bold text-cream/60">{row.feature}</div>
                            <div className="p-4 md:p-5 font-mono text-sm font-bold text-acid border-x-[3px] border-cream/10 text-center">{row.me}</div>
                            <div className="p-4 md:p-5 font-mono text-sm font-bold text-cream/30 text-center">{row.agency}</div>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ══════════════════════════════════════
                WHY WORK WITH ME
               ══════════════════════════════════════ */}
            <motion.section
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">Advantages</div>
                <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink mb-8">Why Work With Me</h2>

                <div className="grid md:grid-cols-3 gap-5">
                    {[
                        { icon: Clock, title: "Velocity", desc: "Most teams take weeks. I measure in hours. Your MVP will be live before the next standup.", color: "bg-acid", textColor: "text-ink" },
                        { icon: Shield, title: "Quality", desc: "Production-grade from day one. Clean code, tested, monitored, and built to scale. No technical debt.", color: "bg-electric", textColor: "text-cream" },
                        { icon: Layers, title: "Full Stack", desc: "No need to hire 5 specialists. One engineer covering frontend, backend, mobile, AI, and DevOps.", color: "bg-hotpink", textColor: "text-cream" },
                    ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div key={item.title} variants={fadeUp}>
                                <div className={`neo-card ${item.color} ${item.textColor} p-6 md:p-8 h-full relative overflow-hidden gradient-top-accent neo-glow`}>
                                    <CrossHatch className="absolute top-0 right-0 w-20 h-20 opacity-50" />
                                    <div className="relative z-10">
                                        <Icon size={28} className="mb-4" />
                                        <h4 className="font-heading font-bold text-2xl uppercase tracking-tight mb-3">{item.title}</h4>
                                        <p className="font-mono text-sm font-bold opacity-70 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>

            {/* ══════════════════════════════════════
                SATISFACTION GUARANTEE
               ══════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="neo-card bg-cream p-6 md:p-10 text-center relative overflow-hidden border-[3px] border-ink gradient-top-accent">
                    <GridDots className="absolute inset-0 w-full h-full text-ink/5" />
                    <div className="relative z-10">
                        {/* Rotating badge */}
                        <div className="mx-auto w-20 h-20 md:w-24 md:h-24 bg-acid border-[3px] border-ink shadow-neo flex items-center justify-center mb-6 animate-spin-slow">
                            <div className="animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "8s" }}>
                                <Shield size={32} />
                            </div>
                        </div>
                        <h3 className="font-heading font-bold text-2xl md:text-4xl uppercase tracking-tight mb-3">Satisfaction Guaranteed</h3>
                        <p className="font-mono text-sm font-bold text-ink/60 max-w-md mx-auto leading-relaxed mb-6">
                            If you&apos;re not 100% satisfied with the delivery, I&apos;ll iterate until you are.
                            No scopes, no change orders — until you love it.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-ink/40">
                            <Star size={14} className="text-acid fill-acid" />
                            <Star size={14} className="text-acid fill-acid" />
                            <Star size={14} className="text-acid fill-acid" />
                            <Star size={14} className="text-acid fill-acid" />
                            <Star size={14} className="text-acid fill-acid" />
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ══════════════════════════════════════
                CTA
               ══════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12"
            >
                <div className="neo-card bg-vivid text-cream p-8 md:p-12 text-center relative overflow-hidden gradient-top-accent">
                    <CircuitPattern className="absolute inset-0 w-full h-full text-cream/5" />
                    <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-acid/10 blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight mb-4">Ready to launch?</h2>
                        <p className="font-mono text-sm md:text-base font-bold opacity-80 mb-8 max-w-xl mx-auto">
                            Tell me about your project and I&apos;ll respond within 2 hours with a game plan.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block bg-cream text-ink font-heading font-bold text-lg uppercase tracking-wider px-8 py-4 border-[3px] border-ink shadow-neo hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all hover-shake"
                        >
                            Get Started →
                        </Link>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
