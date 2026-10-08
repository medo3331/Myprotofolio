"use client";

import { motion } from "framer-motion";

const lines = [
  { type: "cmd" as const, text: "whoami" },
  { type: "out" as const, text: "full-stack developer" },
  { type: "cmd" as const, text: "cat skills.txt" },
  { type: "out" as const, text: "[Next.js, C++, Python, Node]" },
  { type: "cmd" as const, text: "ls projects/" },
  { type: "out" as const, text: "magiclly/  gym-system/  uni-system/" },
  { type: "cmd" as const, text: 'echo "let\'s build something"' },
  { type: "out" as const, text: "let's build something" },
];

export function Terminal() {
  return (
    <div
      dir="ltr"
      className="bg-[#0d0d0d] border border-border rounded-xl overflow-hidden shadow-2xl font-mono text-[13px]"
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-auto text-muted text-xs">bash — portfolio</span>
      </div>

      <div className="p-5 space-y-1.5 text-left">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
          >
            {l.type === "cmd" ? (
              <>
                <span className="text-accent">$</span>{" "}
                <span className="text-text">{l.text}</span>
              </>
            ) : (
              <span className="text-accent-2">{l.text}</span>
            )}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + lines.length * 0.15 }}
          className="flex items-center gap-1"
        >
          <span className="text-accent">$</span>
          <span className="w-2 h-4 bg-accent animate-pulse inline-block" />
        </motion.div>
      </div>
    </div>
  );
}
