// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";
// import { HomeContent } from "@/components/admin/home-editor/types";
// import {
//   INITIAL_CONTENT,
//   mergeCollageImages,
// } from "@/components/admin/home-editor/constants";

// type OurServicesProps = {
//   data?: HomeContent["servicesOverview"];
// };

// const OurServices = ({ data }: OurServicesProps) => {
//   const s = {
//     ...INITIAL_CONTENT.servicesOverview,
//     ...(data ?? {}),
//     collageImages: mergeCollageImages(
//       INITIAL_CONTENT.servicesOverview.collageImages,
//       data?.collageImages,
//     ),
//   };

//   const collage = s.collageImages.slice(0, 4).map((img) => ({
//     src: img.url,
//     alt: img.alt,
//     objectPosition: img.objectPosition,
//   }));

//   return (
//     <section className="relative overflow-hidden bg-white py-10 lg:py-12">
//       <div className="mx-auto max-w-7xl px-6 lg:px-12">
//         <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-12">
//           <div className="z-10 p-1 lg:pr-6">
//             <span className="mb-3 block text-[13px] font-black uppercase tracking-[0.3em] text-muted-burgundy-rose">
//               {s.introEyebrow}
//             </span>
//             <p className="mb-5 text-sm md:text-base leading-relaxed text-stone-600">
//               {s.introLead}
//             </p>
//             <Link
//               href={s.introCtaHref || "/services"}
//               className="group inline-flex items-center border-b border-stone-300 pb-2 text-[11px] font-black uppercase tracking-[0.2em] text-deep-midnight-navy transition-colors hover:border-muted-burgundy-rose hover:text-muted-burgundy-rose"
//             >
//               {s.introCtaLabel}
//               <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//             </Link>
//           </div>

//           <div
//             className="relative w-full min-w-0"
//             role="region"
//             aria-label="Service imagery showcase"
//           >
//             <div className="space-y-2.5 md:hidden">
//               {collage[0] ? (
//                 <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-stone-100 shadow-sm ring-1 ring-stone-200/70">
//                   <Image
//                     src={collage[0].src}
//                     alt={collage[0].alt}
//                     fill
//                     sizes="100vw"
//                     className="object-cover"
//                     style={
//                       collage[0].objectPosition
//                         ? { objectPosition: collage[0].objectPosition }
//                         : undefined
//                     }
//                   />
//                 </div>
//               ) : null}
//               <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
//                 {collage.slice(1, 4).map((item, index) => (
//                   <div
//                     key={`sm-${item.src}-${index}`}
//                     className="relative aspect-[3/4] overflow-hidden rounded-xl bg-stone-100 shadow-sm ring-1 ring-stone-200/70"
//                   >
//                     <Image
//                       src={item.src}
//                       alt={item.alt}
//                       fill
//                       sizes="50vw"
//                       className="object-cover"
//                       style={
//                         item.objectPosition
//                           ? { objectPosition: item.objectPosition }
//                           : undefined
//                       }
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="hidden md:grid md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.75fr)] md:gap-3">
//               {collage[0] ? (
//                 <div className="relative min-h-[28rem] overflow-hidden rounded-2xl bg-stone-100 shadow-sm ring-1 ring-stone-200/70">
//                   <Image
//                     src={collage[0].src}
//                     alt={collage[0].alt}
//                     fill
//                     sizes="(max-width: 1280px) 45vw, 580px"
//                     className="object-cover"
//                     style={
//                       collage[0].objectPosition
//                         ? { objectPosition: collage[0].objectPosition }
//                         : undefined
//                     }
//                   />
//                 </div>
//               ) : null}

//               <div className="grid grid-rows-3 gap-3">
//                 {collage.slice(1, 4).map((item, index) => (
//                   <div
//                     key={`md-strip-${item.src}-${index}`}
//                     className="relative min-h-[6.5rem] overflow-hidden rounded-xl bg-stone-100 shadow-sm ring-1 ring-stone-200/70"
//                   >
//                     <Image
//                       src={item.src}
//                       alt={item.alt}
//                       fill
//                       sizes="(max-width: 1280px) 25vw, 320px"
//                       className="object-cover"
//                       style={
//                         item.objectPosition
//                           ? { objectPosition: item.objectPosition }
//                           : undefined
//                       }
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurServices;

"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeContent } from "@/components/admin/home-editor/types";
import {
  INITIAL_CONTENT,
  mergeCollageImages,
} from "@/components/admin/home-editor/constants";

type OurServicesProps = {
  data?: HomeContent["servicesOverview"];
};

const OurServices = ({ data }: OurServicesProps) => {
  const s = {
    ...INITIAL_CONTENT.servicesOverview,
    ...(data ?? {}),
    collageImages: mergeCollageImages(
      INITIAL_CONTENT.servicesOverview.collageImages,
      data?.collageImages,
    ),
  };

  const collage = s.collageImages.slice(0, 4).map((img) => ({
    src: img.url,
    alt: img.alt,
    objectPosition: img.objectPosition,
  }));

  return (
    <section className="relative overflow-hidden bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Top Header Row: Title and CTA on one line to save vertical space */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-xl">
            <span className="mb-3 block text-[11px] font-black uppercase tracking-[0.4em] text-muted-burgundy-rose">
              {s.introEyebrow}
            </span>
            <p className="text-lg md:text-xl font-serif leading-relaxed text-deep-midnight-navy italic">
              {s.introLead}
            </p>
          </div>
          <Link
            href={s.introCtaHref || "/services"}
            className="group inline-flex items-center bg-deep-midnight-navy px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-muted-burgundy-rose shrink-0"
          >
            {s.introCtaLabel}
            <ArrowRight className="ml-3 h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* The Image "Love Strip": Horizontal & Compact */}
        <div className="grid grid-cols-12 gap-3 h-[300px] md:h-[400px]">
          {/* Image 1: The Wide Anchor (40%) */}
          <div className="col-span-12 md:col-span-5 relative overflow-hidden rounded-sm group">
            <Image
              src={collage[0]?.src || "/image.png"}
              alt={collage[0]?.alt || "Service"}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Image 2: The Tall Slim (20%) */}
          <div className="hidden md:block md:col-span-2 relative overflow-hidden rounded-sm group">
             <Image
              src={collage[1]?.src || "/image copy 2.png"}
              alt="Detail"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Image 3: The Medium Square (25%) */}
          <div className="hidden md:block md:col-span-3 relative overflow-hidden rounded-sm group">
            <Image
              src={collage[2]?.src || "/image copy 3.png"}
              alt="Detail"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Image 4: The Slim End (15%) */}
          <div className="hidden md:block md:col-span-2 relative overflow-hidden rounded-sm group">
            <Image
              src={collage[3]?.src || "/image copy 4.png"}
              alt="Detail"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;