import { NextRequest, NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/backend-proxy';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ key: string }> },
) {
  const { key } = await context.params;
  const authorization = request.headers.get('authorization');
  try {
    const res = await fetchBackend(`/admin/site-settings/${encodeURIComponent(key)}`, {
      headers: authorization ? { Authorization: authorization } : {},
      cache: 'no-store',
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: 'Could not load settings.' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ key: string }> },
) {
  const { key } = await context.params;
  const authorization = request.headers.get('authorization');
  if (!authorization) {
    return NextResponse.json({ message: 'Missing authorization token.' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const res = await fetchBackend(`/admin/site-settings/${encodeURIComponent(key)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: 'Could not save settings.' }, { status: 500 });
  }
}
