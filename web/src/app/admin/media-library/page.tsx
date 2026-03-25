'use client';

import { useCallback, useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { getAdminToken } from '@/lib/admin-site-settings';
import type { MediaAsset } from '@/lib/media-library-types';
import { ImageUrlField } from '@/components/admin/home-editor/image-url-field';
import { Trash2 } from 'lucide-react';

export default function AdminMediaLibraryPage() {
  const [items, setItems] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [draftName, setDraftName] = useState('');
  const [draftUrl, setDraftUrl] = useState('');
  const [backfilling, setBackfilling] = useState(false);

  const coreSiteImages = [
    { name: 'Home Hero', url: '/background.png' },
    { name: 'About Hero', url: '/image.png' },
    { name: 'About Hero Background', url: '/image copy 2.png' },
    { name: 'Services Hero', url: '/image.png' },
    { name: 'Services Gallery 2', url: '/image copy 2.png' },
    { name: 'Services Gallery 3', url: '/image copy 3.png' },
    { name: 'Services Gallery 4', url: '/image copy 4.png' },
    { name: 'Site Logo', url: '/logo1.png' },
  ];

  const load = useCallback(async () => {
    const token = getAdminToken();
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/media', {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      const data = await res.json().catch(() => null);
      if (res.ok && Array.isArray(data)) {
        setItems(data as MediaAsset[]);
      } else {
        setMessage('Could not load media library.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function addAsset() {
    if (!draftUrl.trim()) return;
    const token = getAdminToken();
    if (!token) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: draftName.trim() || 'Library image',
          url: draftUrl.trim(),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setMessage(data?.message ?? 'Could not add image.');
        return;
      }
      setDraftName('');
      setDraftUrl('');
      setItems((prev) => [data as MediaAsset, ...prev]);
      setMessage('Image added to library.');
    } finally {
      setSaving(false);
    }
  }

  async function removeAsset(id: string) {
    const token = getAdminToken();
    if (!token) return;
    const confirmed = window.confirm('Delete this image from library?');
    if (!confirmed) return;
    const res = await fetch('/api/admin/media', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      setMessage('Could not delete image.');
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  async function backfillCoreImages() {
    const token = getAdminToken();
    if (!token) return;
    setBackfilling(true);
    setMessage(null);
    try {
      const existingUrls = new Set(items.map((item) => item.url));
      let added = 0;
      for (const image of coreSiteImages) {
        if (existingUrls.has(image.url)) continue;
        const res = await fetch('/api/admin/media', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(image),
        });
        if (res.ok) {
          const created = (await res.json().catch(() => null)) as MediaAsset | null;
          if (created) {
            setItems((prev) => [created, ...prev]);
          }
          added += 1;
        }
      }
      setMessage(
        added > 0
          ? `${added} main-site image${added === 1 ? '' : 's'} added to media library.`
          : 'Main-site images are already in media library.',
      );
    } finally {
      setBackfilling(false);
    }
  }

  return (
    <AdminLayout
      title="Media Library"
      description="Store and reuse uploaded images across admin editors."
    >
      <div className="space-y-6">
        <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-deep-midnight-navy">
            Add image to library
          </h3>
          <input
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            placeholder="Image name (optional)"
            className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-muted-burgundy-rose"
          />
          <ImageUrlField value={draftUrl} onChange={setDraftUrl} />
          <Button
            type="button"
            onClick={addAsset}
            disabled={saving || !draftUrl.trim()}
            className="rounded-md bg-deep-midnight-navy text-xs font-black uppercase tracking-widest text-white hover:bg-muted-burgundy-rose"
          >
            {saving ? 'Saving...' : 'Add to library'}
          </Button>
          {message ? <p className="text-xs text-muted-burgundy-rose font-semibold">{message}</p> : null}
        </div>

        <div className="min-w-0 rounded-md border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="shrink-0 text-sm font-black uppercase tracking-widest text-deep-midnight-navy">
              Saved images
            </h3>
            <div className="flex min-w-0 w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="w-full whitespace-normal text-center text-[10px] font-black uppercase sm:w-auto sm:whitespace-nowrap"
                onClick={backfillCoreImages}
                disabled={backfilling}
              >
                {backfilling ? 'Importing...' : 'Import main-site images'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full text-[10px] font-black uppercase sm:w-auto"
                onClick={load}
              >
                Refresh
              </Button>
            </div>
          </div>
          {loading ? (
            <p className="text-sm text-stone-500">Loading images...</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-stone-500">No images yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {items.map((item) => (
                <div key={item.id} className="rounded-lg border border-stone-200 p-3 space-y-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url} alt={item.name} className="h-28 w-full rounded object-cover" />
                  <p className="truncate text-[11px] font-semibold text-stone-700">{item.name}</p>
                  <button
                    type="button"
                    onClick={() => removeAsset(item.id)}
                    className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
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
