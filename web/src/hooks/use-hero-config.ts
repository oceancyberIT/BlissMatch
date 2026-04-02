'use client';

import { useEffect, useState } from 'react';
import { type HeroConfig, parseHeroSectionResponse } from '@/lib/hero-config';

export type { HeroConfig };

/**
 * @param initialFromServer — When set from a Server Component fetch, first paint matches CMS (no flash of bundled defaults).
 * Pass `undefined` to let the client fetch only (legacy behavior).
 */
export function useHeroConfig(route: string, initialFromServer?: HeroConfig | null) {
  const [config, setConfig] = useState<HeroConfig | null | undefined>(() =>
    initialFromServer !== undefined ? initialFromServer : undefined,
  );

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch(`/api/admin/hero?route=${encodeURIComponent(route)}`, {
          cache: 'no-store',
        });
        const data = await res.json().catch(() => null);
        if (!active) return;
        if (res.ok && data) {
          setConfig(parseHeroSectionResponse(data));
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

  return { config, loading: config === undefined };
}

