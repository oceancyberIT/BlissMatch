import { NextRequest, NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/backend-proxy';
import {
  INITIAL_APPOINTMENT,
  INITIAL_CONTACT,
  INITIAL_FOOTER,
  INITIAL_NAVIGATION,
} from '@/lib/site-settings-defaults';
import {
  mergeAppointment,
  mergeContact,
  mergeFooter,
  mergeNavigation,
} from '@/lib/site-settings-merge';

function fallbackForKey(key: string) {
  switch (key) {
    case 'navigation':
      return INITIAL_NAVIGATION;
    case 'footer':
      return INITIAL_FOOTER;
    case 'contact':
      return INITIAL_CONTACT;
    case 'appointment':
      return INITIAL_APPOINTMENT;
    default:
      return null;
  }
}

function mergeByKey(key: string, raw: unknown) {
  switch (key) {
    case 'navigation':
      return mergeNavigation(raw);
    case 'footer':
      return mergeFooter(raw);
    case 'contact':
      return mergeContact(raw);
    case 'appointment':
      return mergeAppointment(raw);
    default:
      return raw;
  }
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ key: string }> },
) {
  const { key } = await context.params;
  const fallback = fallbackForKey(key);
  try {
    const res = await fetchBackend(`/site-settings/${encodeURIComponent(key)}`, {
      cache: 'no-store',
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      if (fallback !== null) return NextResponse.json(fallback, { status: 200 });
      return NextResponse.json(data, { status: res.status });
    }
    return NextResponse.json(mergeByKey(key, data), { status: 200 });
  } catch {
    if (fallback !== null) return NextResponse.json(fallback, { status: 200 });
    return NextResponse.json({ message: 'Could not load settings.' }, { status: 500 });
  }
}
