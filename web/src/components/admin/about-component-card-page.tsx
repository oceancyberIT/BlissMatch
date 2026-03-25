'use client';

import { useCallback, useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Eye, Pencil, Trash2, Save, BookOpen, Shield, ListOrdered, MessageSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AboutContent } from '@/components/admin/about-editor/types';
import { INITIAL_ABOUT_CONTENT } from '@/components/admin/about-editor/constants';
import { ImageUrlField } from '@/components/admin/home-editor/image-url-field';
import { FormField } from '@/components/admin/home-editor/form-field';

export type AboutSectionKey = 'philosophy' | 'discretion' | 'process' | 'cta';

export type AboutComponentCardPageProps = {
  sectionKey: AboutSectionKey;
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

const fieldClass =
  'w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-muted-burgundy-rose';

function previewForSection(
  key: AboutSectionKey,
  content: AboutContent,
): { eyebrow: string; title: string; subtitle: string; imageUrl: string | null } {
  switch (key) {
    case 'philosophy':
      return {
        eyebrow: content.philosophy.eyebrow || 'Philosophy',
        title:
          [content.philosophy.headingMain, content.philosophy.headingAccent]
            .filter(Boolean)
            .join(' ') || 'No heading yet',
        subtitle: content.philosophy.quote || content.philosophy.body || '',
        imageUrl: content.philosophy.imageCenter || content.philosophy.imageLeft || null,
      };
    case 'discretion':
      return {
        eyebrow: content.discretion.badge || 'Discretion',
        title:
          [content.discretion.headingMain, content.discretion.headingAccent]
            .filter(Boolean)
            .join(' ') || 'No heading yet',
        subtitle: content.discretion.paragraph || '',
        imageUrl: null,
      };
    case 'process':
      return {
        eyebrow: content.process.eyebrow || 'Process',
        title: content.process.heading || 'No heading yet',
        subtitle: content.process.steps[0]?.title || '',
        imageUrl: content.process.backgroundImageUrl || null,
      };
    case 'cta':
      return {
        eyebrow: content.cta.eyebrow || 'Call to action',
        title:
          [content.cta.headingMain, content.cta.headingAccent].filter(Boolean).join(' ') ||
          'No heading yet',
        subtitle: content.cta.paragraph || '',
        imageUrl: content.cta.images?.[0]?.src || null,
      };
    default:
      return { eyebrow: '', title: '', subtitle: '', imageUrl: null };
  }
}

function ViewSectionReadOnly({
  sectionKey,
  content,
}: {
  sectionKey: AboutSectionKey;
  content: AboutContent;
}) {
  if (sectionKey === 'philosophy') {
    const s = content.philosophy;
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-2">
          {[s.imageLeft, s.imageCenter, s.imageRight].map((src, i) => (
            <div key={i} className="rounded-lg border overflow-hidden aspect-square">
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-stone-100" />
              )}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase text-stone-500">{s.eyebrow}</p>
          <h4 className="text-xl font-serif text-deep-midnight-navy">{s.headingMain}</h4>
          <p className="italic text-deep-midnight-navy">{s.headingAccent}</p>
          <p className="text-sm text-stone-600">{s.quote}</p>
          <p className="text-sm text-stone-600">{s.body}</p>
        </div>
        <div className="rounded-xl border border-stone-200 p-4 space-y-2 text-sm">
          <p className="font-semibold">{s.promiseTitle}</p>
          <p className="text-stone-600">{s.promiseText}</p>
          <p className="font-semibold pt-2">{s.trustTitle}</p>
          <p className="text-stone-600">{s.trustText}</p>
          <p className="text-xs text-stone-500">{s.trustSubtext}</p>
        </div>
      </div>
    );
  }
  if (sectionKey === 'discretion') {
    const s = content.discretion;
    return (
      <div className="space-y-6">
        <p className="text-[10px] font-black uppercase text-stone-500">{s.badge}</p>
        <h4 className="text-xl font-serif text-deep-midnight-navy">
          {s.headingMain} <span className="italic">{s.headingAccent}</span>
        </h4>
        <p className="text-sm text-stone-600 leading-relaxed">{s.paragraph}</p>
        <ul className="space-y-3">
          {s.cards.map((c, i) => (
            <li key={i} className="rounded-lg border border-stone-200 p-3">
              <p className="font-semibold text-deep-midnight-navy">{c.title}</p>
              <p className="text-sm text-stone-600">{c.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (sectionKey === 'process') {
    const s = content.process;
    return (
      <div className="space-y-6">
        {s.backgroundImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={s.backgroundImageUrl}
            alt=""
            className="h-48 w-full object-cover rounded-xl border"
          />
        ) : (
          <div className="h-48 rounded-xl border bg-stone-50" />
        )}
        <p className="text-[10px] font-black uppercase text-stone-500">{s.eyebrow}</p>
        <h4 className="text-xl font-serif text-deep-midnight-navy">{s.heading}</h4>
        <ol className="space-y-4">
          {s.steps.map((step, i) => (
            <li key={i} className="rounded-lg border border-stone-200 p-4">
              <span className="text-muted-burgundy-rose font-bold text-sm">{step.id}</span>{' '}
              <span className="font-semibold">{step.title}</span>
              <p className="text-sm text-stone-600 mt-2">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }
  const s = content.cta;
  const gallery = s.images ?? [];
  return (
    <div className="space-y-6">
      <p className="text-[10px] font-black uppercase text-stone-500">{s.eyebrow}</p>
      <h4 className="text-xl font-serif text-deep-midnight-navy">
        {s.headingMain} <span className="italic text-muted-burgundy-rose">{s.headingAccent}</span>
      </h4>
      <p className="text-sm text-stone-600">{s.paragraph}</p>
      <p className="text-sm">
        <span className="font-semibold">Button:</span> {s.buttonLabel} → {s.buttonHref}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {gallery.map((im, i) => (
          <div key={i} className="rounded-lg border overflow-hidden">
            {im.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={im.src} alt={im.alt} className="h-40 w-full object-cover" />
            ) : (
              <div className="h-40 bg-stone-100" />
            )}
            <p className="p-2 text-[11px] text-stone-500">{im.alt}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-stone-600">
        <span className="font-semibold">Locations:</span>{' '}
        {(s.locations ?? []).filter(Boolean).join(', ') || '—'}
      </p>
    </div>
  );
}

export function AboutComponentCardPage(props: AboutComponentCardPageProps) {
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

  const [aboutContent, setAboutContent] = useState<AboutContent>(INITIAL_ABOUT_CONTENT);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const updateSection = useCallback((section: AboutSectionKey, patch: Record<string, unknown>) => {
    setAboutContent((prev) => ({
      ...prev,
      [section]: { ...(prev as any)[section], ...patch },
    }));
  }, []);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch('/api/admin/about');
        const data = await res.json().catch(() => null);
        if (!active) return;
        if (res.ok && data && typeof data === 'object') {
          const d = data as Partial<AboutContent>;
          const merged: AboutContent = {
            ...INITIAL_ABOUT_CONTENT,
            ...d,
            cta: {
              ...INITIAL_ABOUT_CONTENT.cta,
              ...(d.cta ?? {}),
              images:
                Array.isArray(d.cta?.images) && d.cta!.images!.length
                  ? d.cta!.images!
                  : INITIAL_ABOUT_CONTENT.cta.images,
              locations:
                Array.isArray(d.cta?.locations) && d.cta!.locations!.length
                  ? d.cta!.locations!
                  : INITIAL_ABOUT_CONTENT.cta.locations,
            },
          };
          setAboutContent(merged);
        } else setAboutContent(INITIAL_ABOUT_CONTENT);
      } catch {
        if (!active) return;
        setAboutContent(INITIAL_ABOUT_CONTENT);
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
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(aboutContent),
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
    const next: AboutContent = {
      ...aboutContent,
      [sectionKey]: INITIAL_ABOUT_CONTENT[sectionKey],
    } as AboutContent;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/about', {
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
      setAboutContent(next);
      setModalMode('view');
      setIsModalOpen(false);
      setToast({ type: 'success', message: deleteMessage });
    } finally {
      setSaving(false);
    }
  };

  const preview = previewForSection(sectionKey, aboutContent);
  const c = aboutContent;

  const renderEditor = () => {
    if (sectionKey === 'philosophy') {
      const s = c.philosophy;
      return (
        <div className="space-y-4">
          <FormField label="Eyebrow" hint="Small line above title">
            <input className={fieldClass} value={s.eyebrow} onChange={(e) => updateSection('philosophy', { eyebrow: e.target.value })} />
          </FormField>
          <FormField label="Main heading">
            <input className={fieldClass} value={s.headingMain} onChange={(e) => updateSection('philosophy', { headingMain: e.target.value })} />
          </FormField>
          <FormField label="Second line (italics)">
            <input className={fieldClass} value={s.headingAccent} onChange={(e) => updateSection('philosophy', { headingAccent: e.target.value })} />
          </FormField>
          <FormField label="Quote">
            <textarea rows={3} className={fieldClass} value={s.quote} onChange={(e) => updateSection('philosophy', { quote: e.target.value })} />
          </FormField>
          <FormField label="Body">
            <textarea rows={3} className={fieldClass} value={s.body} onChange={(e) => updateSection('philosophy', { body: e.target.value })} />
          </FormField>
          <FormField label="Left image" hint="URL or upload">
            <ImageUrlField value={s.imageLeft} onChange={(v) => updateSection('philosophy', { imageLeft: v })} />
          </FormField>
          <FormField label="Center image" hint="URL or upload">
            <ImageUrlField value={s.imageCenter} onChange={(v) => updateSection('philosophy', { imageCenter: v })} />
          </FormField>
          <FormField label="Right image" hint="URL or upload">
            <ImageUrlField value={s.imageRight} onChange={(v) => updateSection('philosophy', { imageRight: v })} />
          </FormField>
          <FormField label="Promise title">
            <input className={fieldClass} value={s.promiseTitle} onChange={(e) => updateSection('philosophy', { promiseTitle: e.target.value })} />
          </FormField>
          <FormField label="Promise text">
            <textarea rows={2} className={fieldClass} value={s.promiseText} onChange={(e) => updateSection('philosophy', { promiseText: e.target.value })} />
          </FormField>
          <FormField label="Trust title">
            <input className={fieldClass} value={s.trustTitle} onChange={(e) => updateSection('philosophy', { trustTitle: e.target.value })} />
          </FormField>
          <FormField label="Trust text">
            <textarea rows={2} className={fieldClass} value={s.trustText} onChange={(e) => updateSection('philosophy', { trustText: e.target.value })} />
          </FormField>
          <FormField label="Trust subtext">
            <input className={fieldClass} value={s.trustSubtext} onChange={(e) => updateSection('philosophy', { trustSubtext: e.target.value })} />
          </FormField>
        </div>
      );
    }
    if (sectionKey === 'discretion') {
      const s = c.discretion;
      return (
        <div className="space-y-4">
          <FormField label="Badge">
            <input className={fieldClass} value={s.badge} onChange={(e) => updateSection('discretion', { badge: e.target.value })} />
          </FormField>
          <FormField label="Heading main">
            <input className={fieldClass} value={s.headingMain} onChange={(e) => updateSection('discretion', { headingMain: e.target.value })} />
          </FormField>
          <FormField label="Heading accent">
            <input className={fieldClass} value={s.headingAccent} onChange={(e) => updateSection('discretion', { headingAccent: e.target.value })} />
          </FormField>
          <FormField label="Paragraph">
            <textarea rows={4} className={fieldClass} value={s.paragraph} onChange={(e) => updateSection('discretion', { paragraph: e.target.value })} />
          </FormField>
          {s.cards.map((card, idx) => (
            <div key={idx} className="rounded border border-stone-200 p-3 space-y-2">
              <p className="text-[10px] font-black uppercase text-stone-400">Card {idx + 1}</p>
              <input
                className={fieldClass}
                value={card.title}
                onChange={(e) => {
                  const next = [...s.cards];
                  next[idx] = { ...next[idx], title: e.target.value };
                  updateSection('discretion', { cards: next });
                }}
                placeholder="Title"
              />
              <textarea
                rows={2}
                className={fieldClass}
                value={card.desc}
                onChange={(e) => {
                  const next = [...s.cards];
                  next[idx] = { ...next[idx], desc: e.target.value };
                  updateSection('discretion', { cards: next });
                }}
                placeholder="Description"
              />
            </div>
          ))}
        </div>
      );
    }
    if (sectionKey === 'process') {
      const s = c.process;
      return (
        <div className="space-y-4">
          <FormField label="Eyebrow">
            <input className={fieldClass} value={s.eyebrow} onChange={(e) => updateSection('process', { eyebrow: e.target.value })} />
          </FormField>
          <FormField label="Heading">
            <input className={fieldClass} value={s.heading} onChange={(e) => updateSection('process', { heading: e.target.value })} />
          </FormField>
          <FormField label="Background image" hint="URL or upload">
            <ImageUrlField value={s.backgroundImageUrl} onChange={(v) => updateSection('process', { backgroundImageUrl: v })} />
          </FormField>
          {s.steps.map((step, idx) => (
            <div key={idx} className="rounded border border-stone-200 p-3 space-y-2">
              <p className="text-[10px] font-black uppercase text-stone-400">Step {idx + 1}</p>
              <input
                className={fieldClass}
                value={step.id}
                onChange={(e) => {
                  const next = [...s.steps];
                  next[idx] = { ...next[idx], id: e.target.value };
                  updateSection('process', { steps: next });
                }}
                placeholder="Id (e.g. 01)"
              />
              <input
                className={fieldClass}
                value={step.title}
                onChange={(e) => {
                  const next = [...s.steps];
                  next[idx] = { ...next[idx], title: e.target.value };
                  updateSection('process', { steps: next });
                }}
                placeholder="Title"
              />
              <textarea
                rows={2}
                className={fieldClass}
                value={step.description}
                onChange={(e) => {
                  const next = [...s.steps];
                  next[idx] = { ...next[idx], description: e.target.value };
                  updateSection('process', { steps: next });
                }}
                placeholder="Description"
              />
            </div>
          ))}
        </div>
      );
    }
    const s = {
      ...c.cta,
      images: c.cta.images?.length ? c.cta.images : [{ src: '', alt: '' }],
      locations: c.cta.locations?.length ? c.cta.locations : [''],
    };
    return (
      <div className="space-y-4">
        <FormField label="Eyebrow">
          <input className={fieldClass} value={s.eyebrow} onChange={(e) => updateSection('cta', { eyebrow: e.target.value })} />
        </FormField>
        <FormField label="Heading main">
          <input className={fieldClass} value={s.headingMain} onChange={(e) => updateSection('cta', { headingMain: e.target.value })} />
        </FormField>
        <FormField label="Heading accent">
          <input className={fieldClass} value={s.headingAccent} onChange={(e) => updateSection('cta', { headingAccent: e.target.value })} />
        </FormField>
        <FormField label="Paragraph">
          <textarea rows={3} className={fieldClass} value={s.paragraph} onChange={(e) => updateSection('cta', { paragraph: e.target.value })} />
        </FormField>
        <FormField label="Button label">
          <input className={fieldClass} value={s.buttonLabel} onChange={(e) => updateSection('cta', { buttonLabel: e.target.value })} />
        </FormField>
        <FormField label="Button link">
          <input className={fieldClass} value={s.buttonHref} onChange={(e) => updateSection('cta', { buttonHref: e.target.value })} />
        </FormField>
        <div className="space-y-3 pt-2 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase text-stone-400">Gallery images</p>
            <button
              type="button"
              onClick={() =>
                updateSection('cta', {
                  images: [...s.images, { src: '', alt: '' }],
                })
              }
              className="p-1.5 rounded-lg bg-stone-100 text-stone-600 hover:bg-deep-midnight-navy hover:text-white transition-all"
            >
              <Plus size={14} />
            </button>
          </div>
          {s.images.map((im, idx) => (
            <div key={idx} className="rounded border border-stone-200 p-3 space-y-2">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-[10px] text-red-500 font-bold uppercase"
                  onClick={() => {
                    const next = s.images.filter((_, i) => i !== idx);
                    updateSection('cta', { images: next.length ? next : [{ src: '', alt: '' }] });
                  }}
                >
                  Remove
                </button>
              </div>
              <FormField label={`Image ${idx + 1}`} hint="URL or upload">
                <ImageUrlField value={im.src} onChange={(v) => {
                  const next = [...s.images];
                  next[idx] = { ...next[idx], src: v };
                  updateSection('cta', { images: next });
                }} />
              </FormField>
              <FormField label="Alt text">
                <input
                  className={fieldClass}
                  value={im.alt}
                  onChange={(e) => {
                    const next = [...s.images];
                    next[idx] = { ...next[idx], alt: e.target.value };
                    updateSection('cta', { images: next });
                  }}
                />
              </FormField>
            </div>
          ))}
        </div>
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase text-stone-400">Locations</p>
            <button
              type="button"
              onClick={() => updateSection('cta', { locations: [...s.locations, ''] })}
              className="p-1.5 rounded-lg bg-stone-100 text-stone-600 hover:bg-deep-midnight-navy hover:text-white transition-all"
            >
              <Plus size={14} />
            </button>
          </div>
          {s.locations.map((loc, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                className={fieldClass}
                value={loc}
                onChange={(e) => {
                  const next = [...s.locations];
                  next[idx] = e.target.value;
                  updateSection('cta', { locations: next });
                }}
                placeholder="City or region"
              />
              <button
                type="button"
                className="text-xs text-red-500 shrink-0 px-2"
                onClick={() => {
                  const next = s.locations.filter((_, i) => i !== idx);
                  updateSection('cta', { locations: next.length ? next : [''] });
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const PlaceholderIcon =
    sectionKey === 'philosophy'
      ? BookOpen
      : sectionKey === 'discretion'
        ? Shield
        : sectionKey === 'process'
          ? ListOrdered
          : MessageSquare;

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
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl font-black italic uppercase tracking-tight">{heroTitle}</h2>
              <p className="text-stone-400 text-[11px] font-medium uppercase tracking-widest mt-2">
                {heroSubtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 bg-white rounded-md border border-stone-200 shadow-sm overflow-hidden">
          <div className="flex min-w-0 flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="break-words text-sm font-black uppercase tracking-widest text-deep-midnight-navy">
                {cardTitle}
              </h3>
              <p className="mt-1 text-[10px] font-medium text-stone-400">{cardHint}</p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
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
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">{preview.eyebrow}</p>
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
                    {modalMode === 'edit' ? 'Update details and save.' : 'Read-only preview.'}
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
                {modalMode === 'edit' ? renderEditor() : <ViewSectionReadOnly sectionKey={sectionKey} content={aboutContent} />}
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
