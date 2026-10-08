import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";

const base = "https://your-domain.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getProjects();

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/skills",
    "/projects",
    "/cyber",
    "/contact",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.8,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages];
}
