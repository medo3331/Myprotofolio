import fs from "fs";
import path from "path";
import type {
  Site,
  SectionMeta,
  SkillCategory,
  Project,
  JourneyItem,
  Cyber,
} from "./types";

const contentDir = path.join(process.cwd(), "content");

function readJson<T>(filename: string): T {
  const fullPath = path.join(contentDir, filename);
  const raw = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(raw) as T;
}

// ============ SITE ============
export function getSite(): Site {
  return readJson<Site>("site.json");
}

// ============ SECTIONS ============
export function getSections(): SectionMeta[] {
  const sections = readJson<SectionMeta[]>("sections.json");
  return sections.sort((a, b) => a.order - b.order);
}

export function getSection(key: string): SectionMeta | undefined {
  return getSections().find((s) => s.key === key);
}

// ============ SKILLS ============
export function getSkillCategories(): SkillCategory[] {
  const data = readJson<{ categories: SkillCategory[] }>("skills.json");
  return data.categories.sort((a, b) => a.order - b.order);
}

// ============ PROJECTS ============
export function getProjects(): Project[] {
  const projects = readJson<Project[]>("projects.json");
  return projects.sort((a, b) => a.order - b.order);
}

export function getFeaturedProject(): Project | undefined {
  return getProjects().find((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

// ============ JOURNEY ============
export function getJourney(): JourneyItem[] {
  const items = readJson<JourneyItem[]>("journey.json");
  return items.sort((a, b) => a.order - b.order);
}

// ============ CYBER ============
export function getCyber(): Cyber {
  const data = readJson<Cyber>("cyber.json");
  return {
    ...data,
    items: data.items.sort((a, b) => a.order - b.order),
  };
}
