// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// const ConnectionSection = () => {
//   return (
//     <section className="bg-white py-24 lg:py-32 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 lg:px-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//           {/* Left Side: The Image Composition - Classic & Sophisticated */}
//           <div className="relative order-2 lg:order-1">
//             <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-sm shadow-2xl">
//               <Image
//                 src="/images/happy-couple-embrace.jpg" // A warm, authentic shot of a couple, not a stock photo
//                 alt="A genuinely happy couple sharing a meaningful connection"
//                 fill
//                 className="object-cover transition-transform duration-700 hover:scale-105"
//                 priority // Ensures this image loads quickly
//               />
//             </div>
//             {/* Decorative element to add texture and depth */}
//             <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-slate-50 -z-10 rounded-sm" />
//           </div>

//           {/* Right Side: The Copy - Modern & Authoritative */}
//           <div className="flex flex-col order-1 lg:order-2">
//             <span className="text-pink-600 text-xs font-bold uppercase tracking-[0.3em] mb-6">
//               Our Vision
//             </span>

//             <h2 className="text-4xl md:text-5xl font-serif text-slate-950 leading-tight mb-8">
//               Building great <br />
//               <span className="italic">relationships</span> leads to <br />
//               an amazing life!
//             </h2>

//             <div className="space-y-6 text-slate-600 leading-relaxed max-w-xl">
//               <p>
//                 How to be happy in life? At BlissMatch, we believe it starts
//                 with a deeply considered connection. Our private matchmaking
//                 consultancy is designed specifically for exceptional
//                 individuals, global citizens, and discerning professionals who
//                 seek lasting love in an increasingly digital world.
//               </p>

//               <blockquote className="border-l-2 border-pink-600 pl-6 py-2 italic text-slate-950 font-serif text-lg">
//                 "We don’t introduce many. We introduce meaningfully."
//               </blockquote>

//               <p className="text-sm">
//                 We combine psychological insight with a bespoke matchmaking
//                 process to help you connect on every level—intellectual,
//                 emotional, and spiritual. Every engagement is handled with the
//                 utmost confidentiality and professional care.
//               </p>
//             </div>

//             {/* A professional CTA to encourage connection */}
//             <div className="mt-12">
//               <Link
//                 href="/appointment"
//                 className="inline-flex items-center group text-slate-950 font-bold uppercase text-xs tracking-widest border-b-2 border-slate-200 pb-2 hover:border-pink-600 transition-all"
//               >
//                 Let’s Talk About Your Next Chapter
//                 <span className="ml-3 transition-transform group-hover:translate-x-2 text-pink-600">
//                   →
//                 </span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ConnectionSection;
