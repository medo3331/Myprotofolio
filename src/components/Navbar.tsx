import Link from "next/link";
import { portfolioData } from "@/data/portfolio";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="#" className="text-lg font-bold tracking-tight text-white">
          {portfolioData.name.split(" ")[0]}
          <span className="text-emerald-400">.</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-zinc-300 sm:flex">
          <a href="#about" className="transition hover:text-white">About</a>
          <a href="#skills" className="transition hover:text-white">Skills</a>
          <a href="#projects" className="transition hover:text-white">Projects</a>
          <a href="#experience" className="transition hover:text-white">Experience</a>
          <a
            href="#contact"
            className="rounded-full bg-emerald-500 px-4 py-2 font-medium text-zinc-950 transition hover:bg-emerald-400"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
