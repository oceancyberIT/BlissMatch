import { NextRequest, NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/backend-proxy';

export async function GET(request: NextRequest) {
  const authorization = request.headers.get('authorization');
  if (!authorization) {
    return NextResponse.json({ message: 'Missing authorization token.' }, { status: 401 });
  }
  try {
    const res = await fetchBackend('/admin/media', {
      headers: { Authorization: authorization },
      cache: 'no-store',
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: 'Could not load media library.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authorization = request.headers.get('authorization');
  if (!authorization) {
    return NextResponse.json({ message: 'Missing authorization token.' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const res = await fetchBackend('/admin/media', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: 'Could not save media asset.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authorization = request.headers.get('authorization');
  if (!authorization) {
    return NextResponse.json({ message: 'Missing authorization token.' }, { status: 401 });
  }
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ message: 'id is required.' }, { status: 400 });
    }
    const res = await fetchBackend(`/admin/media/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: {
        Authorization: authorization,
      },
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: 'Could not delete media asset.' }, { status: 500 });
  }
}
