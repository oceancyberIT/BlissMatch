'use client';

import { useEffect, useMemo, useState } from 'react';
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

  async function loadEnquiries(silent = false) {
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
  }

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
  }, [router]);

  const metrics = useMemo(() => {
    const total = rows.length;
    const newCount = rows.filter((r) => r.status === 'NEW').length;
    const inProgressCount = rows.filter((r) => r.status === 'IN_PROGRESS').length;
    const appt = rows.filter((r) => r.source === 'APPOINTMENT').length;
    const contact = rows.filter((r) => r.source === 'CONTACT').length;
    return { total, newCount, inProgressCount, appt, contact };
  }, [rows]);

  const latest = rows.slice(0, 6);
  const appointments = rows
    .filter((r) => r.source === 'APPOINTMENT')
    .slice(0, 3);
  const contacts = rows
    .filter((r) => r.source === 'CONTACT')
    .slice(0, 3);

  return (
    <AdminLayout
      title="Command Overview"
      description="Confidential console for Bliss Match."
    >
      <div className="min-h-screen bg-soft-ivory-white p-6 lg:p-10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-burgundy-rose">
              Site Overview
            </span>
            <h1 className="text-3xl md:text-4xl font-serif text-deep-midnight-navy">
              Bliss Match at a glance
            </h1>
            <p className="max-w-xl text-xs md:text-sm text-stone-500">
              Live overview for submissions, page editors, and content blocks.
            </p>
          </div>
          <Button
            onClick={() => loadEnquiries()}
            className="rounded-full bg-deep-midnight-navy text-white uppercase text-[9px] font-black tracking-widest h-10 px-5 hover:bg-muted-burgundy-rose transition-all flex gap-2"
          >
            <RefreshCw size={12} className={cn(refreshing && 'animate-spin')} />{' '}
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total submissions', val: metrics.total, icon: MessageSquare },
            { label: 'New submissions', val: metrics.newCount, icon: Mail },
            { label: 'In progress', val: metrics.inProgressCount, icon: Shield },
            { label: 'Appointments', val: metrics.appt, icon: CalendarClock },
          ].map((item) => (
            <div key={item.label} className="bg-white border border-stone-100 p-8 shadow-sm">
              <item.icon className="h-5 w-5 mb-4 text-muted-burgundy-rose" />
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">
                {item.label}
              </p>
              <p className="text-4xl font-serif text-deep-midnight-navy">{item.val}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 min-w-0 bg-white border border-stone-100 shadow-sm overflow-hidden">
            <div className="flex min-w-0 flex-col gap-3 border-b border-stone-50 p-6 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="flex min-w-0 items-start gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-deep-midnight-navy">
                <MessageSquare size={14} className="mt-0.5 shrink-0 text-muted-burgundy-rose" />
                <span className="min-w-0">Latest enquiries & requests</span>
              </h3>
              <Link
                href="/admin/submissions"
                className="shrink-0 self-start whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-muted-burgundy-rose sm:self-auto"
              >
                Open submissions inbox
              </Link>
            </div>

            <div className="divide-y divide-stone-50">
              {loading ? (
                <div className="p-6 text-sm text-stone-500">Loading submissions…</div>
              ) : latest.length === 0 ? (
                <div className="p-6 text-sm text-stone-500">No submissions yet.</div>
              ) : (
                latest.map((item) => (
                  <div key={item.id} className="p-6 flex items-center justify-between">
                    <div className="space-y-1 min-w-0">
                      <p className="text-sm font-semibold text-deep-midnight-navy">{item.fullName}</p>
                      <p className="text-xs text-stone-500 truncate">{item.subject || item.inquiryType || item.message}</p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
                        Source: {item.source === 'APPOINTMENT' ? 'Appointment' : 'Contact'}
                      </p>
                    </div>
                    <div className="text-right space-y-2">
                      <span
                        className={cn(
                          'inline-flex rounded-full px-3 py-1 text-[9px] uppercase tracking-widest font-bold',
                          item.status === 'NEW'
                            ? 'bg-muted-burgundy-rose/10 text-muted-burgundy-rose'
                            : item.status === 'IN_PROGRESS'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700',
                        )}
                      >
                        {item.status === 'IN_PROGRESS' ? 'IN PROGRESS' : item.status}
                      </span>
                      <p className="text-[10px] text-stone-300 italic">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-deep-midnight-navy p-8 text-white space-y-6">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-stone-400 border-b border-white/10 pb-4">
                Main Editors
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { name: 'Homepage', href: '/admin/home', icon: LayoutTemplate },
                  { name: 'About', href: '/admin/about', icon: BookOpen },
                  { name: 'Services', href: '/admin/services', icon: Briefcase },
                  { name: 'Appointments', href: '/admin/appointment' },
                  { name: 'Contact', href: '/admin/contact' },
                  { name: 'Submissions', href: '/admin/submissions' },
                ].map((link: any) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group flex items-center justify-between p-3 border border-white/5 hover:border-muted-burgundy-rose transition-all"
                  >
                    <div className="flex items-center gap-2">
                      {link.icon ? <link.icon size={12} className="text-muted-burgundy-rose" /> : null}
                      <span className="text-[10px] font-bold uppercase tracking-widest">{link.name}</span>
                    </div>
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all text-muted-burgundy-rose" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white border border-stone-100 p-8 space-y-4">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-deep-midnight-navy">
                Site Structure
              </h3>
              {[
                { name: 'Navigation', href: '/admin/navigation', icon: PanelTop },
                { name: 'Footer', href: '/admin/footer', icon: PanelBottom },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center justify-between p-3 border border-stone-100 hover:border-muted-burgundy-rose transition-all"
                >
                  <div className="flex items-center gap-2">
                    <link.icon size={13} className="text-muted-burgundy-rose" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-deep-midnight-navy">
                      {link.name}
                    </span>
                  </div>
                  <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all text-muted-burgundy-rose" />
                </Link>
              ))}
            </div>

            <div className="bg-white border border-stone-100 p-8 space-y-4">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-deep-midnight-navy">
                Component Editors
              </h3>
              {[
                { name: 'Home Blocks', href: '/admin/discover-lasting-love', icon: Sparkles },
                { name: 'About Sections', href: '/admin/about-philosophy', icon: BookOpen },
                { name: 'Services Sections', href: '/admin/services-grid', icon: Briefcase },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center justify-between p-3 border border-stone-100 hover:border-muted-burgundy-rose transition-all"
                >
                  <div className="flex items-center gap-2">
                    <link.icon size={13} className="text-muted-burgundy-rose" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-deep-midnight-navy">
                      {link.name}
                    </span>
                  </div>
                  <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all text-muted-burgundy-rose" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="min-w-0 bg-white border border-stone-100 p-6 shadow-sm">
            <div className="mb-4 flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <h3 className="min-w-0 text-[11px] font-black uppercase tracking-[0.2em] text-deep-midnight-navy">
                Recent appointment requests
              </h3>
              <Link
                href="/admin/submissions"
                className="shrink-0 self-start whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-muted-burgundy-rose sm:self-auto"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {appointments.length === 0 ? (
                <p className="text-sm text-stone-500">No appointment requests yet.</p>
              ) : (
                appointments.map((item) => (
                  <div key={item.id} className="border border-stone-100 p-3">
                    <p className="text-sm font-semibold text-deep-midnight-navy">{item.fullName}</p>
                    <p className="text-xs text-stone-500 truncate">{item.inquiryType || item.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="min-w-0 bg-white border border-stone-100 p-6 shadow-sm">
            <div className="mb-4 flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <h3 className="min-w-0 text-[11px] font-black uppercase tracking-[0.2em] text-deep-midnight-navy">
                Recent contact requests
              </h3>
              <Link
                href="/admin/submissions"
                className="shrink-0 self-start whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-muted-burgundy-rose sm:self-auto"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {contacts.length === 0 ? (
                <p className="text-sm text-stone-500">No contact requests yet.</p>
              ) : (
                contacts.map((item) => (
                  <div key={item.id} className="border border-stone-100 p-3">
                    <p className="text-sm font-semibold text-deep-midnight-navy">{item.fullName}</p>
                    <p className="text-xs text-stone-500 truncate">{item.subject || item.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
