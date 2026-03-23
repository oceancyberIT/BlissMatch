'use client';

import { useCallback, useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Eye, Pencil, Trash2, Save, Blocks, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ServicesContent, ServicesSectionKey } from '@/components/admin/services-editor/types';
import { INITIAL_SERVICES_CONTENT } from '@/components/admin/services-editor/constants';
import {
  ServicesGridForm,
  ServicesSocialForm,
  ServicesConfidentialityForm,
} from '@/components/admin/services-admin-forms';

export type ServicesComponentCardPageProps = {
  sectionKey: ServicesSectionKey;
  layoutTitle: string;
  layoutDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  cardTitle: string;
  cardHint: string;
  saveLabel: string;
  successMessage: string;
  deleteMessage: string;
};

function mergeLoaded(raw: unknown): ServicesContent {
  if (!raw || typeof raw !== 'object') return INITIAL_SERVICES_CONTENT;
  const d = raw as Partial<ServicesContent>;
  return {
    ...INITIAL_SERVICES_CONTENT,
    ...d,
    grid: {
      ...INITIAL_SERVICES_CONTENT.grid,
      ...d.grid,
      cards:
        Array.isArray(d.grid?.cards) && d.grid!.cards!.length > 0
          ? d.grid!.cards!
          : INITIAL_SERVICES_CONTENT.grid.cards,
      banner: {
        ...INITIAL_SERVICES_CONTENT.grid.banner,
        ...d.grid?.banner,
      },
    },
    socialImpact: {
      ...INITIAL_SERVICES_CONTENT.socialImpact,
      ...d.socialImpact,
    },
    confidentiality: {
      ...INITIAL_SERVICES_CONTENT.confidentiality,
      ...d.confidentiality,
      bullets:
        Array.isArray(d.confidentiality?.bullets) &&
        d.confidentiality!.bullets!.length > 0
          ? d.confidentiality!.bullets!
          : INITIAL_SERVICES_CONTENT.confidentiality.bullets,
    },
  };
}

function previewForSection(
  key: ServicesSectionKey,
  content: ServicesContent,
): { eyebrow: string; title: string; subtitle: string; imageUrl: string | null } {
  switch (key) {
    case 'grid':
      return {
        eyebrow: 'Service grid',
        title: content.grid.cards[0]?.title || 'No cards yet',
        subtitle: content.grid.banner.title || '',
        imageUrl: null,
      };
    case 'socialImpact':
      return {
        eyebrow: content.socialImpact.eyebrow,
        title: `${content.socialImpact.headingMain} ${content.socialImpact.headingAccent}`.trim(),
        subtitle: content.socialImpact.paragraphOne || '',
        imageUrl: content.socialImpact.imageUrl || null,
      };
    case 'confidentiality':
      return {
        eyebrow: 'Confidentiality',
        title: content.confidentiality.title,
        subtitle: content.confidentiality.subtitle,
        imageUrl: content.confidentiality.imageTopLeft || null,
      };
    default:
      return { eyebrow: '', title: '', subtitle: '', imageUrl: null };
  }
}

function ViewSectionReadOnly({
  sectionKey,
  content,
}: {
  sectionKey: ServicesSectionKey;
  content: ServicesContent;
}) {
  if (sectionKey === 'grid') {
    const g = content.grid;
    return (
      <div className="space-y-6">
        <ul className="space-y-3">
          {g.cards.map((card, i) => (
            <li key={i} className="rounded-lg border border-stone-200 p-4">
              <span className="text-[10px] font-black text-muted-burgundy-rose uppercase">{card.size}</span>
              <p className="font-semibold text-deep-midnight-navy">{card.title}</p>
              <p className="text-sm text-stone-600">{card.desc}</p>
            </li>
          ))}
        </ul>
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
          <p className="text-[10px] font-black uppercase text-stone-500">{g.banner.eyebrow}</p>
          <p className="text-lg font-serif font-semibold">{g.banner.title}</p>
          <p className="text-sm text-stone-600">{g.banner.paragraph}</p>
        </div>
      </div>
    );
  }
  if (sectionKey === 'socialImpact') {
    const s = content.socialImpact;
    return (
      <div className="space-y-4 text-sm text-stone-700">
        {s.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s.imageUrl} alt={s.imageAlt} className="max-h-56 rounded-lg border object-cover" />
        ) : null}
        <p className="text-[10px] font-black uppercase text-stone-500">{s.eyebrow}</p>
        <p>
          <strong>{s.headingMain}</strong> <em className="text-muted-burgundy-rose">{s.headingAccent}</em>
        </p>
        <p className="italic border-l-2 pl-3">&quot;{s.overlayQuote}&quot;</p>
        <p>{s.paragraphOne}</p>
        <p>{s.paragraphTwo}</p>
        <div className="border-t pt-3">
          <p className="font-semibold text-xs uppercase">{s.commitmentTitle}</p>
          <p className="text-stone-600">{s.commitmentText}</p>
        </div>
      </div>
    );
  }
  const c = content.confidentiality;
  return (
    <div className="space-y-4">
      <h4 className="text-xl font-serif text-deep-midnight-navy">{c.title}</h4>
      <p className="text-sm text-muted-burgundy-rose font-bold uppercase tracking-widest">{c.subtitle}</p>
      <div className="grid grid-cols-2 gap-2 max-w-md">
        {[c.imageTopLeft, c.imageTopRight, c.imageBottomRight, c.imageBottomLeft].map((src, i) => (
          <div key={i} className="aspect-square rounded border overflow-hidden bg-stone-100 relative">
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt="" className="w-full h-full object-cover" />
            ) : null}
          </div>
        ))}
      </div>
      <ol className="list-decimal pl-5 space-y-2 text-sm text-stone-700">
        {c.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ol>
    </div>
  );
}

export function ServicesComponentCardPage(props: ServicesComponentCardPageProps) {
  const {
    sectionKey,
    layoutTitle,
    layoutDescription,
    heroTitle,
    heroSubtitle,
    cardTitle,
    cardHint,
    saveLabel,
    successMessage,
    deleteMessage,
  } = props;

  const [servicesContent, setServicesContent] = useState<ServicesContent>(INITIAL_SERVICES_CONTENT);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const updateSection = useCallback((section: ServicesSectionKey, patch: Record<string, unknown>) => {
    setServicesContent((prev) => ({
      ...prev,
      [section]: { ...(prev as any)[section], ...patch },
    }));
  }, []);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch('/api/admin/services');
        const data = await res.json().catch(() => null);
        if (!active) return;
        if (res.ok && data) setServicesContent(mergeLoaded(data));
        else setServicesContent(INITIAL_SERVICES_CONTENT);
      } catch {
        if (!active) return;
        setServicesContent(INITIAL_SERVICES_CONTENT);
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
    typeof window !== 'undefined' ? window.localStorage.getItem('blissmatch_admin_token') : null;

  const handleSave = async () => {
    if (!token) {
      setToast({ type: 'error', message: 'Login first.' });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(servicesContent),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setToast({ type: 'error', message: data?.message || 'Could not save.' });
        return;
      }
      setModalMode('view');
      setIsModalOpen(false);
      setToast({ type: 'success', message: successMessage });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!token) {
      setToast({ type: 'error', message: 'Login first.' });
      return;
    }
    const next: ServicesContent = {
      ...servicesContent,
      [sectionKey]: INITIAL_SERVICES_CONTENT[sectionKey],
    } as ServicesContent;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(next),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setToast({ type: 'error', message: data?.message || 'Could not reset section.' });
        return;
      }
      setServicesContent(next);
      setModalMode('view');
      setIsModalOpen(false);
      setToast({ type: 'success', message: deleteMessage });
    } finally {
      setSaving(false);
    }
  };

  const preview = previewForSection(sectionKey, servicesContent);
  const c = servicesContent;

  const renderEditor = () => {
    if (sectionKey === 'grid') {
      return (
        <ServicesGridForm
          value={c.grid}
          onChange={(grid) => updateSection('grid', grid as Record<string, unknown>)}
        />
      );
    }
    if (sectionKey === 'socialImpact') {
      return (
        <ServicesSocialForm
          value={c.socialImpact}
          onChange={(socialImpact) =>
            updateSection('socialImpact', socialImpact as Record<string, unknown>)
          }
        />
      );
    }
    return (
      <ServicesConfidentialityForm
        value={c.confidentiality}
        onChange={(confidentiality) =>
          updateSection('confidentiality', confidentiality as Record<string, unknown>)
        }
      />
    );
  };

  const PlaceholderIcon =
    sectionKey === 'grid' ? Blocks : sectionKey === 'socialImpact' ? Heart : Shield;

  return (
    <AdminLayout title={layoutTitle} description={layoutDescription}>
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
          <h2 className="text-3xl font-black italic uppercase tracking-tight">{heroTitle}</h2>
          <p className="text-stone-400 text-[11px] font-medium uppercase tracking-widest mt-2">
            {heroSubtitle}
          </p>
        </div>

        <div className="bg-white rounded-md border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <h3 className="text-sm font-black text-deep-midnight-navy uppercase tracking-widest">
                {cardTitle}
              </h3>
              <p className="text-[10px] font-medium text-stone-400 mt-1">{cardHint}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setModalMode('view');
                  setIsModalOpen(true);
                }}
                className="p-2 rounded border bg-white border-stone-200 text-stone-500 hover:border-stone-300 transition-all"
                aria-label="View"
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
                aria-label="Edit"
              >
                <Pencil size={14} />
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="p-2 rounded border border-red-200 bg-white text-red-500 hover:bg-red-50 transition-all disabled:opacity-60"
                aria-label="Reset section"
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
                {preview.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preview.imageUrl}
                    alt=""
                    className="h-16 w-16 rounded-lg border border-stone-200 object-cover shrink-0"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg border border-stone-200 bg-white flex items-center justify-center shrink-0">
                    <PlaceholderIcon className="h-6 w-6 text-stone-300" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                    {preview.eyebrow}
                  </p>
                  <p className="text-sm font-semibold text-deep-midnight-navy truncate">{preview.title}</p>
                  <p className="text-[11px] text-stone-500 truncate">{preview.subtitle}</p>
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
                    {modalMode === 'edit' ? `Edit ${heroTitle}` : `View ${heroTitle}`}
                  </h3>
                  <p className="text-[10px] text-stone-400">
                    {modalMode === 'edit' ? 'Update and save.' : 'Read-only preview.'}
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
                  renderEditor()
                ) : (
                  <ViewSectionReadOnly sectionKey={sectionKey} content={servicesContent} />
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
                    {saving ? 'Saving...' : saveLabel}
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
