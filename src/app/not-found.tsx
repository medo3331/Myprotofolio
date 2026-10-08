import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSite } from "@/lib/content";

export default function NotFound() {
  const site = getSite();

  return (
    <>
      <Navbar handle={site.handle} />
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="font-mono text-accent text-sm mb-4">
            // 404 — not found
          </div>
          <h1 className="text-7xl md:text-9xl font-bold gradient-text mb-6">
            404
          </h1>
          <p className="text-muted text-lg mb-8 max-w-md mx-auto">
            الصفحة اللي بتدور عليها مش موجودة — يمكن اتنقلت أو الرابط غلط.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black rounded-lg font-medium text-sm hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,255,157,0.3)] transition-all"
          >
            ارجع للرئيسية ←
          </Link>
        </div>
      </main>
      <Footer name={site.name} />
    </>
  );
}
