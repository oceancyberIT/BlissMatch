'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.message ?? "Unauthorized access.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data?.accessToken) {
        localStorage.setItem("blissmatch_admin_token", data.accessToken);
        router.push("/admin");
      } else {
        setError("Server authentication failed.");
        setLoading(false);
      }
    } catch (err) {
      setError("Connection failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-soft-ivory-white px-6 font-sans">
      {/* Subtle watermark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02] select-none">
        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif font-bold text-deep-midnight-navy">
          Bliss
        </h2>
      </div>

      <div className="relative w-full max-w-sm">
        {/* Top Branding Header */}
        <div className="mb-10 space-y-4 text-center">
          <div className="flex justify-center">
            <Image
              src="/logo1.png"
              alt="Bliss Match"
              width={160}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-serif tracking-tight text-deep-midnight-navy">Admin Login</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
              Enter your email and password.
            </p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email Field */}
            <div className="space-y-1 group">
              <label className="text-[9px] font-black uppercase tracking-widest text-stone-600 transition-colors group-focus-within:text-muted-burgundy-rose" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="w-full bg-transparent border-b border-stone-100 py-2 text-sm text-deep-midnight-navy outline-none transition-all focus:border-muted-burgundy-rose placeholder:text-stone-400"
                placeholder="admin@blissmatch.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1 group">
              <label className="text-[9px] font-black uppercase tracking-widest text-stone-600 transition-colors group-focus-within:text-muted-burgundy-rose" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="w-full bg-transparent border-b border-stone-100 py-2 pr-10 text-sm text-deep-midnight-navy outline-none transition-all focus:border-muted-burgundy-rose placeholder:text-stone-400"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-500 hover:text-muted-burgundy-rose transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-[10px] font-bold text-red-500 uppercase tracking-widest animate-in fade-in slide-in-from-top-1">
                <span className="h-1 w-1 rounded-full bg-red-500" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-full bg-deep-midnight-navy py-4 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-muted-burgundy-rose disabled:opacity-60"
            >
              <span className="relative z-10">
                {loading ? "Logging in..." : "Login"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}