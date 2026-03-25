'use client';

import { useCallback, useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Eye, Pencil, Trash2, Save, Briefcase, Heart, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  BlissCircleSection,
  INITIAL_CONTENT,
  LoveConnectionSection,
  ServicesOverviewSection,
  WhyChooseUsSection,
} from '@/components/admin/home-editor/sections';
import { HomeContent } from '@/components/admin/home-editor/types';

export type HomeComponentSectionKey =
  | 'servicesOverview'
  | 'loveConnection'
  | 'blissCircle'
  | 'whyChooseUs';

export type HomeComponentCardPageProps = {
  sectionKey: HomeComponentSectionKey;
  layoutTitle: string;
  layoutDescription: string;
  /** Large hero title (e.g. DISCOVER LASTING LOVE) */
  heroTitle: string;
  heroSubtitle: string;
  cardTitle: string;
  cardHint: string;
  saveLabel: string;
  successMessage: string;
  deleteMessage: string;
};

function previewForSection(
  key: HomeComponentSectionKey,
  content: HomeContent,
): { eyebrow: string; title: string; subtitle: string; imageUrl: string | null } {
  switch (key) {
    case 'servicesOverview':
      return {
        eyebrow: 'Discover lasting love',
        title: content.servicesOverview.heading || 'No heading yet',
        subtitle:
          content.servicesOverview.cards[0]?.description ||
          content.servicesOverview.cards[0]?.title ||
          'Add service cards in the editor.',
        imageUrl: null,
      };
    case 'loveConnection': {
      const img = content.loveConnection.images[0];
      return {
        eyebrow: 'Love & connection',
        title: content.loveConnection.heading || 'No heading yet',
        subtitle: content.loveConnection.subtext || 'No support text yet',
        imageUrl: img?.url || null,
      };
    }
    case 'blissCircle':
      return {
        eyebrow: content.blissCircle.eyebrow || 'Bliss circle',
        title:
          [content.blissCircle.headingMain, content.blissCircle.headingAccent]
            .filter(Boolean)
            .join(' ') || 'No heading yet',
        subtitle: content.blissCircle.paragraphOne || 'No description yet',
        imageUrl: content.blissCircle.imageUrl || null,
      };
    case 'whyChooseUs':
      return {
        eyebrow: content.whyChooseUs.eyebrow || 'Why choose us',
        title:
          [content.whyChooseUs.headingMain, content.whyChooseUs.headingAccent]
            .filter(Boolean)
            .join(' ') || 'No heading yet',
        subtitle: content.whyChooseUs.quote || content.whyChooseUs.paragraphOne || 'No quote yet',
        imageUrl: null,
      };
    default:
      return { eyebrow: '', title: '', subtitle: '', imageUrl: null };
  }
}

function ViewSectionReadOnly({
  sectionKey,
  content,
}: {
  sectionKey: HomeComponentSectionKey;
  content: HomeContent;
}) {
  if (sectionKey === 'servicesOverview') {
    const s = content.servicesOverview;
    return (
      <div className="space-y-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Heading</p>
          <p className="text-lg font-semibold text-deep-midnight-navy mt-1">{s.heading}</p>
        </div>
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Cards</p>
          <ul className="space-y-3">
            {s.cards.map((c, i) => (
              <li key={i} className="rounded-xl border border-stone-200 bg-stone-50/40 p-4">
                <p className="text-[10px] font-black text-muted-burgundy-rose uppercase">{c.id}</p>
                <p className="font-semibold text-deep-midnight-navy">{c.title}</p>
                <p className="text-sm text-stone-600 mt-1">{c.description}</p>
                <p className="text-xs text-stone-500 mt-2">{c.ctaLabel}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  if (sectionKey === 'loveConnection') {
    const s = content.loveConnection;
    return (
      <div className="space-y-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Heading</p>
          <p className="text-lg font-semibold text-deep-midnight-navy mt-1">{s.heading}</p>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Support text</p>
          <p className="text-sm text-stone-600 mt-1 leading-relaxed">{s.subtext}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {s.images.map((im, i) => (
            <div key={i} className="rounded-xl border border-stone-200 overflow-hidden">
              {im.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={im.url} alt={im.alt || ''} className="h-40 w-full object-cover" />
              ) : (
                <div className="h-40 bg-stone-100" />
              )}
              <p className="p-2 text-[11px] text-stone-500">{im.alt || '—'}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (sectionKey === 'blissCircle') {
    const s = content.blissCircle;
    return (
      <div className="space-y-6">
        {s.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s.imageUrl} alt={s.imageAlt || ''} className="h-56 w-full object-cover rounded-xl border border-stone-200" />
        ) : (
          <div className="h-56 w-full rounded-xl border border-stone-200 bg-stone-50" />
        )}
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">{s.eyebrow}</p>
          <h4 className="text-2xl font-serif italic text-deep-midnight-navy">{s.headingMain}</h4>
          <p className="text-lg italic text-deep-midnight-navy">{s.headingAccent}</p>
          <p className="text-sm text-stone-600">{s.paragraphOne}</p>
          <p className="text-sm text-stone-600">{s.paragraphTwo}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {s.badges.map((b, i) => (
            <span key={i} className="rounded-full border border-stone-200 px-3 py-1 text-[10px] font-bold uppercase text-stone-600">
              {b.label}
            </span>
          ))}
        </div>
        <p className="text-sm text-stone-700">
          Overlay: <span className="font-semibold">{s.overlayTitle}</span> · {s.overlayCtaLabel}
        </p>
      </div>
    );
  }
  const s = content.whyChooseUs;
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">{s.eyebrow}</p>
        <h4 className="text-2xl font-serif italic text-deep-midnight-navy">{s.headingMain}</h4>
        <p className="text-lg italic text-deep-midnight-navy">{s.headingAccent}</p>
        <p className="text-sm text-stone-600 leading-relaxed">{s.paragraphOne}</p>
        <p className="text-sm italic text-stone-600">{s.quote}</p>
        <p className="text-sm text-stone-600 leading-relaxed">{s.paragraphTwo}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {s.valueCards.map((vc, i) => (
          <div key={i} className="rounded-xl border border-stone-200 bg-stone-50/40 p-4">
            <p className="font-semibold text-deep-midnight-navy">{vc.title}</p>
            <p className="text-sm text-stone-600 mt-1">{vc.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeComponentCardPage(props: HomeComponentCardPageProps) {
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

  const [homeContent, setHomeContent] = useState<HomeContent>(INITIAL_CONTENT);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [indices, setIndices] = useState({
    service: 0,
    love: 0,
    badge: 0,
    value: 0,
  });

  const updateSection = useCallback((section: typeof sectionKey, patch: Record<string, unknown>) => {
    setHomeContent((prev) => ({
      ...prev,
      [section]: { ...(prev as any)[section], ...patch },
    }));
  }, []);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch('/api/admin/home');
        const data = await res.json().catch(() => null);
        if (!active) return;
        if (res.ok && data) setHomeContent(data);
        else setHomeContent(INITIAL_CONTENT);
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

  const handleSave = async () => {
    if (!token) {
      setToast({ type: 'error', message: 'Login first.' });
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
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setToast({
          type: 'error',
          message: data?.message || 'Could not save.',
        });
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
    const next: HomeContent = {
      ...homeContent,
      [sectionKey]: INITIAL_CONTENT[sectionKey],
    } as HomeContent;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/home', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(next),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setToast({
          type: 'error',
          message: data?.message || 'Could not reset section.',
        });
        return;
      }
      setHomeContent(next);
      setIndices({ service: 0, love: 0, badge: 0, value: 0 });
      setModalMode('view');
      setIsModalOpen(false);
      setToast({ type: 'success', message: deleteMessage });
    } finally {
      setSaving(false);
    }
  };

  const preview = previewForSection(sectionKey, homeContent);

  const renderEditor = () => {
    const c = homeContent;
    if (sectionKey === 'servicesOverview') {
      return (
        <ServicesOverviewSection
          data={c.servicesOverview}
          selectedIndex={indices.service}
          setSelectedIndex={(i: number) => setIndices((p) => ({ ...p, service: i }))}
          onHeadingChange={(v: string) => updateSection('servicesOverview', { heading: v })}
          onAdd={() => {
            const nextCards = [
              ...c.servicesOverview.cards,
              {
                id: `${String(c.servicesOverview.cards.length + 1).padStart(2, '0')}.`,
                title: 'New Service',
                description: '',
                ctaLabel: "Let's Talk",
              },
            ];
            updateSection('servicesOverview', { cards: nextCards });
            setIndices((prev) => ({ ...prev, service: nextCards.length - 1 }));
          }}
          onDelete={(index: number) => {
            const nextCards = c.servicesOverview.cards.filter((_, i) => i !== index);
            updateSection('servicesOverview', { cards: nextCards });
            setIndices((prev) => ({ ...prev, service: Math.max(0, index - 1) }));
          }}
          onUpdateCard={(index: number, patch: Record<string, unknown>) => {
            const next = [...c.servicesOverview.cards];
            next[index] = { ...next[index], ...patch };
            updateSection('servicesOverview', { cards: next });
          }}
        />
      );
    }
    if (sectionKey === 'loveConnection') {
      return (
        <LoveConnectionSection
          data={c.loveConnection}
          selectedIndex={indices.love}
          setSelectedIndex={(i: number) => setIndices((p) => ({ ...p, love: i }))}
          onFieldChange={(f: string, v: string) =>
            updateSection('loveConnection', { [f]: v })
          }
          onAdd={() => {
            const next = [...c.loveConnection.images, { url: '', alt: '' }];
            updateSection('loveConnection', { images: next });
            setIndices((p) => ({ ...p, love: next.length - 1 }));
          }}
          onDelete={(idx: number) => {
            const next = c.loveConnection.images.filter((_, i) => i !== idx);
            updateSection('loveConnection', { images: next });
            setIndices((p) => ({ ...p, love: Math.max(0, idx - 1) }));
          }}
          onUpdateImage={(idx: number, patch: Record<string, unknown>) => {
            const next = [...c.loveConnection.images];
            next[idx] = { ...next[idx], ...patch };
            updateSection('loveConnection', { images: next });
          }}
        />
      );
    }
    if (sectionKey === 'blissCircle') {
      return (
        <BlissCircleSection
          data={c.blissCircle}
          selectedBadgeIndex={indices.badge}
          setSelectedBadgeIndex={(i: number) => setIndices((p) => ({ ...p, badge: i }))}
          onFieldChange={(f: string, v: string) => updateSection('blissCircle', { [f]: v })}
          onAddBadge={() => {
            const next = [...c.blissCircle.badges, { label: 'New Badge' }];
            updateSection('blissCircle', { badges: next });
            setIndices((p) => ({ ...p, badge: next.length - 1 }));
          }}
          onDeleteBadge={(idx: number) => {
            const next = c.blissCircle.badges.filter((_, i) => i !== idx);
            updateSection('blissCircle', { badges: next });
            setIndices((p) => ({ ...p, badge: Math.max(0, idx - 1) }));
          }}
          onUpdateBadge={(idx: number, patch: Record<string, unknown>) => {
            const next = [...c.blissCircle.badges];
            next[idx] = { ...next[idx], ...patch };
            updateSection('blissCircle', { badges: next });
          }}
        />
      );
    }
    return (
      <WhyChooseUsSection
        data={c.whyChooseUs}
        selectedIndex={indices.value}
        setSelectedIndex={(i: number) => setIndices((p) => ({ ...p, value: i }))}
        onFieldChange={(f: string, v: string) => updateSection('whyChooseUs', { [f]: v })}
        onAddValueCard={() => {
          const next = [...c.whyChooseUs.valueCards, { title: 'New Value', description: '' }];
          updateSection('whyChooseUs', { valueCards: next });
          setIndices((p) => ({ ...p, value: next.length - 1 }));
        }}
        onDeleteValueCard={(idx: number) => {
          const next = c.whyChooseUs.valueCards.filter((_, i) => i !== idx);
          updateSection('whyChooseUs', { valueCards: next });
          setIndices((p) => ({ ...p, value: Math.max(0, idx - 1) }));
        }}
        onUpdateValueCard={(idx: number, patch: Record<string, unknown>) => {
          const next = [...c.whyChooseUs.valueCards];
          next[idx] = { ...next[idx], ...patch };
          updateSection('whyChooseUs', { valueCards: next });
        }}
      />
    );
  };

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
                    {sectionKey === 'servicesOverview' && (
                      <Briefcase className="h-6 w-6 text-stone-300" />
                    )}
                    {sectionKey === 'loveConnection' && (
                      <Heart className="h-6 w-6 text-stone-300" />
                    )}
                    {sectionKey === 'blissCircle' && (
                      <Sparkles className="h-6 w-6 text-stone-300" />
                    )}
                    {sectionKey === 'whyChooseUs' && (
                      <Star className="h-6 w-6 text-stone-300" />
                    )}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                    {preview.eyebrow}
                  </p>
                  <p className="text-sm font-semibold text-deep-midnight-navy truncate">
                    {preview.title}
                  </p>
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
                    {modalMode === 'edit'
                      ? 'Update details and save.'
                      : 'Read-only details of this component.'}
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
                  <ViewSectionReadOnly sectionKey={sectionKey} content={homeContent} />
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
