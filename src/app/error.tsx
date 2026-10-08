"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6" dir="rtl">
      <div className="text-center">
        <div className="font-mono text-red-400 text-sm mb-4">
          // something went wrong
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          حصل خطأ غير متوقع
        </h1>
        <p className="text-muted mb-8 max-w-md mx-auto">
          معلش، حصلت مشكلة أثناء تحميل الصفحة. جرب تاني أو ارجع للرئيسية.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black rounded-lg font-medium text-sm hover:-translate-y-0.5 transition-all"
          >
            حاول تاني
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-sm hover:border-accent hover:text-accent transition-all"
          >
            الرئيسية
          </Link>
        </div>
      </div>
    </main>
  );
}
