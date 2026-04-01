import { NextRequest, NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/backend-proxy';

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
};

export async function GET() {
  try {
    const res = await fetchBackend('/admin/success-stories', { cache: 'no-store' });
    const data = await res.json().catch(() => []);
    if (!res.ok || !Array.isArray(data)) {
      return NextResponse.json([], { status: 200, headers: NO_STORE_HEADERS });
    }
    return NextResponse.json(data, { status: 200, headers: NO_STORE_HEADERS });
  } catch {
    return NextResponse.json([], { status: 200, headers: NO_STORE_HEADERS });
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
    const res = await fetchBackend('/admin/success-stories', {
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
      { message: 'Could not save success stories.' },
      { status: 500 },
    );
  }
}

