import fs from "fs/promises";
import path from "path";
import type { Project } from "./types";

const contentDir = path.join(process.cwd(), "content");

async function writeJson(filename: string, data: unknown) {
  const fullPath = path.join(contentDir, filename);
  await fs.writeFile(fullPath, JSON.stringify(data, null, 2), "utf-8");
}

export async function writeProjects(projects: Project[]) {
  await writeJson("projects.json", projects);
}

// helpers to read from disk (fresh, not from cache)
export async function readProjectsFile(): Promise<Project[]> {
  const fullPath = path.join(contentDir, "projects.json");
  const raw = await fs.readFile(fullPath, "utf-8");
  const data = JSON.parse(raw) as Project[];
  return data.sort((a, b) => a.order - b.order);
}
