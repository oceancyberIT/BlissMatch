// "use client";
// import React from "react";
// import Image from "next/image";
// import { Heart } from "lucide-react";
// import { ServicesContent } from "@/components/admin/services-editor/types";
// import { INITIAL_SERVICES_CONTENT } from "@/components/admin/services-editor/constants";

// type SocialImpactProps = {
//   data?: ServicesContent["socialImpact"];
// };

// const SocialImpact = ({ data }: SocialImpactProps) => {
//   const s = data ?? INITIAL_SERVICES_CONTENT.socialImpact;
//   const src = s.imageUrl || "/image.png";
//   const unoptimized = src.startsWith("data:");

//   const quoteLines = s.overlayQuote.split("\n").filter(Boolean);

//   return (
//     <section className="relative py-10 lg:py-12 bg-warm-linen overflow-hidden">
//       <div className="absolute top-1/2 left-[-2%] -translate-y-1/2 select-none pointer-events-none opacity-[0.03]">
//         <h2 className="text-[12vw] font-serif font-bold text-deep-midnight-navy leading-none">
//           Purpose
//         </h2>
//       </div>

//       <div className="max-w-6xl mx-auto px-6 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch bg-white border border-stone-100 shadow-sm">
//           <div className="lg:col-span-5 relative h-80 lg:h-auto min-h-[20rem] overflow-hidden group">
//             <Image
//               src={src}
//               alt={s.imageAlt || "Community and Connection"}
//               fill
//               unoptimized={unoptimized}
//               className="object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s] scale-105 group-hover:scale-100"
//             />
//             <div className="absolute inset-0 bg-deep-midnight-navy/10 group-hover:bg-transparent transition-colors duration-700" />
//             <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/10 backdrop-blur-md border border-white/10">
//               <p className="text-white font-serif italic text-lg leading-tight">
//                 &quot;
//                 {quoteLines.map((line, i) => (
//                   <React.Fragment key={i}>
//                     {i > 0 ? <br /> : null}
//                     {line}
//                   </React.Fragment>
//                 ))}
//                 &quot;
//               </p>
//             </div>
//           </div>

//           <div className="lg:col-span-7 p-8 lg:p-14 flex flex-col justify-center">
//             <span className="text-muted-burgundy-rose text-[9px] font-black tracking-[0.4em] uppercase mb-4 block">
//               {s.eyebrow}
//             </span>

//             <h2 className="text-3xl md:text-4xl font-serif text-deep-midnight-navy leading-tight mb-6">
//               {s.headingMain} <br />
//               <span className="italic text-muted-burgundy-rose">
//                 {s.headingAccent}
//               </span>
//             </h2>

//             <div className="space-y-4 text-stone-600 text-[15px] leading-relaxed max-w-lg">
//               <p>{s.paragraphOne}</p>
//               <p>{s.paragraphTwo}</p>
//             </div>

//             <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-4">
//               <div className="bg-muted-burgundy-rose/5 p-3 rounded-full shrink-0">
//                 <Heart className="text-muted-burgundy-rose" size={18} />
//               </div>
//               <div>
//                 <h4 className="text-deep-midnight-navy font-black text-[10px] uppercase tracking-widest mb-0.5">
//                   {s.commitmentTitle}
//                 </h4>
//                 <p className="text-stone-400 text-xs">{s.commitmentText}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SocialImpact;

"use client";
import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { ServicesContent } from "@/components/admin/services-editor/types";
import { INITIAL_SERVICES_CONTENT } from "@/components/admin/services-editor/constants";

type SocialImpactProps = {
  data?: ServicesContent["socialImpact"];
};

const SocialImpact = ({ data }: SocialImpactProps) => {
  const s = data ?? INITIAL_SERVICES_CONTENT.socialImpact;
  const src = s.imageUrl || "/image.png";
  const unoptimized = src.startsWith("data:");

  return (
    <section className="relative md:py-16 py-10 bg-white overflow-hidden">
      {/* Light dotted/textured background overlay (optional, matches the screenshot vibe) */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-0">
          
          {/* Left Side: The Image with the Offset Frame */}
          <div className="lg:col-span-6 relative">
            {/* The Decorative Border/Frame (The blue box in your screenshot) */}
            <div className="absolute -bottom-6 -left-6 w-[90%] h-full border-[3px] border-deep-midnight-navy z-0 hidden md:block" />
            
            {/* The Actual Image Container */}
            <div className="relative z-10 aspect-[4/3] w-full overflow-hidden shadow-2xl bg-white p-2">
               <div className="relative w-full h-full overflow-hidden">
                <Image
                    src={src}
                    alt={s.imageAlt || "Social Impact"}
                    fill
                    unoptimized={unoptimized}
                    className="object-cover transition-transform duration-700 hover:scale-105"
                />
               </div>
            </div>

            {/* Floating Badge (Matches the "handshake" focus) */}
            <div className="absolute -bottom-4 -right-4 bg-white p-4 shadow-xl z-20 hidden md:block border border-stone-100">
               <Heart className="text-muted-burgundy-rose fill-muted-burgundy-rose" size={24} />
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:col-span-6 lg:pl-20 py-0 md:py-10">
            <div className="max-w-xl">
              <span className="text-muted-burgundy-rose text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">
                {s.eyebrow}
              </span>

              <h2 className="text-3xl md:text-5xl font-serif text-deep-midnight-navy leading-[1.1] mb-8 font-bold">
                {s.headingMain} <br />
                <span className="text-muted-burgundy-rose italic font-light">
                  {s.headingAccent}
                </span>
              </h2>

              <div className="space-y-6 text-stone-600 text-base leading-relaxed border-l-2 border-stone-100 pl-6">
                <p>{s.paragraphOne}</p>
                <p className="text-sm text-stone-400">{s.paragraphTwo}</p>
              </div>

              {/* Commitment/Subtext area */}
              <div className="mt-10 flex items-start gap-4 bg-white/50 backdrop-blur-sm p-6 border border-white shadow-sm">
                <div className="mt-1">
                  <h4 className="text-deep-midnight-navy font-bold text-xs uppercase tracking-widest mb-1">
                    {s.commitmentTitle}
                  </h4>
                  <p className="text-stone-500 text-sm italic">
                    {s.commitmentText}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SocialImpact;