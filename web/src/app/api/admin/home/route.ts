import { NextRequest, NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/backend-proxy';
import { INITIAL_CONTENT } from '@/components/admin/home-editor/constants';

export async function GET() {
  try {
    const res = await fetchBackend('/admin/home', { cache: 'no-store' });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data) {
      return NextResponse.json(INITIAL_CONTENT, { status: 200 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(INITIAL_CONTENT, { status: 200 });
  }
}

export async function PUT(request: NextRequest) {
  const authorization = request.headers.get('authorization');

  if (!authorization) {
    return NextResponse.json(
      { message: 'Missing authorization token.' },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const res = await fetchBackend('/admin/home', {
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
    return NextResponse.json(
      { message: 'Could not save home content.' },
      { status: 500 },
    );
  }
}

