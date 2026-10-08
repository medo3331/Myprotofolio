import { NextResponse } from "next/server";
import { writeProjects, readProjectsFile } from "@/lib/fileStore";
import type { Project } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

// GET one
export async function GET(_: Request, { params }: Props) {
  const { slug } = await params;
  const projects = await readProjectsFile();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return NextResponse.json({ error: "غير موجود" }, { status: 404 });
  }
  return NextResponse.json(project);
}

// PUT update
export async function PUT(req: Request, { params }: Props) {
  const { slug } = await params;
  const body = (await req.json()) as Partial<Project>;

  const projects = await readProjectsFile();
  const index = projects.findIndex((p) => p.slug === slug);

  if (index === -1) {
    return NextResponse.json({ error: "غير موجود" }, { status: 404 });
  }

  // لو حاول يغير الـ slug، لازم نتأكد إنه مش مستخدم
  if (body.slug && body.slug !== slug) {
    if (!/^[a-z0-9-]+$/.test(body.slug)) {
      return NextResponse.json(
        { error: "slug غير صالح" },
        { status: 400 }
      );
    }
    if (projects.some((p) => p.slug === body.slug)) {
      return NextResponse.json(
        { error: "الـ slug ده مستخدم بالفعل" },
        { status: 409 }
      );
    }
  }

  const updated: Project = { ...projects[index], ...body, slug: body.slug ?? slug };
  projects[index] = updated;
  await writeProjects(projects);

  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(_: Request, { params }: Props) {
  const { slug } = await params;
  const projects = await readProjectsFile();
  const filtered = projects.filter((p) => p.slug !== slug);

  if (filtered.length === projects.length) {
    return NextResponse.json({ error: "غير موجود" }, { status: 404 });
  }

  await writeProjects(filtered);
  return NextResponse.json({ ok: true });
}
