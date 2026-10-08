"use client";

import { motion } from "framer-motion";

export function ProfileImage({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] mx-auto"
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-accent/20 blur-3xl animate-pulse" />

      {/* Rotating gradient ring */}
      <div className="absolute inset-0 rounded-full p-[3px] bg-[conic-gradient(from_0deg,#00ff9d,#00d9ff,#00ff9d)] animate-[spin_8s_linear_infinite]">
        <div className="w-full h-full rounded-full bg-bg" />
      </div>

      {/* Image */}
      <div className="absolute inset-[8px] rounded-full overflow-hidden border-2 border-bg bg-card">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/600x600/141414/00ff9d?text=Profile";
          }}
        />
      </div>

      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-bg border border-accent/40 rounded-full font-mono text-xs text-accent whitespace-nowrap shadow-[0_0_20px_rgba(0,255,157,0.3)]"
      >
        &lt;/&gt; Full-Stack
      </motion.div>
    </motion.div>
  );
}
