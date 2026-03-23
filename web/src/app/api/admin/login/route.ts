import { NextRequest, NextResponse } from "next/server";
import { fetchBackend } from "@/lib/backend-proxy";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const res = await fetchBackend(`/auth/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Login failed. Please try again." },
      { status: 500 },
    );
  }
}

