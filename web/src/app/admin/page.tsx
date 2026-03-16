'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

type AdminMe = {
  email: string | null;
  role: string;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [me, setMe] = useState<AdminMe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem('blissmatch_admin_token');
    if (!token) {
      router.replace('/admin/login');
      return;
    }

    async function load() {
      try {
        const res = await fetch(`${API_URL}/admin/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          window.localStorage.removeItem('blissmatch_admin_token');
          router.replace('/admin/login');
          return;
        }

        const data = (await res.json()) as AdminMe;
        setMe(data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }

    void load();
  }, [router]);

  function handleSignOut() {
    window.localStorage.removeItem('blissmatch_admin_token');
    router.replace('/admin/login');
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sand-50">
        <p className="text-sm text-charcoal-700">Loading admin console…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <header className="border-b border-sand-100 bg-white/90 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-gold-500 uppercase">
              Bliss Match
            </p>
            <p className="text-sm text-charcoal-700">Admin console</p>
          </div>
          <button
            onClick={handleSignOut}
            className="rounded-full border border-sand-100 bg-sand-50 px-4 py-2 text-xs font-medium text-charcoal-950 hover:bg-white"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back, {me?.email ?? 'Admin'}.
        </h1>
        <p className="mt-2 max-w-xl text-sm text-charcoal-700">
          This is your private space to oversee enquiries and client journeys.
          We can expand this dashboard to show consultation requests, client
          profiles, and Bliss Circle invitations.
        </p>
      </main>
    </div>
  );
}

