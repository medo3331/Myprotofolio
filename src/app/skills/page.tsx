import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { getSite, getSkillCategories } from "@/lib/content";

export const metadata = { title: "المهارات — Portfolio" };

export default function SkillsPage() {
  const site = getSite();
  const categories = getSkillCategories();

  return (
    <>
      <Navbar handle={site.handle} />
      <main>
        <PageHeader
          tag="الأدوات"
          title="المهارات والتقنيات"
          description="تقنيات استخدمتها في مشاريع حقيقية — مش مجرد أسماء على ورق."
        />

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 0.06}>
                <div className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
                  {/* Image */}
                  <div className="aspect-video bg-bg-2 overflow-hidden relative">
                    <SafeImage
                      src={cat.image || ""}
                      alt={cat.title}
                      fallbackText={cat.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent pointer-events-none" />

                    <div className="absolute bottom-4 right-4 flex items-center gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <h3 className="text-xl font-bold">{cat.title}</h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="font-mono text-[11px] px-2.5 py-1 bg-bg-2 border border-border rounded text-muted hover:text-accent hover:border-accent/40 transition-colors"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer name={site.name} />
    </>
  );
}
