import { NextResponse } from "next/server";
import { loadProjects, saveProjects } from "@/lib/store";
import type { Project } from "@/lib/types";

// GET all
export async function GET() {
  try {
    const projects = await loadProjects();
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

// POST create
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Project>;

    if (!body.slug || !body.title) {
      return NextResponse.json(
        { error: "slug و title مطلوبين" },
        { status: 400 }
      );
    }

    // validate slug format
    if (!/^[a-z0-9-]+$/.test(body.slug)) {
      return NextResponse.json(
        { error: "slug لازم يكون بحروف صغيرة وأرقام وشرطات بس" },
        { status: 400 }
      );
    }

    const projects = await loadProjects();

    if (projects.some((p) => p.slug === body.slug)) {
      return NextResponse.json(
        { error: "الـ slug ده مستخدم بالفعل" },
        { status: 409 }
      );
    }

    const newProject: Project = {
      slug: body.slug,
      title: body.title,
      tagline: body.tagline ?? "",
      shortDescription: body.shortDescription ?? "",
      description: body.description ?? "",
      coverImage: body.coverImage ?? "",
      gallery: body.gallery ?? [],
      technologies: body.technologies ?? [],
      status: body.status ?? "in-progress",
      featured: body.featured ?? false,
      year: body.year ?? new Date().getFullYear(),
      role: body.role ?? "",
      duration: body.duration,
      links: body.links ?? {},
      challenge: body.challenge,
      solution: body.solution,
      results: body.results ?? [],
      order: body.order ?? projects.length + 1,
    };

    projects.push(newProject);
    await saveProjects(projects, `feat(projects): add "${newProject.title}"`);

    return NextResponse.json(newProject, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

