"use client";
import Image from "next/image";
import {
  Mail,
  Phone,
  MessageSquare,
  Shield,
  Clock,
} from "lucide-react";
import ContactLink from "@/components/ContactLinks";
import InputGroup from "@/components/InputGroup";
import { useEffect, useMemo, useState } from "react";
import { mergeAppointment } from "@/lib/site-settings-merge";
import { INITIAL_APPOINTMENT } from "@/lib/site-settings-defaults";
import type { AppointmentPageContent } from "@/lib/site-settings-types";

const AppointmentPage = () => {
  const [page, setPage] = useState<AppointmentPageContent>(INITIAL_APPOINTMENT);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [inquiryType, setInquiryType] = useState(
    INITIAL_APPOINTMENT.inquiryTypeOptions[0] ?? "",
  );
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/site-settings/appointment", {
          cache: "no-store",
        });
        const data = await res.json().catch(() => null);
        if (!cancelled) {
          const merged = mergeAppointment(data);
          setPage(merged);
          setInquiryType((prev) => {
            if (merged.inquiryTypeOptions.includes(prev)) return prev;
            return merged.inquiryTypeOptions[0] ?? "";
          });
        }
      } catch {
        if (!cancelled) setPage(INITIAL_APPOINTMENT);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const contactIcons = useMemo(
    () => ({
      whatsapp: <MessageSquare size={16} />,
      phone: <Phone size={16} />,
      email: <Mail size={16} />,
    }),
    [],
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          location: location || null,
          message,
          source: "APPOINTMENT",
          subject: null,
          inquiryType: inquiryType || null,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setFeedback(
          typeof data?.message === "string"
            ? data.message
            : "Could not send your request. Please try again.",
        );
        return;
      }
      setFeedback("Thank you — your private request was received.");
      setFullName("");
      setEmail("");
      setLocation("");
      setMessage("");
      setInquiryType(page.inquiryTypeOptions[0] ?? "");
    } catch {
      setFeedback("Something went wrong. Please try again shortly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-soft-ivory-white pt-38 md:pt-48 pb-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-10 lg:w-2/3">
          <span className="text-muted-burgundy-rose text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
            {page.eyebrow}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-deep-midnight-navy leading-tight tracking-tighter">
            {page.titleLine1}{" "}
            <span className="italic">{page.titleItalic}</span>
          </h1>
          <p className="mt-3 text-stone-500 text-sm md:text-base font-light leading-relaxed max-w-lg">
            {page.lead}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div className="relative aspect-[4/5] md:aspect-[4.5/5] rounded-t-full overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src={page.imageUrl || "/image.png"}
                alt={page.imageAlt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-midnight-navy/20 to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col">
            <div className="bg-white p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 relative lg:-mt-40 z-20">
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <svg className="w-full h-full">
                  <rect
                    width="100%"
                    height="100%"
                    fill="none"
                    stroke="#1a2e4c"
                    strokeWidth="1"
                    strokeDasharray="50 300"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-serif text-deep-midnight-navy mb-7 italic tracking-tight">
                {page.formTitle}
              </h3>

              {feedback && (
                <p
                  className={`mb-4 text-sm font-medium ${
                    feedback.startsWith("Thank")
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  {feedback}
                </p>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                  <InputGroup
                    label={page.fieldNameLabel}
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <InputGroup
                    label={page.fieldEmailLabel}
                    placeholder="you@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <InputGroup
                    label={page.fieldLocationLabel}
                    placeholder="City, country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />

                  <div className="flex flex-col space-y-1 border-b border-stone-200 pb-1.5">
                    <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">
                      {page.fieldInquiryTypeLabel}
                    </label>
                    <select
                      className="bg-transparent outline-none text-deep-midnight-navy text-sm font-medium cursor-pointer"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      required
                    >
                      {page.inquiryTypeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col space-y-1 border-b border-stone-200 pb-1.5 pt-2">
                  <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">
                    {page.fieldMessageLabel}
                  </label>
                  <textarea
                    rows={2}
                    className="bg-transparent outline-none text-deep-midnight-navy text-sm font-medium resize-none"
                    placeholder="Briefly share your story..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6 opacity-30">
                    <div className="flex flex-col items-center">
                      <Shield size={14} />
                      <span className="text-[6px] uppercase tracking-widest mt-1">
                        Encrypted
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Clock size={14} />
                      <span className="text-[6px] uppercase tracking-widest mt-1">
                        24h Lead
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full md:w-auto px-8 py-4 bg-deep-midnight-navy text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-muted-burgundy-rose transition-all shadow-lg disabled:opacity-60"
                  >
                    {submitting ? "Sending…" : page.submitLabel}
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
              {page.contactLinks.map((link) => (
                <ContactLink
                  key={link.title + link.variant}
                  icon={contactIcons[link.variant]}
                  title={link.title}
                  subtitle={link.subtitle}
                  href={link.href}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AppointmentPage;
