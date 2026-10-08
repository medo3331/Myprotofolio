import { Reveal } from "@/components/ui/Reveal";
import type { ReactNode } from "react";

type Props = {
  tag: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHeader({ tag, title, description, children }: Props) {
  return (
    <section className="pt-40 pb-16 border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <span className="font-mono text-accent text-sm">// {tag}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-4 mb-5 text-balance">
            {title}
          </h1>
          {description && (
            <p className="text-muted text-lg max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
