import { portfolioData } from "@/data/portfolio";

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold text-white sm:text-3xl">
      <span className="font-mono text-lg text-emerald-400">▸</span>
      {children}
    </h2>
  );
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20">
      <SectionTitle>About Me</SectionTitle>
      <p className="max-w-3xl text-lg leading-8 text-zinc-400">{portfolioData.about}</p>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20">
      <SectionTitle>Skills</SectionTitle>
      <div className="grid gap-6 sm:grid-cols-3">
        {portfolioData.skills.map((group) => (
          <div
            key={group.category}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/40"
          >
            <h3 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-emerald-400">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20">
      <SectionTitle>Projects</SectionTitle>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioData.projects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-emerald-400/40"
          >
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-zinc-400">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="font-mono text-xs text-emerald-400">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex gap-4 text-sm font-medium">
              <a href={project.link} className="text-white transition hover:text-emerald-400">
                Live Demo →
              </a>
              <a href={project.github} className="text-zinc-400 transition hover:text-emerald-400">
                GitHub →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20">
      <SectionTitle>Experience</SectionTitle>
      <div className="space-y-6">
        {portfolioData.experience.map((job) => (
          <div
            key={job.role + job.company}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-bold text-white">
                {job.role} <span className="text-emerald-400">@ {job.company}</span>
              </h3>
              <span className="font-mono text-xs text-zinc-500">{job.period}</span>
            </div>
            <p className="mt-2 leading-7 text-zinc-400">{job.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20 text-center">
      <p className="font-mono text-sm text-emerald-400">What&apos;s next?</p>
      <h2 className="mt-2 text-4xl font-extrabold text-white">Get In Touch</h2>
      <p className="mx-auto mt-4 max-w-xl text-zinc-400">
        I&apos;m currently open to new opportunities. Whether you have a question or just want to
        say hi, my inbox is always open!
      </p>
      <a
        href={`mailto:${portfolioData.email}`}
        className="mt-8 inline-block rounded-full bg-emerald-500 px-8 py-3 font-medium text-zinc-950 transition hover:bg-emerald-400"
      >
        Say Hello
      </a>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
        <a href={portfolioData.socials.github} className="transition hover:text-emerald-400">GitHub</a>
        <a href={portfolioData.socials.linkedin} className="transition hover:text-emerald-400">LinkedIn</a>
        <a href={portfolioData.socials.twitter} className="transition hover:text-emerald-400">Twitter</a>
        <span>{portfolioData.email}</span>
        <span>{portfolioData.phone}</span>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center font-mono text-xs text-zinc-500">
      Built with Next.js & Tailwind CSS — © {2026} {portfolioData.name}
    </footer>
  );
}
