'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { EnquiryRow } from '@/lib/site-settings-types';
import { getAdminToken } from '@/lib/admin-site-settings';
import {
  Mail,
  CalendarClock,
  MessageSquare,
  ChevronRight,
  RefreshCw,
  PanelTop,
  PanelBottom,
  LayoutTemplate,
  BookOpen,
  Briefcase,
  Sparkles,
  Shield,
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [rows, setRows] = useState<EnquiryRow[]>([]);

  const loadEnquiries = useCallback(async (silent = false) => {
    const token = getAdminToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }
    if (!silent) setRefreshing(true);
    try {
      const res = await fetch('/api/admin/enquiries', {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json().catch(() => null);
      if (res.ok && Array.isArray(data)) {
        setRows(data as EnquiryRow[]);
      }
    } finally {
      if (!silent) setRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await loadEnquiries(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [loadEnquiries]);

  const metrics = useMemo(() => {
    const total = rows.length;
    const newCount = rows.filter((r) => r.status === 'NEW').length;
    const inProgressCount = rows.filter((r) => r.status === 'IN_PROGRESS').length;
    const appt = rows.filter((r) => r.source === 'APPOINTMENT').length;
    return { total, newCount, inProgressCount, appt };
  }, [rows]);

  const latest = rows.slice(0, 6);

  const shortcutLinks = [
    { name: 'Homepage', href: '/admin/home', icon: LayoutTemplate },
    { name: 'About', href: '/admin/about', icon: BookOpen },
    { name: 'Services', href: '/admin/services', icon: Briefcase },
    { name: 'Appointments', href: '/admin/appointment', icon: CalendarClock },
    { name: 'Contact', href: '/admin/contact', icon: MessageSquare },
    { name: 'Submissions', href: '/admin/submissions', icon: Mail },
    { name: 'Navigation', href: '/admin/navigation', icon: PanelTop },
    { name: 'Footer', href: '/admin/footer', icon: PanelBottom },
    { name: 'Home blocks', href: '/admin/discover-lasting-love', icon: Sparkles },
    { name: 'About sections', href: '/admin/about-philosophy', icon: BookOpen },
    { name: 'Services sections', href: '/admin/services-grid', icon: Briefcase },
  ] as const;

  return (
    <AdminLayout title="Dashboard" description="Overview">
      <div className="min-h-screen space-y-8 bg-soft-ivory-white p-6 lg:p-10">
        <div className="flex flex-col gap-4 border-b border-stone-200 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 space-y-1">
            <h2 className="font-serif text-2xl tracking-tight text-deep-midnight-navy md:text-3xl">
              Submissions overview
            </h2>
            <p className="text-xs text-stone-500">Form entries from your site</p>
          </div>
          <Button
            onClick={() => loadEnquiries()}
            className="flex h-10 shrink-0 gap-2 self-start rounded-full bg-deep-midnight-navy px-5 text-[9px] font-black uppercase tracking-widest text-white transition-all hover:bg-muted-burgundy-rose sm:self-auto"
          >
            <RefreshCw size={12} className={cn(refreshing && 'animate-spin')} />
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {(
            [
              { label: 'Total', val: metrics.total, icon: MessageSquare },
              { label: 'New', val: metrics.newCount, icon: Mail },
              { label: 'In progress', val: metrics.inProgressCount, icon: Shield },
              { label: 'Appointments', val: metrics.appt, icon: CalendarClock },
            ] as const
          ).map((item) => (
            <div key={item.label} className="border border-stone-100 bg-white p-6 shadow-sm">
              <item.icon className="mb-3 h-5 w-5 text-muted-burgundy-rose" />
              <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-stone-400">{item.label}</p>
              <p className="font-serif text-3xl text-deep-midnight-navy">{item.val}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="min-w-0 overflow-hidden border border-stone-100 bg-white shadow-sm lg:col-span-8">
            <div className="flex min-w-0 flex-col gap-3 border-b border-stone-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="flex min-w-0 items-start gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-deep-midnight-navy">
                <MessageSquare size={14} className="mt-0.5 shrink-0 text-muted-burgundy-rose" />
                <span className="min-w-0">Latest</span>
              </h2>
              <Link
                href="/admin/submissions"
                className="shrink-0 self-start whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-muted-burgundy-rose sm:self-auto"
              >
                All submissions
              </Link>
            </div>

            <div className="divide-y divide-stone-50">
              {loading ? (
                <div className="p-5 text-sm text-stone-500">Loading…</div>
              ) : latest.length === 0 ? (
                <div className="p-5 text-sm text-stone-500">None yet.</div>
              ) : (
                latest.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-5">
                    <div className="min-w-0 space-y-1">
                      <p className="text-sm font-semibold text-deep-midnight-navy">{item.fullName}</p>
                      <p className="truncate text-xs text-stone-500">
                        {item.subject || item.inquiryType || item.message}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
                        {item.source === 'APPOINTMENT' ? 'Appointment' : 'Contact'}
                      </p>
                    </div>
                    <div className="space-y-2 text-right">
                      <span
                        className={cn(
                          'inline-flex rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest',
                          item.status === 'NEW'
                            ? 'bg-muted-burgundy-rose/10 text-muted-burgundy-rose'
                            : item.status === 'IN_PROGRESS'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-emerald-100 text-emerald-700',
                        )}
                      >
                        {item.status === 'IN_PROGRESS' ? 'In progress' : item.status}
                      </span>
                      <p className="text-[10px] italic text-stone-300">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="border border-stone-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-deep-midnight-navy">Shortcuts</h2>
              <div className="space-y-1">
                {shortcutLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between border border-transparent p-3 hover:border-stone-200"
                  >
                    <div className="flex items-center gap-2">
                      <link.icon size={13} className="text-muted-burgundy-rose" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-deep-midnight-navy">
                        {link.name}
                      </span>
                    </div>
                    <ChevronRight
                      size={12}
                      className="text-stone-300 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
