import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  external,
}: Props) {
  const classes = cn(
    "inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300",
    variant === "primary" &&
      "bg-accent text-black hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,255,157,0.3)]",
    variant === "ghost" &&
      "border border-border text-text hover:border-accent hover:text-accent",
    className
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
