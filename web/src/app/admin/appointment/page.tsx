'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  CalendarClock,
  Contact,
  Eye,
  Pencil,
  FileText,
  Image as ImageIcon,
  Save,
  Plus,
  Trash2,
} from 'lucide-react';
import { ImageUrlField } from '@/components/admin/home-editor/image-url-field';
import type { AppointmentPageContent } from '@/lib/site-settings-types';
import { INITIAL_APPOINTMENT } from '@/lib/site-settings-defaults';
import { mergeAppointment } from '@/lib/site-settings-merge';
import { fetchAdminSiteSettings, putAdminSiteSettings } from '@/lib/admin-site-settings';

type AppointmentTab = 'header' | 'visual' | 'form' | 'links';

const APPOINTMENT_TABS: Array<{
  key: AppointmentTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { key: 'header', label: 'Header', icon: FileText },
  { key: 'visual', label: 'Main Visual', icon: ImageIcon },
  { key: 'form', label: 'Inquiry Form', icon: CalendarClock },
  { key: 'links', label: 'Contact Links', icon: Contact },
];

const fieldClass =
  'w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-muted-burgundy-rose';

const TAB_HEADLINE: Record<AppointmentTab, string> = {
  header: 'Header',
  visual: 'Visual',
  form: 'Form',
  links: 'Links',
};

export default function AdminAppointmentPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AppointmentTab>('header');
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [content, setContent] = useState<AppointmentPageContent>(INITIAL_APPOINTMENT);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetchAdminSiteSettings('appointment');
      const data = await res.json().catch(() => null);
      if (!active) return;
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (res.ok) setContent(mergeAppointment(data));
      setLoaded(true);
    })();
    return () => {
      active = false;
    };
  }, [router]);

  const tabDescription = useMemo(() => {
    if (activeTab === 'header') return 'Eyebrow, main heading, and lead copy at the top.';
    if (activeTab === 'visual') return 'Left-side hero image and alt text.';
    if (activeTab === 'form') return 'Form labels, inquiry type options (one per line), and submit CTA.';
    return 'Quick-contact cards below the form.';
  }, [activeTab]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await putAdminSiteSettings('appointment', content);
      const data = await res.json().catch(() => null);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!res.ok) {
        setMessage(data?.message ?? 'Could not save.');
        return;
      }
      setMessage('Appointment page saved.');
      setMode('view');
    } finally {
      setSaving(false);
    }
  };

  const inquiryOptionsText = content.inquiryTypeOptions.join('\n');

  const setInquiryFromText = (text: string) => {
    const lines = text
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    setContent((p) => ({
      ...p,
      inquiryTypeOptions: lines.length ? lines : INITIAL_APPOINTMENT.inquiryTypeOptions,
    }));
  };

  return (
    <AdminLayout
      title="Appointment Page"
      description="View or edit live appointment content and form copy."
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={mode === 'view' ? 'default' : 'outline'}
              className="text-[10px] font-black uppercase tracking-widest h-9 gap-2"
              onClick={() => setMode('view')}
            >
              <Eye className="h-3.5 w-3.5" /> View
            </Button>
            <Button
              type="button"
              variant={mode === 'edit' ? 'default' : 'outline'}
              className="text-[10px] font-black uppercase tracking-widest h-9 gap-2"
              onClick={() => setMode('edit')}
            >
              <Pencil className="h-3.5 w-3.5" /> Edit
            </Button>
          </div>
          {mode === 'edit' && (
            <Button
              type="button"
              onClick={handleSave}
              disabled={saving || !loaded}
              className="rounded-full bg-deep-midnight-navy text-[10px] font-black uppercase tracking-widest h-9 gap-2"
            >
              <Save className="h-3.5 w-3.5" />
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
          )}
        </div>
        {message && (
          <p
            className={cn(
              'text-sm font-medium',
              message.includes('saved') ? 'text-green-700' : 'text-red-600',
            )}
          >
            {message}
          </p>
        )}

        <div className="rounded-2xl bg-[#0F172A] p-8 text-white shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-burgundy-rose">
            Appointment Editor
          </p>
          <h2 className="mt-2 text-3xl font-black italic uppercase tracking-tight">
            {TAB_HEADLINE[activeTab]}
          </h2>
          <p className="mt-2 text-[11px] uppercase tracking-widest text-stone-400">{tabDescription}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
            {APPOINTMENT_TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'group relative flex items-center gap-3 rounded-md px-4 py-2 transition-all duration-300 border',
                    activeTab === tab.key
                      ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-lg shadow-stone-200/50'
                      : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50 hover:text-deep-midnight-navy',
                  )}
                >
                  <div
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300',
                      activeTab === tab.key
                        ? 'bg-white/10 ring-1 ring-white/20'
                        : 'bg-stone-100 group-hover:bg-white',
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-4 w-4 transition-colors',
                        activeTab === tab.key
                          ? 'text-muted-burgundy-rose'
                          : 'text-stone-400 group-hover:text-muted-burgundy-rose',
                      )}
                    />
                  </div>
                  <span className="text-[11px] font-black tracking-widest">{tab.label}</span>
                  {activeTab === tab.key && (
                    <span className="ml-1 h-1.5 w-1.5 rounded-full bg-muted-burgundy-rose animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-deep-midnight-navy">
            {APPOINTMENT_TABS.find((tab) => tab.key === activeTab)?.label}
            {mode === 'view' ? ' — preview' : ' — edit'}
          </h3>

          {!loaded ? (
            <p className="mt-4 text-sm text-stone-500">Loading…</p>
          ) : activeTab === 'header' && (
            <div className="mt-6 space-y-4">
              {mode === 'view' ? (
                <div className="space-y-2 text-sm text-stone-700">
                  <p>
                    <span className="font-bold">Eyebrow:</span> {content.eyebrow}
                  </p>
                  <p>
                    <span className="font-bold">Title:</span> {content.titleLine1}{' '}
                    <em>{content.titleItalic}</em>
                  </p>
                  <p>
                    <span className="font-bold">Lead:</span> {content.lead}
                  </p>
                </div>
              ) : (
                <>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Eyebrow
                  </label>
                  <input
                    className={fieldClass}
                    value={content.eyebrow}
                    onChange={(e) => setContent((p) => ({ ...p, eyebrow: e.target.value }))}
                  />
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Title line 1
                  </label>
                  <input
                    className={fieldClass}
                    value={content.titleLine1}
                    onChange={(e) => setContent((p) => ({ ...p, titleLine1: e.target.value }))}
                  />
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Title italic
                  </label>
                  <input
                    className={fieldClass}
                    value={content.titleItalic}
                    onChange={(e) => setContent((p) => ({ ...p, titleItalic: e.target.value }))}
                  />
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Lead
                  </label>
                  <textarea
                    className={cn(fieldClass, 'min-h-[80px]')}
                    value={content.lead}
                    onChange={(e) => setContent((p) => ({ ...p, lead: e.target.value }))}
                  />
                </>
              )}
            </div>
          )}

          {loaded && activeTab === 'visual' && (
            <div className="mt-6 space-y-4">
              {mode === 'view' ? (
                <div className="space-y-2 text-sm text-stone-700">
                  <p>
                    <span className="font-bold">Image URL:</span> {content.imageUrl}
                  </p>
                  <p>
                    <span className="font-bold">Alt:</span> {content.imageAlt}
                  </p>
                </div>
              ) : (
                <>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1">
                    Image
                  </label>
                  <ImageUrlField
                    value={content.imageUrl}
                    onChange={(v) => setContent((p) => ({ ...p, imageUrl: v }))}
                    urlPlaceholder="Paste image URL or upload from your computer"
                  />
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Alt text
                  </label>
                  <input
                    className={fieldClass}
                    value={content.imageAlt}
                    onChange={(e) => setContent((p) => ({ ...p, imageAlt: e.target.value }))}
                  />
                </>
              )}
            </div>
          )}

          {loaded && activeTab === 'form' && (
            <div className="mt-6 space-y-4">
              {mode === 'view' ? (
                <div className="space-y-2 text-sm text-stone-700">
                  <p>
                    <span className="font-bold">Form title:</span> {content.formTitle}
                  </p>
                  <p>
                    <span className="font-bold">Inquiry options:</span>{' '}
                    {content.inquiryTypeOptions.join(', ')}
                  </p>
                  <p>
                    <span className="font-bold">Submit:</span> {content.submitLabel}
                  </p>
                </div>
              ) : (
                <>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Form title
                  </label>
                  <input
                    className={fieldClass}
                    value={content.formTitle}
                    onChange={(e) => setContent((p) => ({ ...p, formTitle: e.target.value }))}
                  />
                  {(
                    [
                      ['fieldNameLabel', 'Name field label'],
                      ['fieldEmailLabel', 'Email field label'],
                      ['fieldLocationLabel', 'Location field label'],
                      ['fieldInquiryTypeLabel', 'Inquiry type label'],
                      ['fieldMessageLabel', 'Message label'],
                    ] as const
                  ).map(([key, label]) => (
                    <div key={key}>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                        {label}
                      </label>
                      <input
                        className={fieldClass}
                        value={content[key]}
                        onChange={(e) =>
                          setContent((p) => ({ ...p, [key]: e.target.value }))
                        }
                      />
                    </div>
                  ))}
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Inquiry type options (one per line)
                  </label>
                  <textarea
                    className={cn(fieldClass, 'min-h-[100px] font-mono text-xs')}
                    value={inquiryOptionsText}
                    onChange={(e) => setInquiryFromText(e.target.value)}
                  />
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Submit button label
                  </label>
                  <input
                    className={fieldClass}
                    value={content.submitLabel}
                    onChange={(e) => setContent((p) => ({ ...p, submitLabel: e.target.value }))}
                  />
                </>
              )}
            </div>
          )}

          {loaded && activeTab === 'links' && (
            <div className="mt-6 space-y-4">
              {mode === 'view' ? (
                <ul className="space-y-3 text-sm text-stone-700">
                  {content.contactLinks.map((l) => (
                    <li key={l.title + l.href}>
                      <span className="font-bold">{l.title}</span> — {l.subtitle} ({l.variant}) →{' '}
                      {l.href}
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  {content.contactLinks.map((link, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-stone-200 p-4 space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-stone-500">
                          Link {idx + 1}
                        </span>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() =>
                            setContent((p) => ({
                              ...p,
                              contactLinks: p.contactLinks.filter((_, i) => i !== idx),
                            }))
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <input
                        className={fieldClass}
                        placeholder="Title"
                        value={link.title}
                        onChange={(e) =>
                          setContent((p) => {
                            const next = [...p.contactLinks];
                            next[idx] = { ...next[idx], title: e.target.value };
                            return { ...p, contactLinks: next };
                          })
                        }
                      />
                      <input
                        className={fieldClass}
                        placeholder="Subtitle"
                        value={link.subtitle}
                        onChange={(e) =>
                          setContent((p) => {
                            const next = [...p.contactLinks];
                            next[idx] = { ...next[idx], subtitle: e.target.value };
                            return { ...p, contactLinks: next };
                          })
                        }
                      />
                      <input
                        className={fieldClass}
                        placeholder="URL"
                        value={link.href}
                        onChange={(e) =>
                          setContent((p) => {
                            const next = [...p.contactLinks];
                            next[idx] = { ...next[idx], href: e.target.value };
                            return { ...p, contactLinks: next };
                          })
                        }
                      />
                      <select
                        className={fieldClass}
                        value={link.variant}
                        onChange={(e) =>
                          setContent((p) => {
                            const next = [...p.contactLinks];
                            next[idx] = {
                              ...next[idx],
                              variant: e.target.value as (typeof link)['variant'],
                            };
                            return { ...p, contactLinks: next };
                          })
                        }
                      >
                        <option value="whatsapp">WhatsApp</option>
                        <option value="phone">Phone</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2 rounded-full text-[10px] font-black uppercase"
                    onClick={() =>
                      setContent((p) => ({
                        ...p,
                        contactLinks: [
                          ...p.contactLinks,
                          {
                            title: 'New',
                            subtitle: '',
                            href: '#',
                            variant: 'email',
                          },
                        ],
                      }))
                    }
                  >
                    <Plus className="h-4 w-4" /> Add contact link
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
