import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { getSite, getJourney } from "@/lib/content";

export const metadata = { title: "عني — Portfolio" };

export default function AboutPage() {
  const site = getSite();
  const journey = getJourney();

  const stats = [
    { num: "3+", label: "مشاريع جارية" },
    { num: "5+", label: "تقنيات أساسية" },
    { num: "∞", label: "شغف بالتعلم" },
  ];

  return (
    <>
      <Navbar handle={site.handle} />
      <main>
        <PageHeader
          tag="من أنا"
          title="رحلتي في عالم الكود"
          description="من C++ للويب — قصة مطوّر بيتعلم كل يوم."
        />

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
            {/* Bio */}
            <Reveal>
              <div className="space-y-5">
                {site.longBio.map((p, i) => (
                  <p key={i} className="text-muted leading-relaxed">
                    {p}
                  </p>
                ))}

                <div className="grid grid-cols-3 gap-4 mt-10">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="p-5 bg-card border border-border rounded-xl hover:border-accent/40 transition-colors"
                    >
                      <div className="text-3xl font-bold text-accent font-mono">
                        {s.num}
                      </div>
                      <div className="text-xs text-muted mt-1">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Timeline */}
            <Reveal delay={0.15}>
              <div className="relative pr-8">
                <div className="absolute right-2 top-2 bottom-2 w-px bg-gradient-to-b from-accent via-accent-2 to-transparent" />

                {journey.map((item, i) => (
                  <div key={i} className="relative pb-8 last:pb-0">
                    <div className="absolute -right-8 top-1.5 w-4 h-4 rounded-full bg-bg border-2 border-accent shadow-[0_0_12px_rgba(0,255,157,0.4)]" />
                    <div className="font-mono text-accent text-xs mb-1">
                      {item.year}
                    </div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-muted text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer name={site.name} />
    </>
  );
}
