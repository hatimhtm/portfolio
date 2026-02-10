import { projects } from "@/lib/projects";
import CaseStudyClient from "./CaseStudyClient";

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
    return <CaseStudyClient slug={params.slug} />;
}

