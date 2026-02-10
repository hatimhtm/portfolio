export interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    tech: string[];
    metrics: { label: string; value: string }[];
    color: string;
    textColor: string;
    link: string;
    category: string;
    problem: string;
    solution: string;
    outcomes: string[];
}

export const projects: Project[] = [
    {
        id: "001",
        slug: "ag1-dashboard",
        title: "AG1 Dashboard",
        description: "A native iOS health analytics dashboard built with SwiftUI, delivering 60FPS buttery-smooth animations and real-time HealthKit data visualization.",
        longDescription: "AG1 Dashboard is a premium health analytics experience for iOS. Built from scratch with SwiftUI and HealthKit integration, it transforms raw health data into actionable insights through beautiful, performant visualizations.",
        tech: ["SwiftUI", "HealthKit", "CoreData", "Charts", "iOS 17"],
        metrics: [
            { label: "Performance", value: "60 FPS" },
            { label: "Platform", value: "iOS 17+" },
            { label: "Architecture", value: "MVVM" },
        ],
        color: "bg-electric",
        textColor: "text-cream",
        link: "https://github.com/hatimhtm/AG1Dashboard",
        category: "Mobile",
        problem: "Health apps are either data dumps with no design sense or pretty interfaces with no real depth. Users needed a dashboard that was both visually premium and genuinely useful.",
        solution: "Built a native SwiftUI app that pulls real-time data from HealthKit, processes it through custom algorithms, and presents it through buttery-smooth 60FPS animations. Used MVVM architecture for clean separation and CoreData for offline persistence.",
        outcomes: [
            "60FPS animations across all views",
            "Real-time HealthKit integration",
            "Offline-first with CoreData sync",
            "Custom chart components from scratch",
        ],
    },
    {
        id: "002",
        slug: "echoscribe",
        title: "EchoScribe",
        description: "An AI-powered meeting assistant that transcribes audio, generates intelligent summaries, and pushes structured output to Slack — fully automated.",
        longDescription: "EchoScribe is an autonomous AI agent that listens to meetings, transcribes them in real-time using Whisper, generates structured summaries with GPT-4, and distributes them through Slack integration. Zero manual work.",
        tech: ["Python", "OpenAI", "Whisper", "LangChain", "Slack API"],
        metrics: [
            { label: "Accuracy", value: "97%" },
            { label: "Latency", value: "<3s" },
            { label: "Pipeline", value: "Fully Auto" },
        ],
        color: "bg-hotpink",
        textColor: "text-cream",
        link: "https://github.com/hatimhtm/EchoScribe",
        category: "AI / ML",
        problem: "Meeting notes are either forgotten, poorly taken, or require expensive dedicated note-takers. Teams needed an automated solution that captures everything and distributes it instantly.",
        solution: "Built a pipeline that chains Whisper (speech-to-text) → GPT-4 (intelligent summarization) → Slack API (distribution). LangChain orchestrates the agent workflow with retry logic and quality checks.",
        outcomes: [
            "97% transcription accuracy",
            "Sub-3-second processing per segment",
            "Automatic Slack distribution",
            "Structured output with action items",
        ],
    },
    {
        id: "003",
        slug: "fortress",
        title: "Fortress",
        description: "A Python-based security CLI tool for vulnerability scanning, network analysis, and automated security auditing of web applications.",
        longDescription: "Fortress is a command-line security toolkit built in Python. It automates common security auditing tasks — from port scanning to vulnerability detection to SSL analysis — putting enterprise-grade security checks in a single CLI command.",
        tech: ["Python", "Socket", "SSL/TLS", "Nmap", "CLI"],
        metrics: [
            { label: "Scan Speed", value: "<10s" },
            { label: "Checks", value: "50+" },
            { label: "Output", value: "JSON/PDF" },
        ],
        color: "bg-vivid",
        textColor: "text-cream",
        link: "https://github.com/hatimhtm/Fortress",
        category: "Security",
        problem: "Security auditing tools are either expensive enterprise products or fragmented open-source scripts with no unified interface. Developers needed a simple, fast, all-in-one CLI.",
        solution: "Built a unified CLI that wraps multiple security scanning techniques — port scanning, SSL/TLS analysis, header auditing, and vulnerability checks — into a single command with structured JSON output.",
        outcomes: [
            "50+ automated security checks",
            "Sub-10-second full scan",
            "Structured JSON and PDF reports",
            "Zero external dependencies for core scans",
        ],
    },
    {
        id: "004",
        slug: "portfolio-v3",
        title: "Portfolio v3",
        description: "This very site — a luxury neo-brutalist portfolio built with Next.js 14, Framer Motion, and a custom design system. Meta, right?",
        longDescription: "The portfolio you're looking at right now. A deliberately over-engineered showcase built to prove that speed and beauty aren't mutually exclusive. Custom animations, dark mode, command palette, and more.",
        tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
        metrics: [
            { label: "Lighthouse", value: "95+" },
            { label: "Build Time", value: "<30s" },
            { label: "Style", value: "Neo-Brutalist" },
        ],
        color: "bg-acid",
        textColor: "text-ink",
        link: "https://github.com/hatimhtm/luxury-engineering-portfolio",
        category: "Web",
        problem: "Most developer portfolios are cookie-cutter templates or boring minimalist pages. Needed something that immediately screams 'this person gives a damn about craft.'",
        solution: "Designed a custom neo-brutalist design system from scratch. Every component is hand-built — no UI library. Custom animations, dark mode, command palette, and page transitions all built with Framer Motion.",
        outcomes: [
            "95+ Lighthouse score",
            "Custom design system from scratch",
            "Full dark mode with CSS variables",
            "Keyboard-navigable with ⌘K palette",
        ],
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
    return projects.map((p) => p.slug);
}
