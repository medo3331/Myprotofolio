import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // صفحة الدخول مفتوحة
  if (pathname === "/dashboard/login") return NextResponse.next();

  const token = req.cookies.get("dash_session")?.value;

  if (token !== process.env.DASHBOARD_TOKEN) {
    return NextResponse.redirect(new URL("/dashboard/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
