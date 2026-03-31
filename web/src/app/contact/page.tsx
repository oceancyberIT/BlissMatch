// "use client";
// import {
//   Mail,
//   Phone,
//   Instagram,
//   Linkedin,
//   Facebook,
//   MapPin,
//   ArrowRight,
// } from "lucide-react";
// import ContactInfo from "../../components/ContactInfo";
// import SocialLink from "../../components/SocialLinks";
// import { useEffect, useMemo, useState } from "react";
// import { mergeContact } from "@/lib/site-settings-merge";
// import { INITIAL_CONTACT } from "@/lib/site-settings-defaults";
// import type { ContactPageContent } from "@/lib/site-settings-types";

// const platformIcon = {
//   instagram: Instagram,
//   linkedin: Linkedin,
//   facebook: Facebook,
// } as const;

// const page = () => {
//   const [c, setC] = useState<ContactPageContent>(INITIAL_CONTACT);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [subject, setSubject] = useState(
//     INITIAL_CONTACT.subjectOptions[0] ?? "",
//   );
//   const [message, setMessage] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [feedback, setFeedback] = useState<string | null>(null);

//   useEffect(() => {
//     let cancelled = false;
//     (async () => {
//       try {
//         const res = await fetch("/api/site-settings/contact", {
//           cache: "no-store",
//         });
//         const data = await res.json().catch(() => null);
//         if (!cancelled) {
//           const merged = mergeContact(data);
//           setC(merged);
//           setSubject((prev) => {
//             if (merged.subjectOptions.includes(prev)) return prev;
//             return merged.subjectOptions[0] ?? "";
//           });
//         }
//       } catch {
//         if (!cancelled) setC(INITIAL_CONTACT);
//       }
//     })();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const socialList = useMemo(() => {
//     return c.socialLinks.map((s) => {
//       const Icon = platformIcon[s.platform] ?? Instagram;
//       return { Icon, href: s.href, key: s.platform };
//     });
//   }, [c.socialLinks]);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setFeedback(null);
//     setSubmitting(true);
//     try {
//       const res = await fetch("/api/enquiries", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fullName: name,
//           email,
//           location: null,
//           message,
//           source: "CONTACT",
//           subject: subject || null,
//           inquiryType: null,
//         }),
//       });
//       const data = await res.json().catch(() => null);
//       if (!res.ok) {
//         setFeedback(
//           typeof data?.message === "string"
//             ? data.message
//             : "Could not send your message.",
//         );
//         return;
//       }
//       setFeedback("Thank you — we’ll be in touch shortly.");
//       setName("");
//       setEmail("");
//       setMessage("");
//       setSubject(c.subjectOptions[0] ?? "");
//     } catch {
//       setFeedback("Something went wrong. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <main className="relative min-h-screen bg-soft-ivory-white pt-38 md:pt-48 pb-10 lg:pb-0 overflow-hidden">
//       <div className="absolute top-32 md:top-40 -right-10 pointer-events-none select-none opacity-[0.02]">
//         <h2 className="text-[18vw] font-serif font-bold text-deep-midnight-navy leading-none">
//           Bliss
//         </h2>
//       </div>

//       <div className="max-w-6xl mx-auto px-6 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
//           <div className="space-y-8">
//             <div>
//               <span className="text-muted-burgundy-rose text-[10px] font-black uppercase tracking-[0.4em] mb-3 block">
//                 {c.eyebrow}
//               </span>
//               <h1 className="text-4xl md:text-5xl font-serif text-deep-midnight-navy leading-tight mb-4 tracking-tighter">
//                 {c.titleLine1} <br />{" "}
//                 <span className="italic text-muted-burgundy-rose">
//                   {c.titleItalic}
//                 </span>
//               </h1>
//               <p className="text-stone-500 text-base md:text-lg font-medium leading-relaxed max-w-sm">
//                 {c.lead}
//               </p>
//             </div>

//             <div className="space-y-4 max-w-sm">
//               <p className="text-stone-400 text-sm leading-relaxed italic border-l border-muted-burgundy-rose/20 pl-4">
//                 {c.quote}
//               </p>

//               <div className="pt-4 flex flex-col gap-4">
//                 <ContactInfo
//                   icon={
//                     <MapPin size={16} className="text-muted-burgundy-rose" />
//                   }
//                   label={c.address}
//                 />
//                 <ContactInfo
//                   icon={
//                     <Phone size={16} className="text-muted-burgundy-rose" />
//                   }
//                   label={c.phone}
//                   href={c.phoneHref}
//                 />
//                 <ContactInfo
//                   icon={<Mail size={16} className="text-muted-burgundy-rose" />}
//                   label={c.email}
//                   href={c.emailHref}
//                 />
//               </div>
//             </div>

//             <div className="pt-4 flex items-center gap-6">
//               {socialList.map(({ Icon, href, key }) => (
//                 <SocialLink key={key} icon={<Icon size={18} />} href={href} />
//               ))}
//             </div>
//           </div>

//           <div className="relative group">
//             <div className="absolute -inset-2 pointer-events-none opacity-10">
//               <svg className="w-full h-full">
//                 <rect
//                   width="100%"
//                   height="100%"
//                   fill="none"
//                   stroke="#1a2e4c"
//                   strokeWidth="1"
//                   strokeDasharray="40 200"
//                   className="animate-border-trace"
//                 />
//               </svg>
//             </div>

//             <div className="bg-white p-8 md:p-12 shadow-2xl rounded-none border border-stone-100">
//               <h3 className="text-lg font-serif text-deep-midnight-navy mb-6 italic tracking-tight">
//                 {c.formTitle}
//               </h3>

//               {feedback && (
//                 <p
//                   className={`mb-4 text-sm font-medium ${
//                     feedback.startsWith("Thank")
//                       ? "text-green-700"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {feedback}
//                 </p>
//               )}

//               <form className="space-y-6" onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="relative border-b border-stone-100 focus-within:border-muted-burgundy-rose transition-all pb-1 group">
//                     <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
//                       {c.fieldNameLabel}
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full bg-transparent outline-none text-deep-midnight-navy pt-1 text-sm font-medium"
//                       placeholder="Full name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="relative border-b border-stone-100 focus-within:border-muted-burgundy-rose transition-all pb-1 group">
//                     <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
//                       {c.fieldEmailLabel}
//                     </label>
//                     <input
//                       type="email"
//                       className="w-full bg-transparent outline-none text-deep-midnight-navy pt-1 text-sm font-medium"
//                       placeholder="email@address.com"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="relative border-b border-stone-100 focus-within:border-muted-burgundy-rose transition-all pb-1 group">
//                   <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
//                     {c.fieldSubjectLabel}
//                   </label>
//                   <select
//                     className="w-full bg-transparent outline-none text-deep-midnight-navy pt-1 text-sm font-medium appearance-none cursor-pointer"
//                     value={subject}
//                     onChange={(e) => setSubject(e.target.value)}
//                     required
//                   >
//                     {c.subjectOptions.map((opt) => (
//                       <option key={opt} value={opt}>
//                         {opt}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="relative border-b border-stone-100 focus-within:border-muted-burgundy-rose transition-all pb-1 group">
//                   <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
//                     {c.fieldMessageLabel}
//                   </label>
//                   <textarea
//                     rows={2}
//                     className="w-full bg-transparent outline-none text-deep-midnight-navy pt-1 text-sm font-medium resize-none"
//                     placeholder="Briefly describe your needs..."
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="w-full flex items-center justify-between px-6 py-4 bg-deep-midnight-navy text-white text-[9px] font-black uppercase tracking-[0.3em] hover:bg-muted-burgundy-rose transition-all duration-500 shadow-xl group/btn disabled:opacity-60"
//                 >
//                   {submitting ? "Sending…" : c.submitLabel}
//                   <ArrowRight
//                     size={14}
//                     className="group-hover/btn:translate-x-1 transition-transform"
//                   />
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes border-trace {
//           from {
//             stroke-dashoffset: 1000;
//           }
//           to {
//             stroke-dashoffset: 0;
//           }
//         }
//         .animate-border-trace {
//           animation: border-trace 12s linear infinite;
//         }
//       `}</style>
//     </main>
//   );
// };

// export default page;

"use client";
import {
  Mail,
  Phone,
  Instagram,
  Linkedin,
  Facebook,
  MapPin,
  ArrowRight,
} from "lucide-react";
import ContactInfo from "../../components/ContactInfo";
import SocialLink from "../../components/SocialLinks";
import { useEffect, useMemo, useState } from "react";
import { mergeContact } from "@/lib/site-settings-merge";
import { INITIAL_CONTACT } from "@/lib/site-settings-defaults";
import type { ContactPageContent } from "@/lib/site-settings-types";
import Image from "next/image"; // Added for images

const platformIcon = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
} as const;

const page = () => {
  const [c, setC] = useState<ContactPageContent>(INITIAL_CONTACT);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(INITIAL_CONTACT.subjectOptions[0] ?? "");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/site-settings/contact", {
          cache: "no-store",
        });
        const data = await res.json().catch(() => null);
        if (!cancelled) {
          const merged = mergeContact(data);
          setC(merged);
          setSubject((prev) => {
            if (merged.subjectOptions.includes(prev)) return prev;
            return merged.subjectOptions[0] ?? "";
          });
        }
      } catch {
        if (!cancelled) setC(INITIAL_CONTACT);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const socialList = useMemo(() => {
    return c.socialLinks.map((s) => {
      const Icon = platformIcon[s.platform] ?? Instagram;
      return { Icon, href: s.href, key: s.platform };
    });
  }, [c.socialLinks]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          email,
          location: null,
          message,
          source: "CONTACT",
          subject: subject || null,
          inquiryType: null,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setFeedback(
          typeof data?.message === "string"
            ? data.message
            : "Could not send your message.",
        );
        return;
      }
      setFeedback("Thank you — we’ll be in touch shortly.");
      setName("");
      setEmail("");
      setMessage("");
      setSubject(c.subjectOptions[0] ?? "");
    } catch {
      setFeedback("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-soft-ivory-white pt-38 md:pt-48 pb-10 lg:pb-20 overflow-hidden">
      
      {/* Side corner images around the contact section */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        <div className="absolute left-2 top-36 h-24 w-16 overflow-hidden border-4 border-white/70 shadow-xl lg:left-4 lg:h-28 lg:w-20">
          <Image src="/image copy 2.png" alt="Top left detail" fill className="object-cover" />
        </div>
        <div className="absolute right-2 top-32 h-24 w-16 overflow-hidden border-4 border-white/70 shadow-xl lg:right-4 lg:h-28 lg:w-20">
          <Image src="/image copy 3.png" alt="Top right detail" fill className="object-cover" />
        </div>
        <div className="absolute bottom-24 left-2 h-24 w-16 overflow-hidden border-4 border-white/70 shadow-xl lg:bottom-20 lg:left-4 lg:h-28 lg:w-20">
          <Image src="/image copy 6.png" alt="Bottom left detail" fill className="object-cover" />
        </div>
        <div className="absolute bottom-20 right-2 h-24 w-16 overflow-hidden border-4 border-white/70 shadow-xl lg:bottom-16 lg:right-4 lg:h-28 lg:w-20">
          <Image src="/image copy 7.png" alt="Bottom right detail" fill className="object-cover" />
        </div>
      </div>
      {/* --------------------------- */}

      <div className="absolute top-64 md:top-40 -left-10 pointer-events-none select-none opacity-[0.02]">
        <h2 className="text-[18vw] font-serif font-bold text-deep-midnight-navy leading-none">
          Bliss
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-muted-burgundy-rose text-[10px] font-black uppercase tracking-[0.4em] mb-3 block">
                {c.eyebrow}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-deep-midnight-navy leading-tight mb-4 tracking-tighter">
                {c.titleLine1} <br />{" "}
                <span className="italic text-muted-burgundy-rose">
                  {c.titleItalic}
                </span>
              </h1>
              <p className="text-stone-500 text-base md:text-lg font-medium leading-relaxed max-w-sm">
                {c.lead}
              </p>
            </div>

            <div className="space-y-4 max-w-sm">
              <p className="text-stone-400 text-sm leading-relaxed italic border-l border-muted-burgundy-rose/20 pl-4">
                {c.quote}
              </p>

              <div className="pt-4 flex flex-col gap-4">
                <ContactInfo
                  icon={<MapPin size={16} className="text-muted-burgundy-rose" />}
                  label={c.address}
                />
                <ContactInfo
                  icon={<Phone size={16} className="text-muted-burgundy-rose" />}
                  label={c.phone}
                  href={c.phoneHref}
                />
                <ContactInfo
                  icon={<Mail size={16} className="text-muted-burgundy-rose" />}
                  label={c.email}
                  href={c.emailHref}
                />
              </div>
            </div>

            <div className="pt-4 flex items-center gap-6">
              {socialList.map(({ Icon, href, key }) => (
                <SocialLink key={key} icon={<Icon size={18} />} href={href} />
              ))}
            </div>
          </div>

          <div className="relative group">
            {/* Animated Border SVG */}
            <div className="absolute -inset-2 pointer-events-none opacity-10">
              <svg className="w-full h-full">
                <rect
                  width="100%"
                  height="100%"
                  fill="none"
                  stroke="#1a2e4c"
                  strokeWidth="1"
                  strokeDasharray="40 200"
                  className="animate-border-trace"
                />
              </svg>
            </div>

            <div className="bg-white p-8 md:p-12 shadow-2xl rounded-none border border-stone-100">
              <h3 className="text-lg font-serif text-deep-midnight-navy mb-6 italic tracking-tight">
                {c.formTitle}
              </h3>

              {feedback && (
                <p className={`mb-4 text-sm font-medium ${feedback.startsWith("Thank") ? "text-green-700" : "text-red-600"}`}>
                  {feedback}
                </p>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative border-b border-stone-100 focus-within:border-muted-burgundy-rose transition-all pb-1 group">
                    <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
                      {c.fieldNameLabel}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent outline-none text-deep-midnight-navy pt-1 text-sm font-medium"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative border-b border-stone-100 focus-within:border-muted-burgundy-rose transition-all pb-1 group">
                    <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
                      {c.fieldEmailLabel}
                    </label>
                    <input
                      type="email"
                      className="w-full bg-transparent outline-none text-deep-midnight-navy pt-1 text-sm font-medium"
                      placeholder="email@address.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="relative border-b border-stone-100 focus-within:border-muted-burgundy-rose transition-all pb-1 group">
                  <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
                    {c.fieldSubjectLabel}
                  </label>
                  <select
                    className="w-full bg-transparent outline-none text-deep-midnight-navy pt-1 text-sm font-medium appearance-none cursor-pointer"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  >
                    {c.subjectOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative border-b border-stone-100 focus-within:border-muted-burgundy-rose transition-all pb-1 group">
                  <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
                    {c.fieldMessageLabel}
                  </label>
                  <textarea
                    rows={2}
                    className="w-full bg-transparent outline-none text-deep-midnight-navy pt-1 text-sm font-medium resize-none"
                    placeholder="Briefly describe your needs..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-between px-6 py-4 bg-deep-midnight-navy text-white text-[9px] font-black uppercase tracking-[0.3em] hover:bg-muted-burgundy-rose transition-all duration-500 shadow-xl group/btn disabled:opacity-60"
                >
                  {submitting ? "Sending…" : c.submitLabel}
                  <ArrowRight
                    size={14}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes border-trace {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-border-trace {
          animation: border-trace 12s linear infinite;
        }
      `}</style>
    </main>
  );
};

export default page;