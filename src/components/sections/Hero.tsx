"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ProfileImage } from "./ProfileImage";
import { Terminal } from "./Terminal";
import type { Site } from "@/lib/types";

export function Hero({ site }: { site: Site }) {
  return (
    <section className="min-h-screen flex items-center pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/25 rounded-full font-mono text-xs text-accent mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {site.availability}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6 text-balance">
              أبني <span className="gradient-text">أنظمة ويب</span>
              <br />
              بفكر كـ مهاجم،
              <br />
              بسلّم كـ مطوّر.
            </h1>

            <p className="text-muted text-base md:text-lg max-w-xl mb-10 leading-relaxed">
              {site.shortBio}
            </p>

            <div className="flex gap-3 flex-wrap">
              <Button href="/projects">شوف شغلي ←</Button>
              <Button href="/contact" variant="ghost">
                تواصل معي
              </Button>
            </div>
          </motion.div>

          {/* Visuals */}
          <div className="space-y-10">
            <ProfileImage src={site.profileImage} alt={site.name} />
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  );
}
