import { NextResponse } from "next/server";
import { loadProjects, saveProjects } from "@/lib/store";
import type { Project } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

// GET one
export async function GET(_: Request, { params }: Props) {
  try {
    const { slug } = await params;
    const projects = await loadProjects();
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
      return NextResponse.json({ error: "غير موجود" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

// PUT update
export async function PUT(req: Request, { params }: Props) {
  try {
    const { slug } = await params;
    const body = (await req.json()) as Partial<Project>;

    const projects = await loadProjects();
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

    const updated: Project = {
      ...projects[index],
      ...body,
      slug: body.slug ?? slug,
    };
    projects[index] = updated;

    await saveProjects(projects, `chore(projects): update "${updated.title}"`);

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(_: Request, { params }: Props) {
  try {
    const { slug } = await params;
    const projects = await loadProjects();
    const target = projects.find((p) => p.slug === slug);

    if (!target) {
      return NextResponse.json({ error: "غير موجود" }, { status: 404 });
    }

    const filtered = projects.filter((p) => p.slug !== slug);
    await saveProjects(filtered, `chore(projects): delete "${target.title}"`);

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

