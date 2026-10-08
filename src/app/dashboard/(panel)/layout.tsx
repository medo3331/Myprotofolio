import { Sidebar } from "@/components/dashboard/Sidebar";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen" dir="rtl">
      <Sidebar />
      <main className="flex-1 bg-bg overflow-x-hidden">{children}</main>
    </div>
  );
}
