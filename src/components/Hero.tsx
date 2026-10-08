import { portfolioData } from "@/data/portfolio";

export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col justify-center px-6 pt-16">
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-4 font-mono text-sm text-emerald-400">Hi, my name is</p>
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
          {portfolioData.name}
        </h1>
        <h2 className="mt-3 text-3xl font-bold text-zinc-400 sm:text-5xl">
          {portfolioData.role}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
          {portfolioData.tagline}
        </p>
        <p className="mt-2 text-sm text-zinc-500">📍 {portfolioData.location}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-full bg-emerald-500 px-6 py-3 font-medium text-zinc-950 transition hover:bg-emerald-400"
          >
            View My Work
          </a>
          <a
            href={portfolioData.socials.cv}
            className="rounded-full border border-zinc-700 px-6 py-3 font-medium text-white transition hover:border-emerald-400 hover:text-emerald-400"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
