import { NextRequest, NextResponse } from 'next/server';

const backendUrl =
  process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://backend:4000';

export async function GET() {
  try {
    const res = await fetch(`${backendUrl}/admin/home`);
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { message: 'Could not load home content.' },
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
    const res = await fetch(`${backendUrl}/admin/home`, {
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

