import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", weight: ["400", "500", "600", "700"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", weight: ["400", "500", "700"] });

export const metadata: Metadata = {
    title: "Hatim El Hassak — Full Stack Engineer",
    description: "High-performance MVP delivery. Full-stack engineering with a focus on speed, quality, and AI integration.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${spaceGrotesk.variable} ${jetbrains.variable} bg-cream text-ink antialiased overflow-x-hidden selection:bg-acid selection:text-ink`}>

                {/* MAIN CONTENT */}
                <main className="relative w-full min-h-screen pb-20">
                    {children}
                </main>

                {/* FIXED BOTTOM NAVIGATION */}
                <nav className="fixed bottom-0 left-0 w-full bg-ink border-t-[3px] border-ink z-[100] shadow-[0px_-4px_20px_rgba(0,0,0,0.3)]">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
                        <div className="flex gap-3 md:gap-6">
                            <a href="/" className="font-mono text-sm md:text-base font-bold uppercase tracking-wider text-cream hover:text-acid transition-colors relative group">
                                Home
                                <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-acid transition-all group-hover:w-full" />
                            </a>
                            <a href="/work" className="font-mono text-sm md:text-base font-bold uppercase tracking-wider text-cream hover:text-neo-pink transition-colors relative group">
                                Work
                                <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-neo-pink transition-all group-hover:w-full" />
                            </a>
                            <a href="/stack" className="font-mono text-sm md:text-base font-bold uppercase tracking-wider text-cream hover:text-neo-blue transition-colors relative group">
                                Stack
                                <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-neo-blue transition-all group-hover:w-full" />
                            </a>
                            <a href="/services" className="font-mono text-sm md:text-base font-bold uppercase tracking-wider text-cream hover:text-neo-orange transition-colors relative group">
                                Services
                                <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-neo-orange transition-all group-hover:w-full" />
                            </a>
                        </div>
                        <a
                            href="/contact"
                            className="bg-acid text-ink px-4 md:px-6 py-2 font-mono font-bold text-sm uppercase tracking-wider border-[3px] border-ink hover:bg-cream hover:shadow-neo transition-all hover-shake"
                        >
                            Let&apos;s Talk
                        </a>
                    </div>
                </nav>

            </body>
        </html>
    );
}
