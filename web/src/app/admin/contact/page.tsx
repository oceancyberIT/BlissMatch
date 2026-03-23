'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Eye,
  Pencil,
  FileText,
  MessageSquare,
  PhoneCall,
  Save,
  Share2,
  Plus,
  Trash2,
} from 'lucide-react';
import type { ContactPageContent } from '@/lib/site-settings-types';
import { INITIAL_CONTACT } from '@/lib/site-settings-defaults';
import { mergeContact } from '@/lib/site-settings-merge';
import { fetchAdminSiteSettings, putAdminSiteSettings } from '@/lib/admin-site-settings';

type ContactTab = 'intro' | 'details' | 'social' | 'form';

const CONTACT_TABS: Array<{
  key: ContactTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { key: 'intro', label: 'Intro', icon: FileText },
  { key: 'details', label: 'Contact Details', icon: PhoneCall },
  { key: 'social', label: 'Social Links', icon: Share2 },
  { key: 'form', label: 'Inquiry Form', icon: MessageSquare },
];

const fieldClass =
  'w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-muted-burgundy-rose';

export default function AdminContactPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ContactTab>('intro');
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [content, setContent] = useState<ContactPageContent>(INITIAL_CONTACT);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetchAdminSiteSettings('contact');
      const data = await res.json().catch(() => null);
      if (!active) return;
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (res.ok) setContent(mergeContact(data));
      setLoaded(true);
    })();
    return () => {
      active = false;
    };
  }, [router]);

  const tabDescription = useMemo(() => {
    if (activeTab === 'intro') return 'Headline, supporting line, and opening narrative.';
    if (activeTab === 'details') return 'Address, phone, and email shown on the page.';
    if (activeTab === 'social') return 'Social profile URLs (icons are fixed by platform).';
    return 'Form labels, subject options, message prompt, and submit CTA.';
  }, [activeTab]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await putAdminSiteSettings('contact', content);
      const data = await res.json().catch(() => null);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!res.ok) {
        setMessage(data?.message ?? 'Could not save.');
        return;
      }
      setMessage('Contact page saved.');
      setMode('view');
    } finally {
      setSaving(false);
    }
  };

  const subjectText = content.subjectOptions.join('\n');

  return (
    <AdminLayout
      title="Contact Page"
      description="View or edit contact copy, details, social links, and form."
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={mode === 'view' ? 'default' : 'outline'}
              className="rounded-full text-[10px] font-black uppercase tracking-widest h-9 gap-2"
              onClick={() => setMode('view')}
            >
              <Eye className="h-3.5 w-3.5" /> View
            </Button>
            <Button
              type="button"
              variant={mode === 'edit' ? 'default' : 'outline'}
              className="rounded-full text-[10px] font-black uppercase tracking-widest h-9 gap-2"
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
            Contact Editor
          </p>
          <h2 className="mt-2 text-3xl font-black italic uppercase tracking-tight">Component Tabs</h2>
          <p className="mt-2 text-[11px] uppercase tracking-widest text-stone-400">{tabDescription}</p>
        </div>
         

        <div className="mt-4 flex flex-wrap gap-2">
            {CONTACT_TABS.map((tab) => {
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
            {CONTACT_TABS.find((t) => t.key === activeTab)?.label}
            {mode === 'view' ? ' — preview' : ' — edit'}
          </h3>

          {!loaded ? (
            <p className="mt-4 text-sm text-stone-500">Loading…</p>
          ) : activeTab === 'intro' && (
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
                  <p>
                    <span className="font-bold">Quote:</span> {content.quote}
                  </p>
                </div>
              ) : (
                <>
                  {(
                    [
                      ['eyebrow', 'Eyebrow'],
                      ['titleLine1', 'Title line 1'],
                      ['titleItalic', 'Title italic'],
                      ['lead', 'Lead'],
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
                    Quote
                  </label>
                  <textarea
                    className={cn(fieldClass, 'min-h-[80px]')}
                    value={content.quote}
                    onChange={(e) => setContent((p) => ({ ...p, quote: e.target.value }))}
                  />
                </>
              )}
            </div>
          )}

          {loaded && activeTab === 'details' && (
            <div className="mt-6 space-y-4">
              {mode === 'view' ? (
                <div className="space-y-2 text-sm text-stone-700">
                  <p>
                    <span className="font-bold">Address:</span> {content.address}
                  </p>
                  <p>
                    <span className="font-bold">Phone:</span> {content.phone} ({content.phoneHref})
                  </p>
                  <p>
                    <span className="font-bold">Email:</span> {content.email} ({content.emailHref})
                  </p>
                </div>
              ) : (
                <>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Address
                  </label>
                  <input
                    className={fieldClass}
                    value={content.address}
                    onChange={(e) => setContent((p) => ({ ...p, address: e.target.value }))}
                  />
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Phone (display)
                  </label>
                  <input
                    className={fieldClass}
                    value={content.phone}
                    onChange={(e) => setContent((p) => ({ ...p, phone: e.target.value }))}
                  />
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Phone href (tel:…)
                  </label>
                  <input
                    className={fieldClass}
                    value={content.phoneHref}
                    onChange={(e) => setContent((p) => ({ ...p, phoneHref: e.target.value }))}
                  />
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Email (display)
                  </label>
                  <input
                    className={fieldClass}
                    value={content.email}
                    onChange={(e) => setContent((p) => ({ ...p, email: e.target.value }))}
                  />
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Email href (mailto:…)
                  </label>
                  <input
                    className={fieldClass}
                    value={content.emailHref}
                    onChange={(e) => setContent((p) => ({ ...p, emailHref: e.target.value }))}
                  />
                </>
              )}
            </div>
          )}

          {loaded && activeTab === 'social' && (
            <div className="mt-6 space-y-4">
              {mode === 'view' ? (
                <ul className="text-sm text-stone-700 space-y-2">
                  {content.socialLinks.map((s) => (
                    <li key={s.platform}>
                      <span className="font-bold capitalize">{s.platform}:</span> {s.href}
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  {content.socialLinks.map((s, idx) => (
                    <div
                      key={`${s.platform}-${idx}`}
                      className="flex flex-wrap gap-2 items-end border-b border-stone-100 pb-4"
                    >
                      <div className="flex-1 min-w-[140px]">
                        <label className="block text-[10px] font-black uppercase text-stone-500">
                          Platform
                        </label>
                        <select
                          className={fieldClass}
                          value={s.platform}
                          onChange={(e) =>
                            setContent((p) => {
                              const next = [...p.socialLinks];
                              next[idx] = {
                                ...next[idx],
                                platform: e.target.value as (typeof s)['platform'],
                              };
                              return { ...p, socialLinks: next };
                            })
                          }
                        >
                          <option value="instagram">Instagram</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="facebook">Facebook</option>
                        </select>
                      </div>
                      <div className="flex-[2] min-w-[200px]">
                        <label className="block text-[10px] font-black uppercase text-stone-500">
                          URL
                        </label>
                        <input
                          className={fieldClass}
                          value={s.href}
                          onChange={(e) =>
                            setContent((p) => {
                              const next = [...p.socialLinks];
                              next[idx] = { ...next[idx], href: e.target.value };
                              return { ...p, socialLinks: next };
                            })
                          }
                        />
                      </div>
                      <button
                        type="button"
                        className="text-red-500 p-2"
                        onClick={() =>
                          setContent((p) => ({
                            ...p,
                            socialLinks: p.socialLinks.filter((_, i) => i !== idx),
                          }))
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2 rounded-full text-[10px] font-black uppercase"
                    onClick={() =>
                      setContent((p) => ({
                        ...p,
                        socialLinks: [
                          ...p.socialLinks,
                          { platform: 'instagram', href: '#' },
                        ],
                      }))
                    }
                  >
                    <Plus className="h-4 w-4" /> Add social link
                  </Button>
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
                    <span className="font-bold">Subjects:</span> {content.subjectOptions.join(', ')}
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
                      ['fieldNameLabel', 'Name label'],
                      ['fieldEmailLabel', 'Email label'],
                      ['fieldSubjectLabel', 'Subject label'],
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
                    Subject options (one per line)
                  </label>
                  <textarea
                    className={cn(fieldClass, 'min-h-[100px] font-mono text-xs')}
                    value={subjectText}
                    onChange={(e) => {
                      const lines = e.target.value
                        .split('\n')
                        .map((l) => l.trim())
                        .filter(Boolean);
                      setContent((p) => ({
                        ...p,
                        subjectOptions: lines.length ? lines : INITIAL_CONTACT.subjectOptions,
                      }));
                    }}
                  />
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Submit label
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
        </div>
      </div>
    </AdminLayout>
  );
}
