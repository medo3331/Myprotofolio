import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (!password || password !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json(
      { error: "كلمة السر غير صحيحة" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("dash_session", process.env.DASHBOARD_TOKEN!, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 يوم
  });
  return res;
}
