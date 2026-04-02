'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Save, Sparkles, LayoutPanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HomeContent, SectionKey } from '@/components/admin/home-editor/types';
import {
  BlissCircleSection,
  INITIAL_CONTENT,
  LoveConnectionSection,
  mergeHomeContent,
  mergeCollageImages,
  OurStorySection,
  SECTION_TABS,
  ServicesOverviewSection,
  WhyChooseUsSection,
} from '@/components/admin/home-editor/sections';

export default function AdminHomePage() {
  // --- State Management ---
  const router = useRouter();
  const [queryTab, setQueryTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SectionKey>('ourStory');
  const [content, setContent] = useState<HomeContent>(INITIAL_CONTENT);
  const [message, setMessage] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Refs to avoid re-creating save handlers on every keystroke.
  const latestContentRef = useRef<HomeContent>(INITIAL_CONTENT);
  const lastSavedContentRef = useRef<string>(JSON.stringify(INITIAL_CONTENT));
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Index trackers for nested arrays
  const [indices, setIndices] = useState({
    service: 0,
    love: 0,
    badge: 0,
    value: 0,
  });

  // --- Helpers ---
  const activeMeta = useMemo(
    () => SECTION_TABS.find((s) => s.key === activeTab) ?? SECTION_TABS[0],
    [activeTab]
  );

  const updateSection = useCallback((section: SectionKey, patch: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...patch },
    }));
  }, []);

  // Keep a stable reference for the latest content.
  useEffect(() => {
    latestContentRef.current = content;
  }, [content]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlTab = new URLSearchParams(window.location.search).get('tab');
    setQueryTab(urlTab);
  });

  useEffect(() => {
    const urlTab = queryTab;
    if (!urlTab) return;
    const isValidTab = SECTION_TABS.some((section) => section.key === urlTab);
    if (isValidTab) {
      setActiveTab(urlTab as SectionKey);
    }
  }, [queryTab]);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch('/api/admin/home', { cache: 'no-store' });
        const data = await res.json().catch(() => null);
        if (!active) return;
        if (res.ok && data && typeof data === 'object' && data !== null) {
          const merged = mergeHomeContent(data);
          latestContentRef.current = merged;
          setContent(merged);
          lastSavedContentRef.current = JSON.stringify(merged);
          setMessage('Loaded.');
          setTimeout(() => setMessage(null), 2000);
        }
      } catch {
        // Keep the default INITIAL_CONTENT for testing
      } finally {
        if (active) setLoaded(true);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSave = useCallback(async (toastMessage = 'Saved.') => {
    const token =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('blissmatch_admin_token')
        : null;

    if (!token) {
      setMessage('Login first.');
      setToast({ type: 'error', message: 'Login first.' });
      setTimeout(() => setMessage(null), 3000);
      router.push('/admin/login');
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
        body: JSON.stringify(latestContentRef.current),
        cache: 'no-store',
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (res.status === 401) {
          window.localStorage.removeItem('blissmatch_admin_token');
          setMessage('Login again.');
          setToast({ type: 'error', message: 'Session expired. Login again.' });
          setTimeout(() => setMessage(null), 3000);
          router.push('/admin/login');
          return;
        }

        const errMessage = data?.message || 'Could not save changes.';
        setMessage(errMessage);
        setToast({ type: 'error', message: errMessage });
        setTimeout(() => setMessage(null), 3000);
        return;
      }

      if (data && typeof data === 'object' && data !== null) {
        const merged = mergeHomeContent(data);
        latestContentRef.current = merged;
        setContent(merged);
        lastSavedContentRef.current = JSON.stringify(merged);
      } else {
        lastSavedContentRef.current = JSON.stringify(latestContentRef.current);
      }

      setMessage(toastMessage);
      setToast({ type: 'success', message: toastMessage });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  }, [router]);

  // Auto-save any Home section after the admin stops typing.
  useEffect(() => {
    if (!loaded) return;

    const snapshot = JSON.stringify(content);
    if (snapshot === lastSavedContentRef.current) return;
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);

    autoSaveTimerRef.current = setTimeout(() => {
      setMessage('Saving component...');
      handleSave('Component saved.');
    }, 1200);

    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, [content, handleSave, loaded]);

  // --- Section Specific Handlers (Refactored for clarity) ---
  const handlers = {
    services: {
      add: () => {
        const nextCards = [...content.servicesOverview.cards, { 
          id: `${String(content.servicesOverview.cards.length + 1).padStart(2, '0')}.`,
          title: 'New Service', description: '', ctaLabel: "Let's Talk" 
        }];
        updateSection('servicesOverview', { cards: nextCards });
        setIndices(prev => ({ ...prev, service: nextCards.length - 1 }));
      },
      delete: (index: number) => {
        const nextCards = content.servicesOverview.cards.filter((_, i) => i !== index);
        updateSection('servicesOverview', { cards: nextCards });
        setIndices(prev => ({ ...prev, service: Math.max(0, index - 1) }));
      }
    },
    // Note: You can follow this pattern to collapse other add/delete functions 
    // to keep the main component body lean.
  };

  /**
   * Section Map: This replaces the long if/else chain in the JSX.
   * It makes adding new sections as simple as adding a line here.
   */
  const renderActiveSection = () => {
    const props: Record<SectionKey, any> = {
      ourStory: {
        data: content.ourStory,
        onFieldChange: (f: string, v: string) => updateSection('ourStory', { [f]: v }),
      },
      servicesOverview: {
        data: content.servicesOverview,
        selectedIndex: indices.service,
        setSelectedIndex: (i: number) => setIndices(p => ({ ...p, service: i })),
        onHeadingChange: (v: string) => updateSection('servicesOverview', { heading: v }),
        onIntroFieldChange: (field: string, value: string) =>
          updateSection('servicesOverview', { [field]: value }),
        onUpdateCollageSlot: (index: number, patch: Record<string, unknown>) => {
          const merged = mergeCollageImages(
            INITIAL_CONTENT.servicesOverview.collageImages,
            content.servicesOverview.collageImages,
          );
          merged[index] = { ...merged[index], ...patch };
          updateSection('servicesOverview', { collageImages: merged });
        },
        onAdd: handlers.services.add,
        onDelete: handlers.services.delete,
        onUpdateCard: (index: number, patch: any) => {
          const next = [...content.servicesOverview.cards];
          next[index] = { ...next[index], ...patch };
          updateSection('servicesOverview', { cards: next });
        }
      },
      loveConnection: {
        data: content.loveConnection,
        selectedIndex: indices.love,
        setSelectedIndex: (i: number) => setIndices(p => ({ ...p, love: i })),
        onFieldChange: (f: string, v: string) => updateSection('loveConnection', { [f]: v }),
        onAdd: () => {
          const next = [...content.loveConnection.images, { url: '', alt: '' }];
          updateSection('loveConnection', { images: next });
          setIndices(p => ({ ...p, love: next.length - 1 }));
        },
        onDelete: (idx: number) => {
          const next = content.loveConnection.images.filter((_, i) => i !== idx);
          updateSection('loveConnection', { images: next });
          setIndices(p => ({ ...p, love: Math.max(0, idx - 1) }));
        },
        onUpdateImage: (idx: number, patch: any) => {
          const next = [...content.loveConnection.images];
          next[idx] = { ...next[idx], ...patch };
          updateSection('loveConnection', { images: next });
        }
      },
      blissCircle: {
        data: content.blissCircle,
        selectedBadgeIndex: indices.badge,
        setSelectedBadgeIndex: (i: number) => setIndices(p => ({ ...p, badge: i })),
        onFieldChange: (f: string, v: string) => updateSection('blissCircle', { [f]: v }),
        onAddBadge: () => {
          const next = [...content.blissCircle.badges, { label: 'New Badge' }];
          updateSection('blissCircle', { badges: next });
          setIndices(p => ({ ...p, badge: next.length - 1 }));
        },
        onDeleteBadge: (idx: number) => {
          const next = content.blissCircle.badges.filter((_, i) => i !== idx);
          updateSection('blissCircle', { badges: next });
          setIndices(p => ({ ...p, badge: Math.max(0, idx - 1) }));
        },
        onUpdateBadge: (idx: number, patch: any) => {
          const next = [...content.blissCircle.badges];
          next[idx] = { ...next[idx], ...patch };
          updateSection('blissCircle', { badges: next });
        }
      },
      whyChooseUs: {
        data: content.whyChooseUs,
        selectedIndex: indices.value,
        setSelectedIndex: (i: number) => setIndices(p => ({ ...p, value: i })),
        onFieldChange: (f: string, v: string) => updateSection('whyChooseUs', { [f]: v }),
        onAddValueCard: () => {
          const next = [...content.whyChooseUs.valueCards, { title: 'New Value', description: '' }];
          updateSection('whyChooseUs', { valueCards: next });
          setIndices(p => ({ ...p, value: next.length - 1 }));
        },
        onDeleteValueCard: (idx: number) => {
          const next = content.whyChooseUs.valueCards.filter((_, i) => i !== idx);
          updateSection('whyChooseUs', { valueCards: next });
          setIndices(p => ({ ...p, value: Math.max(0, idx - 1) }));
        },
        onUpdateValueCard: (idx: number, patch: any) => {
          const next = [...content.whyChooseUs.valueCards];
          next[idx] = { ...next[idx], ...patch };
          updateSection('whyChooseUs', { valueCards: next });
        }
      }
    };

    const ActiveComponent = {
      ourStory: OurStorySection,
      servicesOverview: ServicesOverviewSection,
      loveConnection: LoveConnectionSection,
      blissCircle: BlissCircleSection,
      whyChooseUs: WhyChooseUsSection,
    }[activeTab];

    return ActiveComponent ? <ActiveComponent {...props[activeTab]} /> : null;
  };

  return (
    <AdminLayout
      title="Homepage Editor"
      description="Manage visual blocks and narrative sections."
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
      <div className="max-w-6xl mx-auto space-y-8 pb-20">
        
        {/* --- Header Dashboard Card --- */}
        <div className="bg-[#0F172A] rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-stone-200/50">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <LayoutPanelLeft size={120} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-burgundy-rose">
                <Sparkles size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Editing</span>
              </div>
              <h2 className="text-3xl font-black italic uppercase tracking-tight">Home content</h2>
              <p className="text-stone-400 text-[11px] font-medium uppercase tracking-widest">
                Update text and images on your homepage
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
               <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest italic">{message ?? 'Ready'}</span>
               <Button
                onClick={() => handleSave()}
                disabled={saving}
                className="bg-muted-burgundy-rose rounded-md hover:bg-white hover:text-deep-midnight-navy text-white px-5 py-4 font-black text-[8px] uppercase tracking-[0.2em] transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        {/* --- Main Workspace --- */}
            <div className="space-y-6">
          {/* Horizontal Navigation */}
          <div className="bg-white/80 backdrop-blur-sm rounded-md border border-stone-200 px-4 py-3 shadow-sm ring-1 ring-stone-100/50">
            <div className="flex flex-wrap items-center gap-2">
              {SECTION_TABS.map((tab) => {
                const isActive = tab.key === activeTab;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.key);
                      setQueryTab(tab.key);
                      router.replace(`/admin/home?tab=${tab.key}`);
                    }}
                    className={cn(
                      'group relative flex items-center gap-3 rounded-md px-4 py-2 transition-all duration-300 border',
                      isActive
                        ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-lg shadow-stone-200/50'
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
                      <tab.icon
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
          </div>

          {/* Active Configuration Panel */}
          <main className="bg-white rounded-md border border-stone-200 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
            <div className="bg-stone-50/50 border-b border-stone-100 px-8 py-5 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-black text-deep-midnight-navy uppercase tracking-widest">{activeMeta.label}</h3>
                    <p className="text-[10px] font-medium text-stone-400">Choose a section to edit</p>
            </div>
                <div className="px-3 py-1 bg-white border border-stone-200 rounded text-[9px] font-black text-stone-400 uppercase">
                    Ref: {activeTab}
          </div>
        </div>

            <div className="p-8 flex-1">
                {renderActiveSection()}
            </div>
          </main>
        </div>
      </div>
    </AdminLayout>
  );
}