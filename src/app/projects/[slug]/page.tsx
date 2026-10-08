import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { getProjectBySlug, getProjects, getSite } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "غير موجود" };
  return {
    title: `${project.title} — Portfolio`,
    description: project.shortDescription,
  };
}

const statusLabel: Record<string, string> = {
  live: "يعمل",
  "in-progress": "قيد التطوير",
  planned: "مخطط",
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const site = getSite();

  if (!project) notFound();

  return (
    <>
      <Navbar handle={site.handle} />
      <main>
        {/* HERO */}
        <section className="pt-40 pb-16">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-accent transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4 rotate-180" />
                كل المشاريع
              </Link>

              <span className="block font-mono text-accent text-sm mb-3">
                // {project.tagline}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                {project.title}
              </h1>
              <p className="text-muted text-lg max-w-3xl leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="flex gap-3 flex-wrap">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-black rounded-lg text-sm font-medium hover:-translate-y-0.5 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    شوف الموقع
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg text-sm hover:border-accent hover:text-accent transition-all"
                  >
                    <Code2 className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* COVER */}
        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-border bg-bg-2">
                <SafeImage
                  src={project.coverImage}
                  alt={project.title}
                  fallbackText={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* META + CONTENT */}
        <section className="pb-24">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Main */}
            <div className="space-y-14">
              {project.challenge && (
                <Reveal>
                  <div>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="font-mono text-accent text-sm">
                        01.
                      </span>
                      التحدي
                    </h2>
                    <p className="text-muted leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                </Reveal>
              )}

              {project.solution && (
                <Reveal>
                  <div>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="font-mono text-accent text-sm">
                        02.
                      </span>
                      الحل
                    </h2>
                    <p className="text-muted leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </Reveal>
              )}

              {project.results && project.results.length > 0 && (
                <Reveal>
                  <div>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="font-mono text-accent text-sm">
                        03.
                      </span>
                      النتائج
                    </h2>
                    <ul className="space-y-3">
                      {project.results.map((r, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-muted leading-relaxed"
                        >
                          <span className="text-accent mt-1.5">▸</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
              {project.gallery && project.gallery.length > 0 && (
                <Reveal>
                  <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <span className="font-mono text-accent text-sm">
                        04.
                      </span>
                      صور من المشروع
                    </h2>
                    <div className="grid md:grid-cols-2 gap-5">
                      {project.gallery.map((img, i) => (
                        <div
                          key={i}
                          className="aspect-video rounded-xl overflow-hidden border border-border bg-bg-2"
                        >
                          <SafeImage
                            src={img}
                            alt={`${project.title} ${i + 1}`}
                            fallbackText={`${i + 1}`}
                            fallbackColor="00d9ff"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
            {/* Sidebar */}
            <aside className="lg:sticky lg:top-28 h-fit space-y-6">
              <Reveal>
                <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                  <div>
                    <div className="font-mono text-[10px] text-accent uppercase tracking-wider mb-1.5">
                      الحالة
                    </div>
                    <div className="text-sm">
                      {statusLabel[project.status]}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-accent uppercase tracking-wider mb-1.5">
                      الدور
                    </div>
                    <div className="text-sm">{project.role}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-accent uppercase tracking-wider mb-1.5">
                      السنة
                    </div>
                    <div className="text-sm font-mono">{project.year}</div>
                  </div>
                  {project.duration && (
                    <div>
                      <div className="font-mono text-[10px] text-accent uppercase tracking-wider mb-1.5">
                        المدة
                      </div>
                      <div className="text-sm">{project.duration}</div>
                    </div>
                  )}
                  <div>
                    <div className="font-mono text-[10px] text-accent uppercase tracking-wider mb-2.5">
                      التقنيات
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[11px] px-2 py-1 bg-bg-2 border border-border rounded text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </section>

        {/* Next project teaser */}
        <section className="py-16 border-t border-border">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all font-mono text-sm"
            >
              شوف باقي المشاريع
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer name={site.name} />
    </>
  );
}
