
'use client';

import { useEffect, useState } from 'react';
import {
  Users,
  Heart,
  ShieldCheck,
  Mail,
  Calendar as CalendarIcon,
  TrendingUp,
  Clock,
  RefreshCw,
  ChevronRight,
  UserCheck,
  Lock,
  MessageSquare,
  Layout,
  BookOpen,
  Briefcase,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/admin-layout';

// Note: Replace with your actual database fetching logic
// For this example, we maintain the structure you provided.

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading/fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <AdminLayout
        title="Command Overview"
        description="Synchronizing dossiers and refreshing the console."
      >
        <div className="flex flex-col items-center justify-center h-[80vh] bg-stone-50">
        <div className="animate-pulse space-y-4 text-center">
          <div className="h-1 w-48 bg-muted-burgundy-rose/20 mx-auto overflow-hidden">
             <div className="h-full bg-muted-burgundy-rose animate-progress-line w-full"></div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-deep-midnight-navy/40">
            Secure Entry Point: Synchronizing Dossiers
          </p>
        </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Command Overview"
      description="Confidential console for Bliss Match."
    >
      <div className="min-h-screen bg-soft-ivory-white p-6 lg:p-10 space-y-10">
        {/* SUMMARY STRIP */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-burgundy-rose">
              Site Overview
            </span>
            <h1 className="text-3xl md:text-4xl font-serif text-deep-midnight-navy">
              Bliss Match at a glance
            </h1>
            <p className="max-w-xl text-xs md:text-sm text-stone-500">
              A quick snapshot of your key public pages, active forms, and
              where your visitors are reaching out from.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-full border-stone-200 text-deep-midnight-navy uppercase text-[9px] font-black tracking-widest h-10 px-5 hover:bg-stone-50"
            >
              Site Status: Live
            </Button>
            <Button className="rounded-full bg-deep-midnight-navy text-white uppercase text-[9px] font-black tracking-widest h-10 px-5 hover:bg-muted-burgundy-rose transition-all flex gap-2">
              <RefreshCw size={12} /> Refresh Data
            </Button>
          </div>
        </div>

        {/* PRIMARY METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: 'Public pages',
              val: '5',
              icon: Layout,
              color: 'text-deep-midnight-navy',
            },
            {
              label: 'Homepage sections',
              val: '6',
              icon: BookOpen,
              color: 'text-muted-burgundy-rose',
            },
            {
              label: 'Active forms',
              val: '2',
              icon: Mail,
              color: 'text-deep-midnight-navy',
            },
            {
              label: 'Service suites',
              val: '3',
              icon: Briefcase,
              color: 'text-stone-400',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-stone-100 p-8 shadow-sm group hover:border-muted-burgundy-rose transition-all"
            >
              <item.icon
                className={cn(
                  'h-5 w-5 mb-6 opacity-40 group-hover:opacity-100 transition-opacity',
                  item.color,
                )}
              />
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">
                {item.label}
              </p>
              <p className="text-4xl font-serif text-deep-midnight-navy">
                {item.val}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* RECENT FORM ACTIVITY */}
          <div className="lg:col-span-8 bg-white border border-stone-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-stone-50 flex justify-between items-center">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-deep-midnight-navy flex items-center gap-3">
                <MessageSquare
                  size={14}
                  className="text-muted-burgundy-rose"
                />{' '}
                Latest enquiries & requests
              </h3>
              <div className="flex gap-3 text-[10px] font-bold uppercase tracking-widest">
                <Link
                  href="/admin/contact"
                  className="text-stone-400 hover:text-muted-burgundy-rose transition-colors"
                >
                  Contact inbox
                </Link>
                <span className="text-stone-300">•</span>
                <Link
                  href="/admin/appointment"
                  className="text-stone-400 hover:text-muted-burgundy-rose transition-colors"
                >
                  Appointment requests
                </Link>
              </div>
            </div>

            <div className="divide-y divide-stone-50">
              {[
                {
                  name: 'Homepage enquiry',
                  subject: 'Appointment form (Private consultation)',
                  from: 'Appointment page',
                  status: 'New',
                  time: 'Just now',
                },
                {
                  name: 'Contact form',
                  subject: 'General matchmaking enquiry',
                  from: 'Contact page',
                  status: 'In review',
                  time: '3h ago',
                },
                {
                  name: 'Services interest',
                  subject: 'Bliss Circle membership',
                  from: 'Services page',
                  status: 'Awaiting reply',
                  time: 'Yesterday',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 flex items-center justify-between hover:bg-stone-50 transition-colors cursor-pointer group"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-deep-midnight-navy">
                      {item.name}
                    </p>
                    <p className="text-xs text-stone-500">{item.subject}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
                      Source: {item.from}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge
                      className={cn(
                        'rounded-full px-3 py-1 text-[9px] uppercase tracking-widest font-bold',
                        idx === 0
                          ? 'bg-muted-burgundy-rose/10 text-muted-burgundy-rose'
                          : 'bg-deep-midnight-navy/5 text-deep-midnight-navy',
                      )}
                    >
                      {item.status}
                    </Badge>
                    <p className="text-[10px] text-stone-300 italic">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK LINKS TO EDIT PAGES */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-deep-midnight-navy p-8 text-white space-y-6">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-stone-400 border-b border-white/10 pb-4">
                Manage site content
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    name: 'Homepage',
                    href: '/admin/home',
                    icon: Layout,
                  },
                  {
                    name: 'About editorial',
                    href: '/admin/about',
                    icon: BookOpen,
                  },
                  {
                    name: 'Service suites',
                    href: '/admin/services',
                    icon: Briefcase,
                  },
                  {
                    name: 'Contact page',
                    href: '/admin/contact',
                    icon: Mail,
                  },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group flex items-center justify-between p-3 border border-white/5 hover:border-muted-burgundy-rose transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <link.icon
                        size={14}
                        className="text-stone-500 group-hover:text-muted-burgundy-rose"
                      />
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        {link.name}
                      </span>
                    </div>
                    <ChevronRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-all text-muted-burgundy-rose"
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white border border-stone-100 p-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-deep-midnight-navy mb-4">
                Content note
              </h4>
              <p className="font-serif text-stone-500 leading-relaxed text-sm">
                Use this dashboard as a quick jumping-off point: if something
                on the public site needs to be refreshed, there should be a
                direct path to it from here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
