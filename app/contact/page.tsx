"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Clock, ArrowUpRight, Github, Linkedin, Send, ChevronDown, ChevronUp, MessageSquare, Zap, Shield } from "lucide-react";
import { useState, useRef } from "react";

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

/* ─── FAQ Data ─── */
const faqs = [
    {
        q: "What's your typical response time?",
        a: "I respond within 2 hours during business hours (GMT+1). For urgent projects, I'm often available within minutes.",
    },
    {
        q: "How does the 12-hour protocol work?",
        a: "After a 30-minute brief call, I begin a focused engineering sprint. You'll receive progress updates every few hours, and your MVP will be deployed to production within 12-48 hours depending on scope.",
    },
    {
        q: "Do you work with international clients?",
        a: "Absolutely. I'm remote-first and have worked with teams across the US, Europe, and Asia. Time zones are never an issue — I adapt my schedule to yours.",
    },
    {
        q: "What happens after delivery?",
        a: "You own 100% of the code. I provide documentation, deployment guides, and optional ongoing support. Most clients come back for iteration sprints after launch.",
    },
];

/* ─── FAQ Item ─── */
function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full neo-card bg-cream p-5 md:p-6 text-left group hover:bg-ink hover:text-cream transition-colors duration-200"
            >
                <div className="flex justify-between items-center gap-4">
                    <span className="font-heading font-bold text-base md:text-lg uppercase tracking-tight">{faq.q}</span>
                    <div className="flex-shrink-0 w-8 h-8 border-[3px] border-current/20 flex items-center justify-center group-hover:border-acid transition-colors">
                        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                </div>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="overflow-hidden"
                        >
                            <p className="font-mono text-sm font-bold opacity-60 leading-relaxed mt-4 pt-4 border-t-[2px] border-current/10">
                                {faq.a}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </motion.div>
    );
}

/* ─── Animated Input ─── */
function FormInput({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder: string }) {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState("");

    return (
        <div className="relative">
            <label className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink/40 mb-2 block">{label}</label>
            <div className="relative">
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full bg-transparent border-b-[3px] border-ink/20 py-3 font-mono text-sm font-bold text-ink placeholder:text-ink/20 focus:outline-none transition-colors"
                />
                {/* Animated underline */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focused ? 1 : value ? 0.5 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-acid origin-left"
                />
            </div>
        </div>
    );
}

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [budgetFocused, setBudgetFocused] = useState(false);
    const [briefFocused, setBriefFocused] = useState(false);
    const [budgetValue, setBudgetValue] = useState("");
    const [briefValue, setBriefValue] = useState("");

    return (
        <div className="min-h-screen bg-cream pb-24">

            {/* Status bar */}
            <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neo-green animate-pulse-dot" />
                    <span className="font-mono text-xs font-bold text-cream/50 uppercase tracking-widest">system://contact</span>
                </div>
                <span className="font-mono text-xs font-bold text-cream/30 tracking-widest">ACCEPTING PROJECTS</span>
            </div>

            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16 mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-3">Get in touch</div>
                    <h1 className="text-4xl sm:text-6xl md:text-[7rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase mb-6">
                        Let&apos;s<br />Talk
                    </h1>
                    <p className="font-mono text-sm md:text-base font-bold text-ink/60 max-w-lg leading-relaxed">
                        Have a project in mind? Drop me a message and I&apos;ll get back within 2 hours
                        with a plan of attack. No consultations, no BS — just action.
                    </p>
                </motion.div>
            </section>

            {/* ══════════════════════════════════════
                MAIN GRID (Info + Form)
               ══════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
                <div className="grid md:grid-cols-5 gap-5">

                    {/* LEFT: Info cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-2 space-y-5"
                    >
                        {/* Email card */}
                        <div className="neo-card bg-ink text-cream p-6 relative overflow-hidden neo-glow">
                            <CircuitPattern className="absolute top-0 right-0 w-24 h-24 text-cream/5" />
                            <div className="relative z-10">
                                <Mail className="w-7 h-7 mb-3 text-acid" />
                                <h3 className="font-heading font-bold text-lg uppercase mb-2">Direct Line</h3>
                                <a
                                    href="mailto:hatimelhassak.official@gmail.com"
                                    className="font-mono text-sm font-bold hover:text-acid transition-colors break-all group flex items-center gap-2"
                                >
                                    hatimelhassak.official@gmail.com
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                </a>
                            </div>
                        </div>

                        {/* Location card */}
                        <div className="neo-card bg-cream p-5 neo-glow">
                            <div className="flex items-center gap-3 mb-3">
                                <MapPin size={18} className="text-vivid" />
                                <span className="font-heading font-bold text-base uppercase tracking-tight">Morocco</span>
                            </div>
                            <p className="font-mono text-xs font-bold text-ink/50 leading-relaxed">
                                Remote-first. Available worldwide across all time zones.
                            </p>
                        </div>

                        {/* Response time */}
                        <div className="neo-card bg-cream p-5 neo-glow">
                            <div className="flex items-center gap-3 mb-3">
                                <Clock size={18} className="text-electric" />
                                <span className="font-heading font-bold text-base uppercase tracking-tight">Response Time</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 flex-1 bg-ink/10 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "90%" }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-acid to-electric"
                                    />
                                </div>
                                <span className="font-mono text-xs font-bold text-ink/50">&lt; 2h</span>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="neo-card bg-acid text-ink p-5 gradient-top-accent">
                            <div className="font-mono font-bold space-y-2">
                                <p className="flex items-center gap-2 text-sm">
                                    <span className="w-3 h-3 bg-neo-green border-2 border-ink animate-pulse-dot inline-block" />
                                    STATUS: ONLINE
                                </p>
                                <p className="text-xs opacity-60">Currently accepting new projects</p>
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="flex gap-3">
                            <a
                                href="https://github.com/hatimhtm"
                                target="_blank"
                                className="neo-card bg-ink text-cream p-4 flex-1 flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-wider hover:bg-acid hover:text-ink transition-colors neo-glow"
                            >
                                <Github size={16} />
                                GitHub
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                className="neo-card bg-electric text-cream p-4 flex-1 flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-wider hover:bg-acid hover:text-ink transition-colors neo-glow-blue"
                            >
                                <Linkedin size={16} />
                                LinkedIn
                            </a>
                        </div>

                        {/* Trust signals */}
                        <div className="neo-card bg-ink text-cream p-5 relative overflow-hidden">
                            <GridDots className="absolute inset-0 w-full h-full text-cream/3" />
                            <div className="relative z-10 space-y-3">
                                {[
                                    { icon: Zap, text: "12-hour delivery turnaround" },
                                    { icon: Shield, text: "100% code ownership" },
                                    { icon: MessageSquare, text: "Direct communication, no middleman" },
                                ].map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={item.text} className="flex items-center gap-3">
                                            <Icon size={14} className="text-acid flex-shrink-0" />
                                            <span className="font-mono text-xs font-bold text-cream/50">{item.text}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="md:col-span-3"
                    >
                        <AnimatePresence mode="wait">
                            {!submitted ? (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="neo-card bg-cream p-6 md:p-8 relative overflow-hidden gradient-top-accent"
                                >
                                    <GridDots className="absolute top-0 right-0 w-32 h-32 text-ink/5" />

                                    <div className="relative z-10">
                                        <h2 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-8">Send a Brief</h2>

                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                setSubmitted(true);
                                            }}
                                            className="space-y-8"
                                        >
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <FormInput label="Your Name" name="name" placeholder="John Doe" />
                                                <FormInput label="Email" name="email" type="email" placeholder="john@company.com" />
                                            </div>

                                            {/* Budget select */}
                                            <div className="relative">
                                                <label className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink/40 mb-2 block">Budget Range</label>
                                                <div className="relative">
                                                    <select
                                                        name="budget"
                                                        value={budgetValue}
                                                        onChange={(e) => setBudgetValue(e.target.value)}
                                                        onFocus={() => setBudgetFocused(true)}
                                                        onBlur={() => setBudgetFocused(false)}
                                                        className="w-full bg-transparent border-b-[3px] border-ink/20 py-3 font-mono text-sm font-bold text-ink focus:outline-none appearance-none cursor-pointer"
                                                    >
                                                        <option value="">Select a range</option>
                                                        <option value="1-5k">$1,000 – $5,000</option>
                                                        <option value="5-15k">$5,000 – $15,000</option>
                                                        <option value="15-50k">$15,000 – $50,000</option>
                                                        <option value="50k+">$50,000+</option>
                                                    </select>
                                                    <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-ink/30 pointer-events-none" />
                                                    <motion.div
                                                        initial={{ scaleX: 0 }}
                                                        animate={{ scaleX: budgetFocused ? 1 : budgetValue ? 0.5 : 0 }}
                                                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-acid origin-left"
                                                    />
                                                </div>
                                            </div>

                                            {/* Brief textarea */}
                                            <div className="relative">
                                                <label className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink/40 mb-2 block">Project Brief</label>
                                                <div className="relative">
                                                    <textarea
                                                        name="brief"
                                                        rows={5}
                                                        value={briefValue}
                                                        onChange={(e) => setBriefValue(e.target.value)}
                                                        onFocus={() => setBriefFocused(true)}
                                                        onBlur={() => setBriefFocused(false)}
                                                        placeholder="Tell me about your project — what you're building, deadlines, and goals..."
                                                        className="w-full bg-transparent border-b-[3px] border-ink/20 py-3 font-mono text-sm font-bold text-ink placeholder:text-ink/20 focus:outline-none resize-none"
                                                    />
                                                    <motion.div
                                                        initial={{ scaleX: 0 }}
                                                        animate={{ scaleX: briefFocused ? 1 : briefValue ? 0.5 : 0 }}
                                                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-acid origin-left"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full bg-ink text-cream font-heading font-bold text-lg uppercase tracking-wider py-4 border-[3px] border-ink hover:bg-acid hover:text-ink transition-all flex items-center justify-center gap-3 group neo-glow"
                                            >
                                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                Send Message
                                            </button>
                                        </form>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="neo-card bg-acid text-ink p-8 md:p-12 text-center relative overflow-hidden gradient-top-accent min-h-[400px] flex flex-col items-center justify-center"
                                >
                                    <CircuitPattern className="absolute inset-0 w-full h-full text-ink/5" />
                                    <div className="relative z-10">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                            className="w-20 h-20 bg-ink text-acid border-[3px] border-ink flex items-center justify-center mx-auto mb-6 shadow-neo"
                                        >
                                            <Send size={32} />
                                        </motion.div>
                                        <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight mb-3">Message Sent!</h2>
                                        <p className="font-mono text-sm font-bold opacity-70 max-w-sm mx-auto mb-6">
                                            I&apos;ll review your brief and respond within 2 hours with a game plan. Talk soon!
                                        </p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="font-mono text-xs font-bold uppercase tracking-wider underline opacity-50 hover:opacity-100 transition-opacity"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════
                FAQ SECTION
               ══════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">Common Questions</div>
                <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink mb-8">FAQ</h2>

                <div className="space-y-3 max-w-3xl">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} faq={faq} index={i} />
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════
                BOTTOM CTA
               ══════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12"
            >
                <div className="neo-card bg-ink text-cream p-6 md:p-10 text-center relative overflow-hidden gradient-top-accent">
                    <GridDots className="absolute inset-0 w-full h-full text-cream/3" />
                    <div className="absolute top-0 left-1/3 w-1/3 h-24 bg-acid/10 blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                        <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-3">Prefer email?</h3>
                        <a
                            href="mailto:hatimelhassak.official@gmail.com"
                            className="inline-flex items-center gap-2 font-mono text-base font-bold text-acid hover:text-cream transition-colors group"
                        >
                            hatimelhassak.official@gmail.com
                            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
