"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  LogOut,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "المشاريع", icon: FolderKanban },
  { href: "/dashboard/skills", label: "المهارات", icon: Wrench, soon: true },
];

function SidebarInner() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/dashboard/login");
    router.refresh();
  }

  return (
    <aside className="w-64 bg-card border-l border-border h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="font-mono font-bold text-accent">
          <span className="opacity-60">$ </span>admin
        </div>
        <div className="text-muted text-xs mt-1 font-mono">
          dashboard v1.0
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);

          if (link.soon) {
            return (
              <div
                key={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted/40 cursor-not-allowed text-sm"
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
                <span className="mr-auto font-mono text-[10px] opacity-60">
                  قريباً
                </span>
              </div>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors",
                active
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "text-muted hover:text-text hover:bg-bg-2"
              )}
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted hover:text-text hover:bg-bg-2 transition-colors"
        >
          <Home className="w-4 h-4" />
          عرض الموقع
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted hover:text-red-400 hover:bg-red-500/5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          خروج
        </button>
      </div>
    </aside>
  );
}

export function Sidebar() {
  return (
    <Suspense fallback={<aside className="w-64 bg-card border-l border-border h-screen" />}>
      <SidebarInner />
    </Suspense>
  );
}
