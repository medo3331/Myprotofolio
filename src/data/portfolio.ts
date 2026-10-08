export const portfolioData = {
  name: "Your Name",
  role: "Frontend Developer",
  tagline: "I build fast, beautiful, and accessible web experiences.",
  location: "Cairo, Egypt",
  email: "you@example.com",
  phone: "+20 100 000 0000",
  about:
    "I'm a passionate developer who loves turning ideas into real, polished products. I focus on clean code, great UX, and performance. Currently open to freelance work and full-time opportunities.",
  socials: {
    github: "https://github.com/yourname",
    linkedin: "https://linkedin.com/in/yourname",
    twitter: "https://x.com/yourname",
    cv: "#",
  },
  skills: [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"] },
    { category: "Backend", items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"] },
    { category: "Tools", items: ["Git & GitHub", "VS Code", "Figma", "Vercel", "Docker"] },
  ],
  projects: [
    {
      title: "E-Commerce Store",
      description: "A full-featured online store with cart, checkout, and admin dashboard. Built with Next.js and Stripe.",
      tags: ["Next.js", "TypeScript", "Stripe", "Tailwind"],
      link: "#",
      github: "#",
    },
    {
      title: "Task Manager App",
      description: "A Kanban-style task manager with drag & drop, dark mode, and real-time sync.",
      tags: ["React", "Firebase", "Tailwind"],
      link: "#",
      github: "#",
    },
    {
      title: "Personal Blog",
      description: "A fast MDX-powered blog with SEO, RSS, and reading-time estimates.",
      tags: ["Next.js", "MDX", "SEO"],
      link: "#",
      github: "#",
    },
  ],
  experience: [
    {
      role: "Frontend Developer",
      company: "Freelance",
      period: "2024 — Present",
      description: "Building responsive websites and web apps for clients. Focus on React, Next.js, and performance optimization.",
    },
    {
      role: "Web Developer Intern",
      company: "Tech Company",
      period: "2023 — 2024",
      description: "Worked with a team to build landing pages and dashboards. Learned Git workflow, code review, and agile.",
    },
  ],
};

// ✏️ HOW TO CUSTOMIZE:
// 1. Replace name, role, email, phone, socials with your real info.
// 2. Edit skills, projects, experience arrays.
// 3. Everything on the site reads from this file — no need to touch components.
