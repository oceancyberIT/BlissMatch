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
// import ContactInfo from "../components/contact_components/ContactInfo";
// import SocialLink from "../components/contact_components/SocialLinks";

// const page = () => {
//   return (
//     <main className="relative min-h-screen bg-soft-ivory-white pt-12 pb-5 md:pb-0 overflow-hidden">
//       {/* Watermark - Reduced size and top offset */}
//       <div className="absolute top-24 -right-10 pointer-events-none select-none opacity-[0.02]">
//         <h2 className="text-[18vw] font-serif font-bold text-deep-midnight-navy leading-none">
//           Bliss
//         </h2>
//       </div>

//       <div className="max-w-6xl mx-auto px-6 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
//           {/* Left Column: Info - Tightened vertical rhythm */}
//           <div className="space-y-8">
//             <div>
//               <span className="text-muted-burgundy-rose text-[10px] font-black uppercase tracking-[0.4em] mb-3 block">
//                 Contact
//               </span>
//               <h1 className="text-4xl md:text-5xl font-serif text-deep-midnight-navy leading-tight mb-4 tracking-tighter">
//                 Begin Your <br />{" "}
//                 <span className="italic text-muted-burgundy-rose">Journey</span>
//               </h1>
//               <p className="text-stone-500 text-base md:text-lg font-medium leading-relaxed max-w-sm">
//                 Every great love story begins with a conversation.
//               </p>
//             </div>

//             <div className="space-y-4 max-w-sm">
//               <p className="text-stone-400 text-sm leading-relaxed italic border-l border-muted-burgundy-rose/20 pl-4">
//                 Schedule a confidential consultation in London or arrange a
//                 virtual session from anywhere in the world.
//               </p>

//               <div className="pt-4 flex flex-col gap-4">
//                 <ContactInfo
//                   icon={
//                     <MapPin size={16} className="text-muted-burgundy-rose" />
//                   }
//                   label="London, United Kingdom"
//                 />
//                 <ContactInfo
//                   icon={
//                     <Phone size={16} className="text-muted-burgundy-rose" />
//                   }
//                   label="+44 (0) 7000 000 000"
//                   href="tel:+447000000000"
//                 />
//                 <ContactInfo
//                   icon={<Mail size={16} className="text-muted-burgundy-rose" />}
//                   label="enquiries@blissmatch.com"
//                   href="mailto:enquiries@blissmatch.com"
//                 />
//               </div>
//             </div>

//             <div className="pt-4 flex items-center gap-6">
//               {[Instagram, Linkedin, Facebook].map((Icon, i) => (
//                 <SocialLink key={i} icon={<Icon size={18} />} href="#" />
//               ))}
//             </div>
//           </div>

//           {/* Right Column: Form - Reduced padding and internal gaps */}
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
//                 Confidential Inquiry
//               </h3>

//               <form className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="relative border-b border-stone-100 focus-within:border-muted-burgundy-rose transition-all pb-1 group">
//                     <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
//                       Your Name
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full bg-transparent outline-none text-deep-midnight-navy pt-1 text-sm font-medium"
//                       placeholder="Full name"
//                     />
//                   </div>
//                   <div className="relative border-b border-stone-100 focus-within:border-muted-burgundy-rose transition-all pb-1 group">
//                     <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       className="w-full bg-transparent outline-none text-deep-midnight-navy pt-1 text-sm font-medium"
//                       placeholder="email@address.com"
//                     />
//                   </div>
//                 </div>

//                 <div className="relative border-b border-stone-100 focus-within:border-muted-burgundy-rose transition-all pb-1 group">
//                   <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
//                     Subject
//                   </label>
//                   <select className="w-full bg-transparent outline-none text-deep-midnight-navy pt-1 text-sm font-medium appearance-none cursor-pointer">
//                     <option>Private Matchmaking</option>
//                     <option>Relationship Coaching</option>
//                     <option>Other</option>
//                   </select>
//                 </div>

//                 <div className="relative border-b border-stone-100 focus-within:border-muted-burgundy-rose transition-all pb-1 group">
//                   <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
//                     Message
//                   </label>
//                   <textarea
//                     rows={2}
//                     className="w-full bg-transparent outline-none text-deep-midnight-navy pt-1 text-sm font-medium resize-none"
//                     placeholder="Briefly describe your needs..."
//                   />
//                 </div>

//                 <button className="w-full flex items-center justify-between px-6 py-4 bg-deep-midnight-navy text-white text-[9px] font-black uppercase tracking-[0.3em] hover:bg-muted-burgundy-rose transition-all duration-500 shadow-xl group/btn">
//                   Send Transmission
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
import ContactInfo from "../components/contact_components/ContactInfo";
import SocialLink from "../components/contact_components/SocialLinks";

const page = () => {
  return (
    /* Increased top padding (pt-32 / md:pt-48) to clear the fixed header */
    <main className="relative min-h-screen bg-soft-ivory-white pt-38 md:pt-48 pb-10 lg:pb-0 overflow-hidden">
      {/* Watermark - Positioned relative to the new padding */}
      <div className="absolute top-32 md:top-40 -right-10 pointer-events-none select-none opacity-[0.02]">
        <h2 className="text-[18vw] font-serif font-bold text-deep-midnight-navy leading-none">
          Bliss
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Column: Info */}
          <div className="space-y-8">
            <div>
              <span className="text-muted-burgundy-rose text-[10px] font-black uppercase tracking-[0.4em] mb-3 block">
                Contact
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-deep-midnight-navy leading-tight mb-4 tracking-tighter">
                Begin Your <br />{" "}
                <span className="italic text-muted-burgundy-rose">Journey</span>
              </h1>
              <p className="text-stone-500 text-base md:text-lg font-medium leading-relaxed max-w-sm">
                Every great love story begins with a conversation.
              </p>
            </div>

            <div className="space-y-4 max-w-sm">
              <p className="text-stone-400 text-sm leading-relaxed italic border-l border-muted-burgundy-rose/20 pl-4">
                Schedule a confidential consultation in London or arrange a
                virtual session from anywhere in the world.
              </p>

              <div className="pt-4 flex flex-col gap-4">
                <ContactInfo
                  icon={
                    <MapPin size={16} className="text-muted-burgundy-rose" />
                  }
                  label="London, United Kingdom"
                />
                <ContactInfo
                  icon={
                    <Phone size={16} className="text-muted-burgundy-rose" />
                  }
                  label="+44 (0) 7000 000 000"
                  href="tel:+447000000000"
                />
                <ContactInfo
                  icon={<Mail size={16} className="text-muted-burgundy-rose" />}
                  label="enquiries@blissmatch.com"
                  href="mailto:enquiries@blissmatch.com"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center gap-6">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <SocialLink key={i} icon={<Icon size={18} />} href="#" />
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
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
                Confidential Inquiry
              </h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative border-b border-stone-100 focus-within:border-muted-burgundy-rose transition-all pb-1 group">
                    <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent outline-none text-deep-midnight-navy pt-1 text-sm font-medium"
                      placeholder="Full name"
                    />
                  </div>
                  <div className="relative border-b border-stone-100 focus-within:border-muted-burgundy-rose transition-all pb-1 group">
                    <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-transparent outline-none text-deep-midnight-navy pt-1 text-sm font-medium"
                      placeholder="email@address.com"
                    />
                  </div>
                </div>

                <div className="relative border-b border-stone-100 focus-within:border-muted-burgundy-rose transition-all pb-1 group">
                  <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
                    Subject
                  </label>
                  <select className="w-full bg-transparent outline-none text-deep-midnight-navy pt-1 text-sm font-medium appearance-none cursor-pointer">
                    <option>Private Matchmaking</option>
                    <option>Relationship Coaching</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="relative border-b border-stone-100 focus-within:border-muted-burgundy-rose transition-all pb-1 group">
                  <label className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
                    Message
                  </label>
                  <textarea
                    rows={2}
                    className="w-full bg-transparent outline-none text-deep-midnight-navy pt-1 text-sm font-medium resize-none"
                    placeholder="Briefly describe your needs..."
                  />
                </div>

                <button className="w-full flex items-center justify-between px-6 py-4 bg-deep-midnight-navy text-white text-[9px] font-black uppercase tracking-[0.3em] hover:bg-muted-burgundy-rose transition-all duration-500 shadow-xl group/btn">
                  Send Transmission
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
