import Link from "next/link";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { getProjects } from "@/lib/content";

const statusLabel: Record<string, string> = {
  live: "يعمل",
  "in-progress": "قيد التطوير",
  planned: "مخطط",
};

export default function ProjectsListPage() {
  const projects = getProjects();

  return (
    <div className="p-8 lg:p-12 max-w-6xl">
      <div className="flex items-start justify-between gap-4 mb-10 flex-wrap">
        <div>
          <div className="font-mono text-accent text-sm mb-2">
            // projects
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">
            المشاريع
          </h1>
          <p className="text-muted text-sm">
            {projects.length} مشروع في البورتفوليو
          </p>
        </div>

        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-black rounded-lg font-medium text-sm hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,255,157,0.3)] transition-all"
        >
          <Plus className="w-4 h-4" />
          مشروع جديد
        </Link>
      </div>

      <div className="space-y-3">
        {projects.map((p) => (
          <div
            key={p.slug}
            className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-accent/30 transition-colors"
          >
            <div className="w-16 h-16 rounded-lg bg-bg-2 border border-border overflow-hidden shrink-0">
              <SafeImage
                src={p.coverImage}
                alt={p.title}
                fallbackText={p.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-medium">{p.title}</h3>
                {p.featured && (
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30">
                    مميز
                  </span>
                )}
                <span
                  className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                    p.status === "live"
                      ? "bg-accent/10 text-accent border-accent/20"
                      : "bg-accent-2/10 text-accent-2 border-accent-2/20"
                  }`}
                >
                  {statusLabel[p.status]}
                </span>
              </div>
              <div className="font-mono text-xs text-muted mt-1 truncate">
                /{p.slug} · {p.year}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/projects/${p.slug}`}
                target="_blank"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-colors"
                title="عرض في الموقع"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <Link
                href={`/dashboard/projects/${p.slug}/edit`}
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-colors"
                title="تعديل"
              >
                <Pencil className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
