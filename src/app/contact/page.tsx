import { Mail, Code2, Briefcase, MapPin } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { getSite } from "@/lib/content";

export const metadata = { title: "تواصل — Portfolio" };

type ContactItem = {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
};

export default function ContactPage() {
  const site = getSite();

  const items: ContactItem[] = [];
  items.push({
    icon: Mail,
    label: "الإيميل",
    value: site.email,
    href: `mailto:${site.email}`,
  });
  if (site.social.github) {
    items.push({
      icon: Code2,
      label: "GitHub",
      value: "@" + site.social.github.split("/").pop(),
      href: site.social.github,
    });
  }
  if (site.social.linkedin) {
    items.push({
      icon: Briefcase,
      label: "LinkedIn",
      value: "in/" + site.social.linkedin.split("/").pop(),
      href: site.social.linkedin,
    });
  }
  if (site.location) {
    items.push({ icon: MapPin, label: "الموقع", value: site.location });
  }

  return (
    <>
      <Navbar handle={site.handle} />
      <main>
        <PageHeader
          tag="تواصل"
          title="خليك نعمل حاجة حقيقية"
          description="مفتوح للعمل الحر، التعاون في مشاريع، أو حتى مجرد دردشة تقنية."
        />

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-5">
            {items.map((item, i) => {
              const Icon = item.icon;
              const inner = (
                <>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-accent uppercase tracking-wider mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm truncate" dir="ltr">
                      {item.value}
                    </div>
                  </div>
                </>
              );
              const cardClass =
                "group flex items-center gap-4 p-6 bg-card border border-border rounded-2xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-300";
              return (
                <Reveal key={item.label} delay={i * 0.06}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={`${cardClass} block`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cardClass}>{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>

          {/* Big CTA */}
          <div className="max-w-4xl mx-auto px-6 mt-16 text-center">
            <Reveal>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-black rounded-xl font-bold hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,255,157,0.4)] transition-all"
              >
                <Mail className="w-5 h-5" />
                ابعتلي إيميل دلوقتي
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer name={site.name} />
    </>
  );
}
