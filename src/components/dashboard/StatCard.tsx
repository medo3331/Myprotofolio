import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  accent?: "green" | "cyan";
};

export function StatCard({ icon: Icon, label, value, accent = "green" }: Props) {
  const colorClass =
    accent === "green" ? "text-accent" : "text-accent-2";
  const bgClass =
    accent === "green"
      ? "bg-accent/10 border-accent/20"
      : "bg-accent-2/10 border-accent-2/20";

  return (
    <div className="bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-colors">
      <div
        className={`w-11 h-11 rounded-xl ${bgClass} border flex items-center justify-center ${colorClass} mb-5`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-3xl font-bold font-mono mb-1">{value}</div>
      <div className="text-sm text-muted">{label}</div>
    </div>
  );
}
