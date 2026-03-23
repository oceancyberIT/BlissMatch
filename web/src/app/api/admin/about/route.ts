import { NextRequest, NextResponse } from 'next/server';

const backendCandidates = [
  process.env.BACKEND_URL,
  process.env.NEXT_PUBLIC_API_URL,
  'http://localhost:4000',
  'http://localhost:4001',
  'http://backend:4000',
].filter(Boolean) as string[];

async function proxy(path: string, init?: RequestInit) {
  let lastError: unknown = null;
  for (const base of backendCandidates) {
    try {
      const res = await fetch(`${base}${path}`, init);
      if (res.ok || res.status !== 500) return res;
      lastError = new Error(`Backend ${base} responded ${res.status}`);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError ?? new Error('No backend candidates available');
}

export async function GET() {
  try {
    const res = await proxy('/admin/about-page');
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { message: 'Could not load about content.' },
      { status: 500 },
    );
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
    const res = await proxy('/admin/about-page', {
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
      { message: 'Could not save about content.' },
      { status: 500 },
    );
  }
}

