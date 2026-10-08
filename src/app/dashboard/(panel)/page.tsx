import Link from "next/link";
import { FolderKanban, Star, CircleDot, Plus } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { SafeImage } from "@/components/ui/SafeImage";
import { getProjects, getSkillCategories } from "@/lib/content";

export const metadata = {
  title: "Dashboard — Portfolio",
};

export default function DashboardHome() {
  const projects = getProjects();
  const skills = getSkillCategories();

  const stats = [
    { icon: FolderKanban, label: "مشاريع", value: projects.length, accent: "green" as const },
    { icon: Star, label: "مميز", value: projects.filter((p) => p.featured).length, accent: "cyan" as const },
    { icon: CircleDot, label: "قيد التطوير", value: projects.filter((p) => p.status === "in-progress").length, accent: "green" as const },
    { icon: FolderKanban, label: "فئات مهارات", value: skills.length, accent: "cyan" as const },
  ];

  const recent = projects.slice(0, 5);

  return (
    <div className="p-8 lg:p-12 max-w-6xl">
      <div className="mb-10">
        <div className="font-mono text-accent text-sm mb-2">// overview</div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          أهلاً بيك في الداشبورد
        </h1>
        <p className="text-muted">
          من هنا بتدير محتوى البورتفوليو — كل تعديل بيتحفظ مباشرة في ملفات JSON.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">آخر المشاريع</h2>
            <Link
              href="/dashboard/projects"
              className="font-mono text-xs text-accent hover:underline"
            >
              الكل →
            </Link>
          </div>

          <div className="space-y-2">
            {recent.map((p) => (
              <Link
                key={p.slug}
                href={`/dashboard/projects/${p.slug}/edit`}
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-accent/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-bg-2 border border-border overflow-hidden shrink-0">
                  <SafeImage
                    src={p.coverImage}
                    alt={p.title}
                    fallbackText={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate group-hover:text-accent transition-colors">
                    {p.title}
                  </div>
                  <div className="font-mono text-xs text-muted truncate">
                    /{p.slug}
                  </div>
                </div>
                <div className="font-mono text-xs text-muted">
                  {p.year}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-5">إجراءات سريعة</h2>
          <Link
            href="/dashboard/projects/new"
            className="flex items-center gap-3 p-5 bg-accent/10 border border-accent/30 rounded-xl hover:bg-accent/15 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-accent text-black flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <div className="font-medium text-accent">مشروع جديد</div>
              <div className="text-xs text-muted">
                أضف مشروع للبورتفوليو
              </div>
            </div>
          </Link>

          <div className="mt-5 p-5 bg-card border border-border rounded-xl">
            <div className="font-mono text-[10px] text-accent uppercase tracking-wider mb-2">
              معلومة
            </div>
            <p className="text-sm text-muted leading-relaxed">
              كل تعديل بتحفظه من هنا بيتكتب مباشرة في ملفات{" "}
              <code className="text-accent font-mono text-xs">content/*.json</code>
              . اعمل commit بعد التعديلات عشان ترفعها.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
