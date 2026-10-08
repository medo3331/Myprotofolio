import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { SectionMeta } from "@/lib/types";

export function SectionGrid({ sections }: { sections: SectionMeta[] }) {
  return (
    <section className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="mb-14">
            <span className="font-mono text-accent text-sm">// استكشف</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight">
              الأقسام
            </h2>
            <p className="text-muted mt-3 max-w-xl">
              كل قسم له صفحته الخاصة — ابدأ باللي يهمك.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.06}>
              <Link
                href={`/${s.key}`}
                className="group block p-6 bg-card border border-border rounded-2xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="font-mono text-accent text-xs">
                    // {s.tag}
                  </span>
                  <ArrowLeft className="w-4 h-4 text-muted group-hover:text-accent group-hover:-translate-x-1 transition-all duration-300" />
                </div>

                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {s.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
