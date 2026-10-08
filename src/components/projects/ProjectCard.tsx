import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import type { Project } from "@/lib/types";

const statusLabel: Record<Project["status"], string> = {
  live: "يعمل",
  "in-progress": "قيد التطوير",
  planned: "مخطط",
};

export function ProjectCard({ project }: { project: Project }) {
  const isLive = project.status === "live";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover */}
      <div className="aspect-video bg-bg-2 overflow-hidden relative">
        <SafeImage
          src={project.coverImage}
          alt={project.title}
          fallbackText={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent pointer-events-none" />
        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-full font-mono text-[11px] backdrop-blur-md border ${
            isLive
              ? "bg-accent/15 text-accent border-accent/30"
              : "bg-accent-2/15 text-accent-2 border-accent-2/30"
          }`}
        >
          {statusLabel[project.status]}
        </span>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <ArrowLeft className="w-4 h-4 text-muted group-hover:text-accent group-hover:-translate-x-1 transition-all" />
        </div>

        <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-4">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] px-2 py-1 bg-bg-2 border border-border rounded text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
