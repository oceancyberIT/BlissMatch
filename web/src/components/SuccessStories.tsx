// "use client";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Quote, Star } from "lucide-react";

// export type SuccessStory = {
//   id?: string;
//   quote: string;
//   author: string;
//   location: string;
//   stars: number;
// };

// const fallbackStories: SuccessStory[] = [
//   {
//     quote:
//       "I had forgotten what it felt like to be seen. BlissMatch reminded me that love can be elegant and kind.",
//     author: "Ella",
//     location: "London",
//     stars: 5,
//   },
//   {
//     quote:
//       "They understood me in a way no app ever could. Every introduction was thoughtful and sincere.",
//     author: "Kwame",
//     location: "Accra",
//     stars: 5,
//   },
//   {
//     quote:
//       "Professionalism with heart. Confidential, intuitive, and refined — exactly what I hoped for.",
//     author: "Marie",
//     location: "Paris",
//     stars: 5,
//   },
// ];

// export const SUCCESS_STORIES_FALLBACK = fallbackStories;

// export function mapSuccessStoriesFromApi(data: unknown[]): SuccessStory[] {
//   return data.map((story: any) => ({
//     id: story.id,
//     quote: story.quote ?? "",
//     author: story.author ?? "",
//     location: story.location ?? "",
//     stars: Number(story.stars ?? 5),
//   }));
// }

// type SuccessStoriesProps = {
//   /** When set, skips internal fetch (e.g. parent loaded `/api/admin/success-stories`). */
//   stories?: SuccessStory[];
// };

// const SuccessStories = ({ stories: controlledStories }: SuccessStoriesProps) => {
//   const [stories, setStories] = useState<SuccessStory[]>(
//     controlledStories ?? fallbackStories,
//   );

//   useEffect(() => {
//     if (controlledStories !== undefined) {
//       setStories(controlledStories.length ? controlledStories : fallbackStories);
//       return;
//     }

//     let active = true;

//     async function loadStories() {
//       try {
//         const res = await fetch("/api/admin/success-stories", { cache: "no-store" });
//         const data = await res.json().catch(() => []);
//         if (!active) return;
//         if (res.ok && Array.isArray(data) && data.length) {
//           setStories(mapSuccessStoriesFromApi(data));
//         }
//       } catch {
//         // Keep fallback content
//       }
//     }

//     loadStories();
//     return () => {
//       active = false;
//     };
//   }, [controlledStories]);

//   return (
//     <section className="bg-[#F9F7F5] py-10 lg:py-10 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 lg:px-12">
//         {/* Section Header */}
//         <div className="text-center mb-9 lg:mb-10">
//           <span className="text-muted-burgundy-rose text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
//             Success Stories
//           </span>
//           <h2 className="text-3xl md:text-4xl font-serif text-deep-midnight-navy">
//             Stories of Connection
//           </h2>
//           {/* <div className="w-16 h-[1px] bg-muted-burgundy-rose mx-auto mt-6"></div> */}
//         </div>

//         {/* Stories Display */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {stories.map((story, index) => (
//             <motion.div
//               key={story.id ?? `${story.author}-${index}`}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: index * 0.2 }}
//               viewport={{ once: true }}
//               className="bg-white p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-between border-b-2 border-transparent hover:border-muted-burgundy-rose transition-all duration-500 group"
//             >
//               <div>
//                 <div className="flex gap-1 mb-5">
//                   {[...Array(story.stars)].map((_, i) => (
//                     <Star
//                       key={i}
//                       size={14}
//                       className="fill-muted-burgundy-rose text-muted-burgundy-rose opacity-60"
//                     />
//                   ))}
//                 </div>

//                 <Quote
//                   className="text-stone-100 mb-4 group-hover:text-muted-burgundy-rose/10 transition-colors"
//                   size={24}
//                 />

//                 <p className="text-deep-midnight-navy md:text-lg text-base font-serif italic leading-relaxed mb-5">
//                   “{story.quote}”
//                 </p>
//               </div>

//               <div className="flex flex-col">
//                 <span className="md:text-sm text-xs font-bold uppercase tracking-widest text-deep-midnight-navy">
//                   — {story.author}
//                 </span>
//                 <span className="md:text-xs text-xs text-stone-400 mt-1">
//                   {story.location}
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <div className="mt-10 w-full h-1px bg-stone-200 relative text-center">
//           <div className="absolute left-1/2 -translate-x-1/2 -top-2 px-6 bg-[#F9F7F5] text-stone-600 text-[10px] tracking-[0.2em] uppercase font-bold">
//             Privacy is our Priority
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SuccessStories;


"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export type SuccessStory = {
  id?: string;
  quote: string;
  author: string;
  location: string;
  stars: number;
};

const fallbackStories: SuccessStory[] = [
  {
    quote: "I had forgotten what it felt like to be seen. BlissMatch reminded me that love can be elegant and kind.",
    author: "Ella",
    location: "London",
    stars: 5,
  },
  {
    quote: "They understood me in a way no app ever could. Every introduction was thoughtful and sincere.",
    author: "Kwame",
    location: "Accra",
    stars: 5,
  },
  {
    quote: "Professionalism with heart. Confidential, intuitive, and refined — exactly what I hoped for.",
    author: "Marie",
    location: "Paris",
    stars: 5,
  },
];

export const SUCCESS_STORIES_FALLBACK = fallbackStories;

export function mapSuccessStoriesFromApi(data: unknown[]): SuccessStory[] {
  return data.map((story: any) => ({
    id: story.id,
    quote: story.quote ?? "",
    author: story.author ?? "",
    location: story.location ?? "",
    stars: Number(story.stars ?? 5),
  }));
}


const SuccessStories = ({ stories: controlledStories }: { stories?: SuccessStory[] }) => {
  const [stories, setStories] = useState<SuccessStory[]>(controlledStories ?? fallbackStories);


      useEffect(() => {
        if (controlledStories !== undefined) {
          setStories(controlledStories.length ? controlledStories : fallbackStories);
          return;
        }
    
        let active = true;
    
        async function loadStories() {
          try {
            const res = await fetch("/api/admin/success-stories", { cache: "no-store" });
            const data = await res.json().catch(() => []);
            if (!active) return;
            if (res.ok && Array.isArray(data) && data.length) {
              setStories(mapSuccessStoriesFromApi(data));
            }
          } catch {
            // Keep fallback content
          }
        }
    
        loadStories();
        return () => {
          active = false;
        };
      }, [controlledStories]);

  return (
    <section className="bg-[#FDFCFB] py-12 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Modern Minimal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-lg">
            <span className="text-muted-burgundy-rose text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-deep-midnight-navy leading-tight">
              Stories of <span className="italic text-stone-400">Connection</span>
            </h2>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
             <div className="w-12 h-px bg-stone-200" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                Swipe to explore
             </span>
          </div>
        </div>

        {/* Horizontal Snap Layout: Keeps height consistent and compact */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
          {stories.map((story, index) => (
            <motion.div
              key={story.id ?? index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[85vw] md:min-w-[400px] snap-center bg-white border border-stone-100 p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] group"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1">
                    {[...Array(story.stars)].map((_, i) => (
                      <Star key={i} size={12} className="fill-muted-burgundy-rose text-muted-burgundy-rose" />
                    ))}
                  </div>
                  <Quote size={18} className="text-stone-100 group-hover:text-muted-burgundy-rose/20 transition-colors" />
                </div>

                <p className="text-deep-midnight-navy text-base md:text-lg font-serif italic leading-relaxed mb-8">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-stone-200" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-deep-midnight-navy block">
                    {story.author}
                  </span>
                  <span className="text-[10px] text-stone-400 uppercase tracking-tighter">
                    {story.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simplified Privacy Badge */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-muted-burgundy-rose/40" />
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-400">
            Discretion & Privacy Guaranteed
          </p>
          <div className="w-1.5 h-1.5 rounded-full bg-muted-burgundy-rose/40" />
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default SuccessStories;