import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { Reveal } from "@/components/ui/Reveal";
import { getSite, getProjects, getFeaturedProject } from "@/lib/content";

export const metadata = {
  title: "المشاريع — Portfolio",
};

export default function ProjectsPage() {
  const site = getSite();
  const projects = getProjects();
  const featured = getFeaturedProject();

  return (
    <>
      <Navbar handle={site.handle} />
      <main>
        <PageHeader
          tag="أعمالي"
          title="مشاريع فعلية"
          description="كل مشروع بدأ من فكرة ومشكلة حقيقية — مش مجرد تمارين."
        />

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 space-y-16">
            {featured && (
              <Reveal>
                <FeaturedProject project={featured} />
              </Reveal>
            )}

            <div>
              <Reveal>
                <h2 className="text-2xl font-bold mb-8 tracking-tight">
                  باقي المشاريع
                </h2>
              </Reveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((p) => !p.featured)
                  .map((p, i) => (
                    <Reveal key={p.slug} delay={i * 0.06}>
                      <ProjectCard project={p} />
                    </Reveal>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer name={site.name} />
    </>
  );
}
