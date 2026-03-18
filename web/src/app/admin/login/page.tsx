'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, ArrowRight } from "lucide-react";

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
    <div className="flex min-h-screen items-center justify-center bg-soft-ivory-white px-6">
      {/* Subtle Background Watermark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03] select-none">
        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-serif font-bold text-deep-midnight-navy">
          Bliss
        </h2>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Animated Border SVG */}
        <div className="absolute -inset-4 pointer-events-none opacity-10">
          <svg className="w-full h-full">
            <rect
              width="100%"
              height="100%"
              fill="none"
              stroke="#1a2e4c"
              strokeWidth="1"
              strokeDasharray="60 200"
              className="animate-border-trace"
            />
          </svg>
        </div>

        <div className="bg-white p-10 md:p-16 shadow-2xl border border-stone-100">
          <header className="text-center mb-10">
            <span className="text-muted-burgundy-rose text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">
              Admin Gateway
            </span>
            <h1 className="text-3xl md:text-4xl font-serif text-deep-midnight-navy leading-tight">
              The <span className="italic">Sanctuary</span> Console
            </h1>
            <div className="mt-4 flex justify-center items-center gap-2 text-stone-400">
              <ShieldCheck size={14} className="text-muted-burgundy-rose" />
              <p className="text-[11px] font-medium uppercase tracking-widest">
                Secure Biometric Encryption Active
              </p>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email Field */}
            <div className="relative border-b border-stone-200 focus-within:border-muted-burgundy-rose transition-all pb-2 group">
              <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black block mb-1">
                Security Identifier
              </label>
              <input
                type="email"
                className="w-full bg-transparent outline-none text-deep-midnight-navy py-1 text-sm font-medium placeholder:text-stone-300"
                placeholder="admin@blissmatch.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative border-b border-stone-200 focus-within:border-muted-burgundy-rose transition-all pb-2 group">
              <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black block mb-1">
                Access Passphrase
              </label>
              <input
                type="password"
                className="w-full bg-transparent outline-none text-deep-midnight-navy py-1 text-sm font-medium placeholder:text-stone-300"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600">
                <div className="h-1 w-1 bg-red-600 rounded-full animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-between px-8 py-5 bg-deep-midnight-navy text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-muted-burgundy-rose transition-all duration-500 shadow-xl group disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Initiate Secure Session'}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          <footer className="mt-12 text-center">
            <p className="text-[9px] text-stone-400 uppercase tracking-[0.2em]">
              Bliss Match Proprietary System &copy; 2026
            </p>
          </footer>
        </div>
      </div>

      <style jsx>{`
        @keyframes border-trace {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        .animate-border-trace {
          animation: border-trace 15s linear infinite;
        }
      `}</style>
    </div>
  );
}