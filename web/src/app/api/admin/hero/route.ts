import { NextRequest, NextResponse } from "next/server";
import { fetchBackend } from "@/lib/backend-proxy";

export async function GET(request: NextRequest) {
  const route = request.nextUrl.searchParams.get("route");
  if (!route) {
    return NextResponse.json({ message: "route is required" }, { status: 400 });
  }

  try {
    const res = await fetchBackend(
      `/admin/hero?route=${encodeURIComponent(route)}`,
    );
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { message: "Could not load hero section." },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json(
      { message: "Missing authorization token." },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const res = await fetchBackend(`/admin/hero`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { message: "Could not save hero section." },
      { status: 500 },
    );
  }
}

