'use client';

import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Save, Plus, BookOpen, Shield, ListOrdered, MessageSquare } from 'lucide-react';
import { AboutContent } from '@/components/admin/about-editor/types';
import {
  INITIAL_ABOUT_CONTENT,
  mergeAboutContent,
} from '@/components/admin/about-editor/constants';
import { ImageUrlField } from '@/components/admin/home-editor/image-url-field';
import { FormField } from '@/components/admin/home-editor/form-field';

type AboutTab = 'philosophy' | 'discretion' | 'process' | 'cta';

const ABOUT_TABS: Array<{
  key: AboutTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { key: 'philosophy', label: 'Philosophy', icon: BookOpen },
  { key: 'discretion', label: 'Discretion', icon: Shield },
  { key: 'process', label: 'Process', icon: ListOrdered },
  { key: 'cta', label: 'Call To Action', icon: MessageSquare },
];

const fieldClass =
  'w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-muted-burgundy-rose';

export default function AdminAboutPage() {
  const [activeTab, setActiveTab] = useState<AboutTab>('philosophy');
  const [content, setContent] = useState<AboutContent>(INITIAL_ABOUT_CONTENT);
  const [loadReady, setLoadReady] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch('/api/admin/about', { cache: 'no-store' });
        const data = await res.json().catch(() => null);
        if (!active) return;
        if (res.ok && data && typeof data === 'object' && data !== null) {
          setContent(mergeAboutContent(data as Partial<AboutContent>));
        } else {
          setContent(INITIAL_ABOUT_CONTENT);
        }
      } catch {
        if (active) setContent(INITIAL_ABOUT_CONTENT);
      } finally {
        if (active) setLoadReady(true);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const handleSave = async () => {
    const token =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('blissmatch_admin_token')
        : null;

    if (!token) {
      setMessage('Login first.');
      setTimeout(() => setMessage(null), 2500);
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
        body: JSON.stringify(content),
        cache: 'no-store',
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setMessage(data?.message ?? 'Could not save about content.');
        setTimeout(() => setMessage(null), 3000);
        return;
      }
      if (data && typeof data === 'object' && data !== null) {
        setContent(mergeAboutContent(data as Partial<AboutContent>));
      }
      setMessage('About page saved.');
      setTimeout(() => setMessage(null), 2500);
    } finally {
      setSaving(false);
    }
  };

  const tabLabel = useMemo(
    () => ABOUT_TABS.find((t) => t.key === activeTab)?.label ?? 'Philosophy',
    [activeTab],
  );

  const renderEditor = () => {
    if (activeTab === 'philosophy') {
      return (
        <div className="space-y-4">
          <FormField label="Eyebrow" hint="Small line above title">
            <input
              className={fieldClass}
              value={content.philosophy.eyebrow}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  philosophy: { ...p.philosophy, eyebrow: e.target.value },
                }))
              }
            />
          </FormField>
          <FormField label="Main heading">
            <input
              className={fieldClass}
              value={content.philosophy.headingMain}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  philosophy: { ...p.philosophy, headingMain: e.target.value },
                }))
              }
            />
          </FormField>
          <FormField label="Heading accent">
            <input
              className={fieldClass}
              value={content.philosophy.headingAccent}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  philosophy: { ...p.philosophy, headingAccent: e.target.value },
                }))
              }
            />
          </FormField>
          <FormField label="Quote">
            <textarea
              rows={3}
              className={fieldClass}
              value={content.philosophy.quote}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  philosophy: { ...p.philosophy, quote: e.target.value },
                }))
              }
            />
          </FormField>
          <FormField label="Body">
            <textarea
              rows={3}
              className={fieldClass}
              value={content.philosophy.body}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  philosophy: { ...p.philosophy, body: e.target.value },
                }))
              }
            />
          </FormField>
          <FormField label="Left image" hint="Paste URL or upload from your computer">
            <ImageUrlField
              value={content.philosophy.imageLeft}
              onChange={(v) =>
                setContent((p) => ({ ...p, philosophy: { ...p.philosophy, imageLeft: v } }))
              }
            />
          </FormField>
          <FormField label="Center image" hint="Paste URL or upload from your computer">
            <ImageUrlField
              value={content.philosophy.imageCenter}
              onChange={(v) =>
                setContent((p) => ({ ...p, philosophy: { ...p.philosophy, imageCenter: v } }))
              }
            />
          </FormField>
          <FormField label="Right image" hint="Paste URL or upload from your computer">
            <ImageUrlField
              value={content.philosophy.imageRight}
              onChange={(v) =>
                setContent((p) => ({ ...p, philosophy: { ...p.philosophy, imageRight: v } }))
              }
            />
          </FormField>
          <FormField label="Promise title">
            <input
              className={fieldClass}
              value={content.philosophy.promiseTitle}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  philosophy: { ...p.philosophy, promiseTitle: e.target.value },
                }))
              }
            />
          </FormField>
          <FormField label="Promise text">
            <textarea
              rows={2}
              className={fieldClass}
              value={content.philosophy.promiseText}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  philosophy: { ...p.philosophy, promiseText: e.target.value },
                }))
              }
            />
          </FormField>
          <FormField label="Trust title">
            <input
              className={fieldClass}
              value={content.philosophy.trustTitle}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  philosophy: { ...p.philosophy, trustTitle: e.target.value },
                }))
              }
            />
          </FormField>
          <FormField label="Trust text">
            <textarea
              rows={2}
              className={fieldClass}
              value={content.philosophy.trustText}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  philosophy: { ...p.philosophy, trustText: e.target.value },
                }))
              }
            />
          </FormField>
          <FormField label="Trust subtext">
            <input
              className={fieldClass}
              value={content.philosophy.trustSubtext}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  philosophy: { ...p.philosophy, trustSubtext: e.target.value },
                }))
              }
            />
          </FormField>
        </div>
      );
    }
    if (activeTab === 'discretion') {
      return (
        <div className="space-y-4">
          <input
            className={fieldClass}
            value={content.discretion.badge}
            onChange={(e) =>
              setContent((p) => ({
                ...p,
                discretion: { ...p.discretion, badge: e.target.value },
              }))
            }
            placeholder="Badge"
          />
          <input
            className={fieldClass}
            value={content.discretion.headingMain}
            onChange={(e) =>
              setContent((p) => ({
                ...p,
                discretion: { ...p.discretion, headingMain: e.target.value },
              }))
            }
            placeholder="Heading main"
          />
          <input
            className={fieldClass}
            value={content.discretion.headingAccent}
            onChange={(e) =>
              setContent((p) => ({
                ...p,
                discretion: { ...p.discretion, headingAccent: e.target.value },
              }))
            }
            placeholder="Heading accent"
          />
          <textarea
            rows={3}
            className={fieldClass}
            value={content.discretion.paragraph}
            onChange={(e) =>
              setContent((p) => ({
                ...p,
                discretion: { ...p.discretion, paragraph: e.target.value },
              }))
            }
            placeholder="Paragraph"
          />
          {content.discretion.cards.map((card, idx) => (
            <div key={idx} className="rounded border border-stone-200 p-3 space-y-2">
              <input
                className={fieldClass}
                value={card.title}
                onChange={(e) =>
                  setContent((p) => {
                    const next = [...p.discretion.cards];
                    next[idx] = { ...next[idx], title: e.target.value };
                    return { ...p, discretion: { ...p.discretion, cards: next } };
                  })
                }
                placeholder={`Card ${idx + 1} title`}
              />
              <textarea
                rows={2}
                className={fieldClass}
                value={card.desc}
                onChange={(e) =>
                  setContent((p) => {
                    const next = [...p.discretion.cards];
                    next[idx] = { ...next[idx], desc: e.target.value };
                    return { ...p, discretion: { ...p.discretion, cards: next } };
                  })
                }
                placeholder={`Card ${idx + 1} description`}
              />
            </div>
          ))}
        </div>
      );
    }
    if (activeTab === 'process') {
      return (
        <div className="space-y-4">
          <input
            className={fieldClass}
            value={content.process.eyebrow}
            onChange={(e) =>
              setContent((p) => ({
                ...p,
                process: { ...p.process, eyebrow: e.target.value },
              }))
            }
            placeholder="Eyebrow"
          />
          <input
            className={fieldClass}
            value={content.process.heading}
            onChange={(e) =>
              setContent((p) => ({
                ...p,
                process: { ...p.process, heading: e.target.value },
              }))
            }
            placeholder="Heading"
          />
          <FormField label="Background image" hint="Paste URL or upload from your computer">
            <ImageUrlField
              value={content.process.backgroundImageUrl}
              onChange={(v) =>
                setContent((p) => ({ ...p, process: { ...p.process, backgroundImageUrl: v } }))
              }
            />
          </FormField>
          {content.process.steps.map((step, idx) => (
            <div key={idx} className="rounded border border-stone-200 p-3 space-y-2">
              <input
                className={fieldClass}
                value={step.id}
                onChange={(e) =>
                  setContent((p) => {
                    const next = [...p.process.steps];
                    next[idx] = { ...next[idx], id: e.target.value };
                    return { ...p, process: { ...p.process, steps: next } };
                  })
                }
                placeholder="Step id"
              />
              <input
                className={fieldClass}
                value={step.title}
                onChange={(e) =>
                  setContent((p) => {
                    const next = [...p.process.steps];
                    next[idx] = { ...next[idx], title: e.target.value };
                    return { ...p, process: { ...p.process, steps: next } };
                  })
                }
                placeholder="Step title"
              />
              <textarea
                rows={2}
                className={fieldClass}
                value={step.description}
                onChange={(e) =>
                  setContent((p) => {
                    const next = [...p.process.steps];
                    next[idx] = { ...next[idx], description: e.target.value };
                    return { ...p, process: { ...p.process, steps: next } };
                  })
                }
                placeholder="Step description"
              />
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="space-y-4">
        <input
          className={fieldClass}
          value={content.cta.eyebrow}
          onChange={(e) =>
            setContent((p) => ({ ...p, cta: { ...p.cta, eyebrow: e.target.value } }))
          }
          placeholder="Eyebrow"
        />
        <input
          className={fieldClass}
          value={content.cta.headingMain}
          onChange={(e) =>
            setContent((p) => ({ ...p, cta: { ...p.cta, headingMain: e.target.value } }))
          }
          placeholder="Heading main"
        />
        <input
          className={fieldClass}
          value={content.cta.headingAccent}
          onChange={(e) =>
            setContent((p) => ({ ...p, cta: { ...p.cta, headingAccent: e.target.value } }))
          }
          placeholder="Heading accent"
        />
        <textarea
          rows={3}
          className={fieldClass}
          value={content.cta.paragraph}
          onChange={(e) =>
            setContent((p) => ({ ...p, cta: { ...p.cta, paragraph: e.target.value } }))
          }
          placeholder="Paragraph"
        />
        <input
          className={fieldClass}
          value={content.cta.buttonLabel}
          onChange={(e) =>
            setContent((p) => ({ ...p, cta: { ...p.cta, buttonLabel: e.target.value } }))
          }
          placeholder="Button label"
        />
        <input
          className={fieldClass}
          value={content.cta.buttonHref}
          onChange={(e) =>
            setContent((p) => ({ ...p, cta: { ...p.cta, buttonHref: e.target.value } }))
          }
          placeholder="Button href"
        />
        <div className="space-y-3 pt-4 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase text-stone-400">Gallery images</p>
            <button
              type="button"
              onClick={() =>
                setContent((p) => ({
                  ...p,
                  cta: { ...p.cta, images: [...p.cta.images, { src: '', alt: '' }] },
                }))
              }
              className="p-1.5 rounded-lg bg-stone-100 text-stone-600 hover:bg-deep-midnight-navy hover:text-white transition-all"
            >
              <Plus size={14} />
            </button>
          </div>
          {content.cta.images.map((im, idx) => (
            <div key={idx} className="rounded border border-stone-200 p-3 space-y-2">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-[10px] text-red-500 font-bold uppercase"
                  onClick={() =>
                    setContent((p) => {
                      const next = p.cta.images.filter((_, i) => i !== idx);
                      return {
                        ...p,
                        cta: {
                          ...p.cta,
                          images: next.length ? next : [{ src: '', alt: '' }],
                        },
                      };
                    })
                  }
                >
                  Remove
                </button>
              </div>
              <FormField label={`Image ${idx + 1}`} hint="URL or upload">
                <ImageUrlField
                  value={im.src}
                  onChange={(v) =>
                    setContent((p) => {
                      const next = [...p.cta.images];
                      next[idx] = { ...next[idx], src: v };
                      return { ...p, cta: { ...p.cta, images: next } };
                    })
                  }
                />
              </FormField>
              <FormField label="Alt text">
                <input
                  className={fieldClass}
                  value={im.alt}
                  onChange={(e) =>
                    setContent((p) => {
                      const next = [...p.cta.images];
                      next[idx] = { ...next[idx], alt: e.target.value };
                      return { ...p, cta: { ...p.cta, images: next } };
                    })
                  }
                />
              </FormField>
            </div>
          ))}
        </div>
        <div className="space-y-2 pt-4 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase text-stone-400">Locations</p>
            <button
              type="button"
              onClick={() =>
                setContent((p) => ({
                  ...p,
                  cta: { ...p.cta, locations: [...p.cta.locations, ''] },
                }))
              }
              className="p-1.5 rounded-lg bg-stone-100 text-stone-600 hover:bg-deep-midnight-navy hover:text-white transition-all"
            >
              <Plus size={14} />
            </button>
          </div>
          {content.cta.locations.map((loc, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                className={fieldClass}
                value={loc}
                onChange={(e) =>
                  setContent((p) => {
                    const next = [...p.cta.locations];
                    next[idx] = e.target.value;
                    return { ...p, cta: { ...p.cta, locations: next } };
                  })
                }
                placeholder="City or region"
              />
              <button
                type="button"
                className="text-xs text-red-500 shrink-0 px-2"
                onClick={() =>
                  setContent((p) => {
                    const next = p.cta.locations.filter((_, i) => i !== idx);
                    return {
                      ...p,
                      cta: { ...p.cta, locations: next.length ? next : [''] },
                    };
                  })
                }
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <AdminLayout
      title="About Page"
      description="Edit all About sections in one place, or use About sections in the sidebar for card view."
    >
      <div className="space-y-6">
        <div className="rounded-2xl bg-[#0F172A] p-8 text-white shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-burgundy-rose">
            About Editor
          </p>
          <h2 className="mt-2 text-3xl font-black italic uppercase tracking-tight">About content</h2>
          <p className="mt-2 text-[11px] uppercase tracking-widest text-stone-400">
            Same content as the About section cards — save here or on each card page.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
            {ABOUT_TABS.map((tab) => {
              const isActive = tab.key === activeTab;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'group relative flex items-center gap-3 rounded-md px-4 py-2 transition-all duration-300 border',
                    isActive
                      ? 'bg-[#0F172A] text-white border-[#0F172A]'
                      : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50 hover:text-deep-midnight-navy',
                  )}
                >
                  <div
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300',
                      isActive
                        ? 'bg-white/10 ring-1 ring-white/20'
                        : 'bg-stone-100 group-hover:bg-white',
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-4 w-4 transition-colors',
                        isActive
                          ? 'text-muted-burgundy-rose'
                          : 'text-stone-400 group-hover:text-muted-burgundy-rose',
                      )}
                    />
                  </div>
                  <span className="text-[11px] font-black tracking-widest">
                    {tab.label}
                  </span>
                  {isActive && (
                    <span className="ml-1 h-1.5 w-1.5 rounded-full bg-muted-burgundy-rose animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-widest text-deep-midnight-navy">
              {tabLabel} settings
            </h3>
            <Button
              type="button"
              onClick={handleSave}
              disabled={saving || !loadReady}
              className="rounded-md bg-deep-midnight-navy px-5 py-2 text-xs font-black uppercase tracking-widest text-white hover:bg-muted-burgundy-rose"
            >
              <Save size={14} className="mr-2" />
              {saving ? 'Saving...' : 'Save About Page'}
            </Button>
          </div>

          {message && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-burgundy-rose">
              {message}
            </p>
          )}

          {!loadReady ? (
            <p className="text-sm text-stone-500">Loading saved content…</p>
          ) : (
            renderEditor()
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
