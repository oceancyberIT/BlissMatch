'use client';

import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Save, Blocks, Heart, Shield } from 'lucide-react';
import { ServicesContent } from '@/components/admin/services-editor/types';
import { INITIAL_SERVICES_CONTENT } from '@/components/admin/services-editor/constants';
import {
  ServicesGridForm,
  ServicesSocialForm,
  ServicesConfidentialityForm,
} from '@/components/admin/services-admin-forms';

type ServicesTab = 'grid' | 'socialImpact' | 'confidentiality';

const SERVICES_TABS: Array<{ key: ServicesTab; label: string; icon: typeof Blocks }> = [
  { key: 'grid', label: 'Service grid', icon: Blocks },
  { key: 'socialImpact', label: 'Social impact', icon: Heart },
  { key: 'confidentiality', label: 'Confidentiality', icon: Shield },
];

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

export default function AdminServicesPage() {
  const [activeTab, setActiveTab] = useState<ServicesTab>('grid');
  const [content, setContent] = useState<ServicesContent>(INITIAL_SERVICES_CONTENT);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch('/api/admin/services');
        const data = await res.json().catch(() => null);
        if (!active) return;
        if (res.ok && data) setContent(mergeLoaded(data));
      } catch {
        // fallback
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
      const res = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setMessage(data?.message ?? 'Could not save services content.');
        setTimeout(() => setMessage(null), 3000);
        return;
      }
      setMessage('Services page saved.');
      setTimeout(() => setMessage(null), 2500);
    } finally {
      setSaving(false);
    }
  };

  const tabLabel = useMemo(
    () => SERVICES_TABS.find((t) => t.key === activeTab)?.label ?? 'Service grid',
    [activeTab],
  );

  const renderEditor = () => {
    if (activeTab === 'grid') {
      return (
        <ServicesGridForm
          value={content.grid}
          onChange={(grid) => setContent((p) => ({ ...p, grid }))}
        />
      );
    }
    if (activeTab === 'socialImpact') {
      return (
        <ServicesSocialForm
          value={content.socialImpact}
          onChange={(socialImpact) => setContent((p) => ({ ...p, socialImpact }))}
        />
      );
    }
    return (
      <ServicesConfidentialityForm
        value={content.confidentiality}
        onChange={(confidentiality) => setContent((p) => ({ ...p, confidentiality }))}
      />
    );
  };

  return (
    <AdminLayout
      title="Services Page"
      description="Edit service grid, social impact, and confidentiality (no hero — use Hero Registry)."
    >
      <div className="space-y-6">
        <div className="rounded-2xl bg-[#0F172A] p-8 text-white shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-burgundy-rose">
            Services editor
          </p>
          <h2 className="mt-2 text-3xl font-black italic uppercase tracking-tight">Services content</h2>
          <p className="mt-2 text-[11px] uppercase tracking-widest text-stone-400">
            Hero and success stories are managed elsewhere. Use section cards in the sidebar for quick edits.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
            {SERVICES_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.key === activeTab;
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
              {tabLabel}
            </h3>
            <Button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-md bg-deep-midnight-navy px-5 py-2 text-xs font-black uppercase tracking-widest text-white hover:bg-muted-burgundy-rose"
            >
              <Save size={14} className="mr-2" />
              {saving ? 'Saving...' : 'Save services page'}
            </Button>
          </div>

          {message && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-burgundy-rose">
              {message}
            </p>
          )}

          {renderEditor()}
        </div>
      </div>
    </AdminLayout>
  );
}
