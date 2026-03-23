import { NextRequest, NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/backend-proxy';

export async function GET(request: NextRequest) {
  const authorization = request.headers.get('authorization');
  if (!authorization) {
    return NextResponse.json({ message: 'Missing authorization token.' }, { status: 401 });
  }
  try {
    const res = await fetchBackend('/admin/enquiries', {
      headers: { Authorization: authorization },
      cache: 'no-store',
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: 'Could not load enquiries.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const authorization = request.headers.get('authorization');
  if (!authorization) {
    return NextResponse.json({ message: 'Missing authorization token.' }, { status: 401 });
  }
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ message: 'id and status are required.' }, { status: 400 });
    }
    const res = await fetchBackend(`/admin/enquiries/${encodeURIComponent(id)}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      body: JSON.stringify({ status }),
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: 'Could not update enquiry.' }, { status: 500 });
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
    const res = await fetchBackend(`/admin/enquiries/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { Authorization: authorization },
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: 'Could not delete enquiry.' }, { status: 500 });
  }
}
