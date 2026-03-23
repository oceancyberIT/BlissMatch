'use client';

import { useEffect, useState } from 'react';

type HeroConfig = {
  title?: string;
  subtitle?: string;
  body?: string;
  imageUrl?: string;
};

export function useHeroConfig(route: string) {
  const [config, setConfig] = useState<HeroConfig | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch(`/api/admin/hero?route=${encodeURIComponent(route)}`);
        const data = await res.json().catch(() => null);
        if (!active) return;
        if (res.ok && data) {
          setConfig({
            title: data.title ?? undefined,
            subtitle: data.subtitle ?? undefined,
            body: data.body ?? undefined,
            imageUrl: data.imageUrl ?? undefined,
          });
        } else {
          setConfig(null);
        }
      } catch {
        if (active) {
          setConfig(null);
        }
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [route]);

  return config;
}

