import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "@/components/dashboard/ProjectForm";
import { getProjectBySlug, getProjects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function EditProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="p-8 lg:p-12 max-w-4xl">
      <Link
        href="/dashboard/projects"
        className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4 rotate-180" />
        كل المشاريع
      </Link>

      <div className="mb-8">
        <div className="font-mono text-accent text-sm mb-2">
          // edit — {slug}
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          {project.title}
        </h1>
      </div>

      <ProjectForm mode="edit" initial={project} />
    </div>
  );
}
