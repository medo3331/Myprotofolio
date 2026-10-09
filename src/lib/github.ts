const API = "https://api.github.com";

type GitHubFile = { content: string; sha: string };

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH ?? "main";

  if (!token || !owner || !repo) {
    throw new Error(
      "GitHub env vars ناقصة: GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO"
    );
  }
  return { token, owner, repo, branch };
}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

export async function readFile(path: string): Promise<GitHubFile> {
  const { token, owner, repo, branch } = getConfig();
  const res = await fetch(
    `${API}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
    { headers: headers(token), cache: "no-store" }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub read failed [${res.status}]: ${text}`);
  }

  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return { content, sha: data.sha };
}

export async function writeFile(
  path: string,
  content: string,
  message: string
): Promise<void> {
  const { token, owner, repo, branch } = getConfig();

  let sha: string | undefined;
  try {
    const existing = await readFile(path);
    sha = existing.sha;
  } catch {
    // ملف جديد
  }

  const body: Record<string, unknown> = {
    message,
    content: Buffer.from(content, "utf-8").toString("base64"),
    branch,
  };
  if (sha) body.sha = sha;

  const res = await fetch(`${API}/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: headers(token),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub write failed [${res.status}]: ${text}`);
  }
}

export async function readJson<T>(path: string): Promise<T> {
  const { content } = await readFile(path);
  return JSON.parse(content) as T;
}

export async function writeJson(
  path: string,
  data: unknown,
  message: string
): Promise<void> {
  const content = JSON.stringify(data, null, 2) + "\n";
  await writeFile(path, content, message);
}
