// ============ SITE ============
export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export interface Site {
  name: string;
  handle: string;
  title: string;
  shortBio: string;
  longBio: string[];
  email: string;
  location?: string;
  availability: string;
  profileImage: string;
  resumeUrl?: string;
  social: SocialLinks;
}

// ============ SECTIONS ============
export type SectionKey = "about" | "skills" | "projects" | "cyber" | "journey" | "contact";

export interface SectionMeta {
  key: SectionKey;
  title: string;
  subtitle?: string;
  tag: string;
  image?: string;
  description: string;
  order: number;
}

// ============ SKILLS ============
export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  image?: string;
  items: string[];
  order: number;
}

// ============ PROJECTS ============
export type ProjectStatus = "live" | "in-progress" | "planned";

export interface ProjectLink {
  live?: string;
  github?: string;
  demo?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  gallery: string[];
  technologies: string[];
  status: ProjectStatus;
  featured: boolean;
  year: number;
  role: string;
  duration?: string;
  links: ProjectLink;
  challenge?: string;
  solution?: string;
  results?: string[];
  order: number;
}

// ============ JOURNEY ============
export interface JourneyItem {
  year: string;
  title: string;
  description: string;
  order: number;
}

// ============ CYBER ============
export interface CyberItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface Cyber {
  heroImage: string;
  intro: string;
  items: CyberItem[];
}

// ============ STATS ============
export interface Stat {
  value: string;
  label: string;
}
