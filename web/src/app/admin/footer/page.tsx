'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Save, Plus, Trash2 } from 'lucide-react';
import type { FooterContent } from '@/lib/site-settings-types';
import { INITIAL_FOOTER } from '@/lib/site-settings-defaults';
import { mergeFooter } from '@/lib/site-settings-merge';
import { fetchAdminSiteSettings, putAdminSiteSettings } from '@/lib/admin-site-settings';

const fieldClass =
  'w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-muted-burgundy-rose';

function newId(prefix: string) {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}`;
}

export default function AdminFooterPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [content, setContent] = useState<FooterContent>(INITIAL_FOOTER);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetchAdminSiteSettings('footer');
      const data = await res.json().catch(() => null);
      if (!active) return;
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (res.ok) setContent(mergeFooter(data));
      setLoaded(true);
    })();
    return () => {
      active = false;
    };
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await putAdminSiteSettings('footer', content);
      const data = await res.json().catch(() => null);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!res.ok) {
        setMessage(data?.message ?? 'Could not save footer.');
        return;
      }
      if (data && typeof data === 'object' && data !== null) {
        setContent(mergeFooter(data));
      }
      setMessage('Footer saved.');
      setMode('view');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Footer" description="View, edit, and add footer links and content.">
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

        {!loaded ? (
          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm text-sm text-stone-500">
            Loading…
          </div>
        ) : (
          <>
            <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-deep-midnight-navy">
                Footer main content
              </h3>
              {mode === 'view' ? (
                <div className="text-sm text-stone-700 space-y-1">
                  <p><span className="font-bold">CTA:</span> {content.ctaEyebrow} · {content.ctaTitle}</p>
                  <p><span className="font-bold">Button:</span> {content.ctaButtonLabel} ({content.ctaButtonHref})</p>
                  <p><span className="font-bold">Brand:</span> {content.brandName}</p>
                  <p><span className="font-bold">Tagline:</span> {content.brandTagline}</p>
                  <p><span className="font-bold">Contact:</span> {content.contactTitle} · {content.locationsLine} · {content.email}</p>
                </div>
              ) : (
                <div className="grid gap-3 md:grid-cols-2">
                  {(
                    [
                      ['ctaEyebrow', 'CTA eyebrow'],
                      ['ctaTitle', 'CTA title'],
                      ['ctaButtonLabel', 'CTA button label'],
                      ['ctaButtonHref', 'CTA button href'],
                      ['brandName', 'Brand name'],
                      ['brandTagline', 'Brand tagline'],
                      ['navColumnTitle', 'Nav column title'],
                      ['contactTitle', 'Contact title'],
                      ['locationsLine', 'Locations line'],
                      ['email', 'Email (display)'],
                      ['emailHref', 'Email href'],
                      ['copyright', 'Copyright'],
                    ] as const
                  ).map(([key, label]) => (
                    <div key={key}>
                      <label className="block text-[10px] font-black uppercase text-stone-500 mb-1">
                        {label}
                      </label>
                      <input
                        className={fieldClass}
                        value={content[key]}
                        onChange={(e) => setContent((p) => ({ ...p, [key]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <h3 className="text-sm font-black uppercase tracking-widest text-deep-midnight-navy">
                  Footer links
                </h3>
                {mode === 'edit' && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-full text-[10px] font-black uppercase"
                    onClick={() =>
                      setContent((p) => ({
                        ...p,
                        links: [...p.links, { id: newId('f'), name: 'New link', href: '/' }],
                      }))
                    }
                  >
                    <Plus className="h-4 w-4" /> Add link
                  </Button>
                )}
              </div>
              {mode === 'view' ? (
                <ul className="divide-y divide-stone-100">
                  {content.links.map((item) => (
                    <li key={item.id} className="py-3 text-sm text-stone-700 flex justify-between gap-4">
                      <span className="font-semibold">{item.name}</span>
                      <code className="text-xs text-stone-500">{item.href}</code>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-4">
                  {content.links.map((item, idx) => (
                    <div
                      key={item.id}
                      className="grid gap-3 md:grid-cols-[1fr_1fr_auto] items-end border border-stone-100 rounded-lg p-4"
                    >
                      <div>
                        <label className="block text-[10px] font-black uppercase text-stone-500 mb-1">
                          Label
                        </label>
                        <input
                          className={fieldClass}
                          value={item.name}
                          onChange={(e) =>
                            setContent((p) => {
                              const links = [...p.links];
                              links[idx] = { ...links[idx], name: e.target.value };
                              return { ...p, links };
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-stone-500 mb-1">
                          Path / URL
                        </label>
                        <input
                          className={fieldClass}
                          value={item.href}
                          onChange={(e) =>
                            setContent((p) => {
                              const links = [...p.links];
                              links[idx] = { ...links[idx], href: e.target.value };
                              return { ...p, links };
                            })
                          }
                        />
                      </div>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 justify-self-end p-2"
                        onClick={() =>
                          setContent((p) => ({
                            ...p,
                            links: p.links.filter((_, i) => i !== idx),
                          }))
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-deep-midnight-navy">
                Legal links
              </h3>
              {mode === 'edit' && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-full text-[10px] font-black uppercase"
                  onClick={() =>
                    setContent((p) => ({
                      ...p,
                      legal: [...p.legal, { id: newId('l'), name: 'New legal', href: '/' }],
                    }))
                  }
                >
                  <Plus className="h-4 w-4" /> Add legal link
                </Button>
              )}
              <div className="space-y-3">
                {content.legal.map((item, idx) => (
                  <div
                    key={item.id}
                    className="grid gap-3 md:grid-cols-[1fr_1fr_auto] items-end border border-stone-100 rounded-lg p-4"
                  >
                    <input
                      className={fieldClass}
                      value={item.name}
                      onChange={(e) =>
                        setContent((p) => {
                          const legal = [...p.legal];
                          legal[idx] = { ...legal[idx], name: e.target.value };
                          return { ...p, legal };
                        })
                      }
                      disabled={mode === 'view'}
                    />
                    <input
                      className={fieldClass}
                      value={item.href}
                      onChange={(e) =>
                        setContent((p) => {
                          const legal = [...p.legal];
                          legal[idx] = { ...legal[idx], href: e.target.value };
                          return { ...p, legal };
                        })
                      }
                      disabled={mode === 'view'}
                    />
                    {mode === 'edit' ? (
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 justify-self-end p-2"
                        onClick={() =>
                          setContent((p) => ({
                            ...p,
                            legal: p.legal.filter((_, i) => i !== idx),
                          }))
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    ) : (
                      <span />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
