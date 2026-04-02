'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Save, Plus, Trash2 } from 'lucide-react';
import type { NavigationContent } from '@/lib/site-settings-types';
import { INITIAL_NAVIGATION } from '@/lib/site-settings-defaults';
import { mergeNavigation } from '@/lib/site-settings-merge';
import { fetchAdminSiteSettings, putAdminSiteSettings } from '@/lib/admin-site-settings';

const fieldClass =
  'w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-muted-burgundy-rose';

function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `nav-${Date.now()}`;
}

export default function AdminNavigationPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [content, setContent] = useState<NavigationContent>(INITIAL_NAVIGATION);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetchAdminSiteSettings('navigation');
      const data = await res.json().catch(() => null);
      if (!active) return;
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (res.ok) setContent(mergeNavigation(data));
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
      const res = await putAdminSiteSettings('navigation', content);
      const data = await res.json().catch(() => null);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!res.ok) {
        setMessage(data?.message ?? 'Could not save.');
        return;
      }
      if (data && typeof data === 'object' && data !== null) {
        setContent(mergeNavigation(data));
      }
      setMessage('Navigation saved.');
      setMode('view');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Header navigation"
      description="View, edit, or add links shown in the site header."
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

        <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-deep-midnight-navy">
            Phone block (header right)
          </h3>
          {!loaded ? (
            <p className="text-sm text-stone-500">Loading…</p>
          ) : mode === 'view' ? (
            <div className="text-sm text-stone-700 space-y-1">
              <p>
                <span className="font-bold">Label:</span> {content.phoneLabel}
              </p>
              <p>
                <span className="font-bold">Number:</span> {content.phoneNumber}
              </p>
              <p>
                <span className="font-bold">Href:</span> {content.phoneHref}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-[10px] font-black uppercase text-stone-500 mb-1">
                  Label
                </label>
                <input
                  className={fieldClass}
                  value={content.phoneLabel}
                  onChange={(e) => setContent((p) => ({ ...p, phoneLabel: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-stone-500 mb-1">
                  Number (display)
                </label>
                <input
                  className={fieldClass}
                  value={content.phoneNumber}
                  onChange={(e) => setContent((p) => ({ ...p, phoneNumber: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-stone-500 mb-1">
                  Href (tel:…)
                </label>
                <input
                  className={fieldClass}
                  value={content.phoneHref}
                  onChange={(e) => setContent((p) => ({ ...p, phoneHref: e.target.value }))}
                />
              </div>
            </div>
          )}
        </div>

        <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h3 className="text-sm font-black uppercase tracking-widest text-deep-midnight-navy">
              Nav links
            </h3>
            {mode === 'edit' && loaded && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2 rounded-full text-[10px] font-black uppercase"
                onClick={() =>
                  setContent((p) => ({
                    ...p,
                    items: [
                      ...p.items,
                      { id: newId(), name: 'New link', href: '/' },
                    ],
                  }))
                }
              >
                <Plus className="h-4 w-4" /> Add nav link
              </Button>
            )}
          </div>

          {!loaded ? (
            <p className="text-sm text-stone-500">Loading…</p>
          ) : mode === 'view' ? (
            <ul className="divide-y divide-stone-100">
              {content.items.map((item) => (
                <li key={item.id} className="py-3 text-sm text-stone-700 flex justify-between gap-4">
                  <span className="font-semibold">{item.name}</span>
                  <code className="text-xs text-stone-500">{item.href}</code>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-4">
              {content.items.map((item, idx) => (
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
                          const items = [...p.items];
                          items[idx] = { ...items[idx], name: e.target.value };
                          return { ...p, items };
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
                          const items = [...p.items];
                          items[idx] = { ...items[idx], href: e.target.value };
                          return { ...p, items };
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
                        items: p.items.filter((_, i) => i !== idx),
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
      </div>
    </AdminLayout>
  );
}
