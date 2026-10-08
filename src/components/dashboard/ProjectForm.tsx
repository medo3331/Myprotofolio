"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Trash2 } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import type { Project } from "@/lib/types";

type Props = {
  initial?: Project;
  mode: "create" | "edit";
};

const emptyProject: Partial<Project> = {
  slug: "",
  title: "",
  tagline: "",
  shortDescription: "",
  description: "",
  coverImage: "",
  gallery: [],
  technologies: [],
  status: "in-progress",
  featured: false,
  year: 2026,
  role: "",
  duration: "",
  links: {},
  challenge: "",
  solution: "",
  results: [],
  order: 99,
};

const inputClass =
  "w-full bg-bg-2 border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors";

export function ProjectForm({ initial, mode }: Props) {
  const router = useRouter();
  const [data, setData] = useState<Partial<Project>>(initial ?? emptyProject);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function update<K extends keyof Project>(key: K, value: Project[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function updateLink(key: "live" | "github" | "demo", value: string) {
    setData((d) => ({
      ...d,
      links: { ...(d.links ?? {}), [key]: value },
    }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    const url =
      mode === "create"
        ? "/api/dashboard/projects"
        : `/api/dashboard/projects/${initial!.slug}`;

    const method = mode === "create" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "فشل الحفظ");
        return;
      }

      setSuccess("تم الحفظ بنجاح ✓");

      if (mode === "create") {
        router.push(`/dashboard/projects/${json.slug}/edit`);
      }
      router.refresh();
    } catch {
      setError("خطأ في الاتصال");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("متأكد إنك عايز تحذف المشروع ده؟ الإجراء ده لا يمكن التراجع عنه.")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/dashboard/projects/${initial!.slug}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        setError("فشل الحذف");
        return;
      }

      router.push("/dashboard/projects");
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {data.coverImage ? (
        <div className="rounded-2xl overflow-hidden border border-border bg-bg-2 aspect-video">
          <SafeImage
            src={data.coverImage}
            alt={data.title || "preview"}
            fallbackText="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}

      <Section title="المعلومات الأساسية" tag="01">
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="العنوان" required>
            <input
              type="text"
              value={data.title ?? ""}
              onChange={(e) => update("title", e.target.value)}
              className={inputClass}
              required
            />
          </Field>

          <Field label="الـ slug (بالإنجليزية فقط)" required>
            <input
              type="text"
              value={data.slug ?? ""}
              onChange={(e) =>
                update("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))
              }
              className={inputClass + " font-mono"}
              required
            />
          </Field>
          <Field label="Tagline (جملة قصيرة)">
            <input
              type="text"
              value={data.tagline ?? ""}
              onChange={(e) => update("tagline", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="السنة">
            <input
              type="number"
              value={data.year ?? ""}
              onChange={(e) => update("year", Number(e.target.value))}
              className={inputClass + " font-mono"}
            />
          </Field>

          <Field label="الدور">
            <input
              type="text"
              value={data.role ?? ""}
              onChange={(e) => update("role", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="المدة">
            <input
              type="text"
              value={data.duration ?? ""}
              onChange={(e) => update("duration", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Short Description (سطرين)">
          <textarea
            value={data.shortDescription ?? ""}
            onChange={(e) => update("shortDescription", e.target.value)}
            className={inputClass + " min-h-[80px]"}
          />
        </Field>

        <Field label="Description (تفصيلي)">
          <textarea
            value={data.description ?? ""}
            onChange={(e) => update("description", e.target.value)}
            className={inputClass + " min-h-[120px]"}
          />
        </Field>
      </Section>

      {/* Media & Tech */}
      <Section title="الوسائط والتقنيات" tag="02">
        <Field label="رابط صورة الغلاف">
          <input
            type="text"
            value={data.coverImage ?? ""}
            onChange={(e) => update("coverImage", e.target.value)}
            className={inputClass + " font-mono"}
            placeholder="/images/projects/xxx/cover.jpg"
          />
        </Field>

        <Field label="صور المعرض (سطر لكل رابط)">
          <textarea
            value={(data.gallery ?? []).join("\n")}
            onChange={(e) =>
              update(
                "gallery",
                e.target.value.split("\n").map((s) => s.trim()).filter(Boolean)
              )
            }
            className={inputClass + " font-mono min-h-[100px]"}
            placeholder="/images/projects/xxx/1.jpg"
          />
        </Field>

        <Field label="التقنيات (افصل بفاصلة)">
          <input
            type="text"
            value={(data.technologies ?? []).join(", ")}
            onChange={(e) =>
              update(
                "technologies",
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
              )
            }
            className={inputClass}
            placeholder="Next.js, Tailwind, Node.js"
          />
        </Field>
      </Section>

      {/* Status */}
      <Section title="الحالة والتمييز" tag="03">
        <div className="grid md:grid-cols-3 gap-5">
          <Field label="الحالة">
            <select
              value={data.status ?? "in-progress"}
              onChange={(e) =>
                update("status", e.target.value as Project["status"])
              }
              className={inputClass}
            >
              <option value="live">يعمل</option>
              <option value="in-progress">قيد التطوير</option>
              <option value="planned">مخطط</option>
            </select>
          </Field>

          <Field label="الترتيب">
            <input
              type="number"
              value={data.order ?? 99}
              onChange={(e) => update("order", Number(e.target.value))}
              className={inputClass + " font-mono"}
            />
          </Field>

          <Field label="مميز؟">
            <label className="flex items-center gap-3 cursor-pointer h-full pt-2">
              <input
                type="checkbox"
                checked={data.featured ?? false}
                onChange={(e) => update("featured", e.target.checked)}
                className="w-5 h-5 accent-[#00ff9d] cursor-pointer"
              />
              <span className="text-sm text-muted">
                يظهر في المقدمة
              </span>
            </label>
          </Field>
        </div>
      </Section>

      {/* Case Study */}
      <Section title="Case Study" tag="04">
        <Field label="التحدي">
          <textarea
            value={data.challenge ?? ""}
            onChange={(e) => update("challenge", e.target.value)}
            className={inputClass + " min-h-[100px]"}
          />
        </Field>

        <Field label="الحل">
          <textarea
            value={data.solution ?? ""}
            onChange={(e) => update("solution", e.target.value)}
            className={inputClass + " min-h-[100px]"}
          />
        </Field>

        <Field label="النتائج (سطر لكل نتيجة)">
          <textarea
            value={(data.results ?? []).join("\n")}
            onChange={(e) =>
              update(
                "results",
                e.target.value.split("\n").map((s) => s.trim()).filter(Boolean)
              )
            }
            className={inputClass + " min-h-[100px]"}
          />
        </Field>
      </Section>

      {/* Links */}
      <Section title="الروابط" tag="05">
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Live URL">
            <input
              type="url"
              value={data.links?.live ?? ""}
              onChange={(e) => updateLink("live", e.target.value)}
              className={inputClass + " font-mono"}
              dir="ltr"
            />
          </Field>
          <Field label="GitHub URL">
            <input
              type="url"
              value={data.links?.github ?? ""}
              onChange={(e) => updateLink("github", e.target.value)}
              className={inputClass + " font-mono"}
              dir="ltr"
            />
          </Field>
        </div>
      </Section>

      {/* Feedback */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-accent/10 border border-accent/30 text-accent text-sm rounded-lg px-4 py-3">
          {success}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black rounded-lg font-medium text-sm hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,255,157,0.3)] transition-all disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "جاري الحفظ..." : "حفظ"}
        </button>

        {mode === "edit" && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 px-6 py-3 border border-red-500/30 text-red-400 rounded-lg font-medium text-sm hover:bg-red-500/10 transition-all disabled:opacity-50"
          >
            {deleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            حذف المشروع
          </button>
        )}
      </div>
    </form>
  );
}

function Section({
  title,
  tag,
  children,
}: {
  title: string;
  tag: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <span className="font-mono text-accent text-xs">{tag}.</span>
        <h2 className="font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-mono text-[11px] text-accent uppercase tracking-wider mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}
