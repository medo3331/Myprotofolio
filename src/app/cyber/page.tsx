import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { getSite, getCyber } from "@/lib/content";

export const metadata = { title: "الأمن السيبراني — Portfolio" };

export default function CyberPage() {
  const site = getSite();
  const cyber = getCyber();

  return (
    <>
      <Navbar handle={site.handle} />
      <main>
        <PageHeader
          tag="الجانب الأمني"
          title="الأمن السيبراني"
          description={cyber.intro}
        />

        {/* HERO IMAGE */}
        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-accent/20">
                <SafeImage
                  src={cyber.heroImage}
                  alt="Cybersecurity"
                  fallbackText="Cybersecurity"
                  fallbackColor="00ff9d"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-8 right-8">
                  <div className="font-mono text-accent text-xs mb-2">
                    // secure by design
                  </div>
                  <div className="text-2xl md:text-3xl font-bold">
                    بفكر كـ مهاجم — عشان أبني دفاعات أقوى
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ITEMS */}
        <section className="pb-24">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <div className="font-mono text-accent text-sm mb-6">
                $ currently_learning.log
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-5">
              {cyber.items.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.06}>
                  <div className="bg-[#0d0d0d] border border-border rounded-2xl p-6 hover:border-accent/40 transition-colors relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,157,0.02)_2px,rgba(0,255,157,0.02)_4px)]" />

                    <div className="flex gap-4 relative">
                      <div className="text-3xl shrink-0">{item.icon}</div>
                      <div>
                        <h3 className="font-bold mb-2 group-hover:text-accent transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-muted text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer name={site.name} />
    </>
  );
}
