'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.message ?? 'Unable to sign in as admin.');
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data?.accessToken) {
        localStorage.setItem('blissmatch_admin_token', data.accessToken);
        router.push('/admin');
      } else {
        setError('Unexpected response from server.');
        setLoading(false);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand-50 px-4">
      <div className="w-full max-w-md rounded-3xl border border-sand-100 bg-white/90 p-8 shadow-sm">
        <p className="text-xs font-semibold tracking-[0.3em] text-gold-500 uppercase">
          Bliss Match
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Admin sign in
        </h1>
        <p className="mt-1 text-sm text-charcoal-700">
          Private console for the Bliss Match team.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="admin-email"
              className="text-xs font-medium uppercase tracking-[0.16em] text-charcoal-700"
            >
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              className="w-full rounded-full border border-sand-100 bg-sand-50 px-4 py-2.5 text-sm outline-none ring-0 placeholder:text-charcoal-700/50"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="admin-password"
              className="text-xs font-medium uppercase tracking-[0.16em] text-charcoal-700"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-full border border-sand-100 bg-sand-50 px-4 py-2.5 text-sm outline-none ring-0 placeholder:text-charcoal-700/50"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-full bg-charcoal-950 px-6 py-3 text-sm font-medium text-sand-50 shadow-sm transition hover:bg-charcoal-700 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}

