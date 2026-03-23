import { NextRequest, NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/backend-proxy';

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ key: string }> },
) {
  const { key } = await context.params;
  try {
    const res = await fetchBackend(`/site-settings/${encodeURIComponent(key)}`, {
      cache: 'no-store',
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: 'Could not load settings.' }, { status: 500 });
  }
}
