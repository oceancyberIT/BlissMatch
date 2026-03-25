import { NextRequest, NextResponse } from "next/server";

// Browsers commonly request `/favicon.ico` even if we provide PNG icons via metadata.
// Redirecting to the PNG ensures the request resolves quickly and reliably.
export function GET(req: NextRequest) {
  return NextResponse.redirect(new URL("/logo1.png", req.url), 307);
}

