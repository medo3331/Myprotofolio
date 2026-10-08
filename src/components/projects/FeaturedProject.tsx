import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import type { Project } from "@/lib/types";

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <div className="relative bg-gradient-to-br from-card to-[#0f1a16] border border-accent/20 rounded-3xl overflow-hidden">
      {/* Ribbon */}
      <div className="absolute top-6 -left-10 bg-accent text-black font-mono text-[10px] font-bold tracking-widest py-1.5 px-12 -rotate-45 z-10">
        FEATURED
      </div>

      <div className="grid lg:grid-cols-2 gap-8 p-8 md:p-12">
        {/* Cover */}
        <div className="order-2 lg:order-1 aspect-video lg:aspect-auto rounded-2xl overflow-hidden bg-bg-2 border border-border">
          <SafeImage
            src={project.coverImage}
            alt={project.title}
            fallbackText={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2 flex flex-col justify-center">
          <span className="font-mono text-accent text-xs mb-3">
            // {project.tagline}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {project.title}
          </h3>
          <p className="text-muted leading-relaxed mb-6">
            {project.shortDescription}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6 py-5 border-y border-border">
            <div>
              <div className="font-mono text-[10px] text-accent uppercase tracking-wider mb-1">
                الدور
              </div>
              <div className="text-sm">{project.role}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] text-accent uppercase tracking-wider mb-1">
                السنة
              </div>
              <div className="text-sm font-mono">{project.year}</div>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-black rounded-lg text-sm font-medium hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,255,157,0.3)] transition-all"
            >
              اقرأ الحالة كاملة <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
