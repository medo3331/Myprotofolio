import type { Project } from "./types";
import {
  readProjectsFile,
  writeProjects as writeProjectsFile,
} from "./fileStore";
import { readJson, writeJson } from "./github";

const PROJECTS_PATH = "content/projects.json";

const useGitHub = () => process.env.USE_GITHUB_STORE === "true";

export async function loadProjects(): Promise<Project[]> {
  if (useGitHub()) {
    const projects = await readJson<Project[]>(PROJECTS_PATH);
    return projects.sort((a, b) => a.order - b.order);
  }
  return readProjectsFile();
}

export async function saveProjects(
  projects: Project[],
  commitMessage: string
): Promise<void> {
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  if (useGitHub()) {
    await writeJson(PROJECTS_PATH, sorted, commitMessage);
    return;
  }
  await writeProjectsFile(sorted);
}
