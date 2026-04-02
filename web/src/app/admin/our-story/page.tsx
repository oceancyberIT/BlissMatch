'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Eye, Pencil, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { OurStorySection } from '@/components/admin/home-editor/sections';
import {
  INITIAL_CONTENT,
  mergeHomeContent,
} from '@/components/admin/home-editor/constants';
import { HomeContent } from '@/components/admin/home-editor/types';

type OurStoryMode = 'view' | 'edit';

export default function OurStoryAdminPage() {
  const [homeContent, setHomeContent] = useState<HomeContent>(
    INITIAL_CONTENT,
  );
  const [modalMode, setModalMode] = useState<OurStoryMode>('view');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch('/api/admin/home', { cache: 'no-store' });
        const data = await res.json().catch(() => null);
        if (!active) return;
        if (res.ok && data && typeof data === 'object' && data !== null) {
          setHomeContent(mergeHomeContent(data));
        } else setHomeContent(INITIAL_CONTENT);
      } catch {
        if (!active) return;
        setHomeContent(INITIAL_CONTENT);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const token =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('blissmatch_admin_token')
      : null;

  const updateOurStory = (field: string, value: string) => {
    setHomeContent((prev) => ({
      ...prev,
      ourStory: {
        ...prev.ourStory,
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    if (!token) {
      setToast({
        type: 'error',
        message: 'Login first.',
      });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/home', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(homeContent),
        cache: 'no-store',
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setToast({
          type: 'error',
          message: data?.message || 'Could not save Our Story.',
        });
        return;
      }

      if (data && typeof data === 'object' && data !== null) {
        setHomeContent(mergeHomeContent(data));
      }

      setModalMode('view');
      setIsModalOpen(false);
      setToast({
        type: 'success',
        message: 'Our Story saved.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!token) {
      setToast({
        type: 'error',
        message: 'Login first.',
      });
      return;
    }

    const next: HomeContent = {
      ...homeContent,
      ourStory: INITIAL_CONTENT.ourStory,
    };

    setSaving(true);
    try {
      const res = await fetch('/api/admin/home', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(next),
        cache: 'no-store',
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setToast({
          type: 'error',
          message: data?.message || 'Could not delete Our Story.',
        });
        return;
      }

      if (data && typeof data === 'object' && data !== null) {
        setHomeContent(mergeHomeContent(data));
      } else {
        setHomeContent(next);
      }
      setModalMode('view');
      setIsModalOpen(false);
      setToast({
        type: 'success',
        message: 'Our Story deleted.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Our Story"
      description="Homepage section — changes here and on Homepage › Our Story use the same saved content and appear on the main site."
    >
      {toast && (
        <div
          className={cn(
            'fixed top-5 right-5 z-[9999] rounded-lg px-4 py-3 text-sm shadow-lg border',
            toast.type === 'success'
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-red-50 text-red-700 border-red-200',
          )}
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-6 pb-20">
        <div className="bg-[#0F172A] rounded-2xl p-8 text-white shadow-xl shadow-stone-200/50">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl font-black italic uppercase tracking-tight">
                Our Story
              </h2>
              <p className="text-stone-400 text-[11px] font-medium uppercase tracking-widest mt-2">
                Same data as the Homepage editor (Our Story tab). Save to update the live homepage.
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 bg-white rounded-md border border-stone-200 shadow-sm overflow-hidden">
          <div className="flex min-w-0 flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="break-words text-sm font-black uppercase tracking-widest text-deep-midnight-navy">
                Our Story card
              </h3>
              <p className="mt-1 text-[10px] font-medium text-stone-400">
                Open this card to view or edit details in a popup form.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setModalMode('view');
                  setIsModalOpen(true);
                }}
                className="p-2 rounded border bg-white border-stone-200 text-stone-500 hover:border-stone-300 transition-all"
                aria-label="View Our Story"
              >
                <Eye size={14} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalMode('edit');
                  setIsModalOpen(true);
                }}
                className="p-2 rounded border bg-white border-stone-200 text-stone-500 hover:border-stone-300 transition-all"
                aria-label="Edit Our Story"
              >
                <Pencil size={14} />
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="p-2 rounded border border-red-200 bg-white text-red-500 hover:bg-red-50 transition-all disabled:opacity-60"
                aria-label="Delete Our Story"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          <div className="px-6 pb-6">
            {loading ? (
              <p className="text-[11px] text-stone-400">Loading...</p>
            ) : (
              <div className="rounded-xl border border-stone-200 bg-stone-50/40 p-4 flex items-center gap-4">
                {homeContent.ourStory.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={homeContent.ourStory.imageUrl}
                    alt={homeContent.ourStory.imageAlt || ''}
                    className="h-16 w-16 rounded-lg border border-stone-200 object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg border border-stone-200 bg-white" />
                )}
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                    {homeContent.ourStory.eyebrow || 'Our Story'}
                  </p>
                  <p className="text-sm font-semibold text-deep-midnight-navy truncate">
                    {homeContent.ourStory.headingMain || 'No heading yet'}
                  </p>
                  <p className="text-[11px] text-stone-500 truncate">
                    {homeContent.ourStory.quote || 'No quote yet'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-[10000] bg-black/40 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl max-h-[90vh] overflow-hidden bg-white rounded-2xl border border-stone-200 shadow-2xl flex flex-col">
              <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/60 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-deep-midnight-navy uppercase tracking-widest">
                    {modalMode === 'edit' ? 'Edit Our Story' : 'View Our Story'}
                  </h3>
                  <p className="text-[10px] text-stone-400">
                    {modalMode === 'edit'
                      ? 'Update details and save.'
                      : 'Read-only details of this card.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-[11px] font-semibold rounded border border-stone-200 hover:bg-stone-100"
                >
                  Close
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                {modalMode === 'edit' ? (
                  <OurStorySection
                    data={homeContent.ourStory}
                    onFieldChange={(f: string, v: string) => updateOurStory(f, v)}
                  />
                ) : (
                  <div className="space-y-6">
                    {homeContent.ourStory.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={homeContent.ourStory.imageUrl}
                        alt={homeContent.ourStory.imageAlt || ''}
                        className="h-56 w-full object-cover rounded-xl border border-stone-200"
                      />
                    ) : (
                      <div className="h-56 w-full rounded-xl border border-stone-200 bg-stone-50" />
                    )}

                    <div className="grid grid-cols-2 gap-2 max-w-md">
                      {homeContent.ourStory.sideImage1Url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={homeContent.ourStory.sideImage1Url}
                          alt={homeContent.ourStory.sideImage1Alt || ''}
                          className="h-24 w-full object-cover rounded-lg border border-stone-200"
                        />
                      ) : (
                        <div className="h-24 rounded-lg border border-stone-200 bg-stone-100" />
                      )}
                      {homeContent.ourStory.sideImage2Url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={homeContent.ourStory.sideImage2Url}
                          alt={homeContent.ourStory.sideImage2Alt || ''}
                          className="h-24 w-full object-cover rounded-lg border border-stone-200"
                        />
                      ) : (
                        <div className="h-24 rounded-lg border border-stone-200 bg-stone-100" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                        {homeContent.ourStory.eyebrow || '—'}
                      </p>
                      <h4 className="text-2xl font-serif italic text-deep-midnight-navy">
                        {homeContent.ourStory.headingMain || '—'}
                      </h4>
                      <p className="text-lg italic text-deep-midnight-navy">
                        {homeContent.ourStory.headingAccent || ''}
                      </p>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {homeContent.ourStory.paragraphOne || ''}
                      </p>
                      <p className="text-sm italic text-stone-600 leading-relaxed">
                        {homeContent.ourStory.quote || ''}
                      </p>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {homeContent.ourStory.paragraphTwo || ''}
                      </p>
                    </div>

                    <div className="space-y-2 rounded-xl border border-stone-200 bg-stone-50/30 p-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                        Button
                      </p>
                      <p className="text-sm text-stone-700">
                        {homeContent.ourStory.ctaLabel || '—'} ({homeContent.ourStory.ctaHref || '—'})
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {modalMode === 'edit' && (
                <div className="px-6 py-4 border-t border-stone-100 bg-stone-50/60 flex justify-end">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-[#0F172A] text-white px-6 py-2 rounded font-semibold text-[12px] flex items-center gap-2 hover:bg-muted-burgundy-rose transition-all shadow-lg disabled:opacity-60"
                  >
                    <Save size={14} />
                    {saving ? 'Saving...' : 'Save Our Story'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

