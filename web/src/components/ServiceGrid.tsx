// "use client";
// import { ServicesContent } from "@/components/admin/services-editor/types";
// import { INITIAL_SERVICES_CONTENT } from "@/components/admin/services-editor/constants";

// type ServiceGridProps = {
//   data?: ServicesContent["grid"];
// };

// const ServiceGrid = ({ data }: ServiceGridProps) => {
//   const grid = data ?? INITIAL_SERVICES_CONTENT.grid;
//   const services = grid.cards;
//   const banner = grid.banner;

//   return (
//     <section className="py-10 md:py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-8">
//         {services.map((s, i) => (
//           <div
//             key={i}
//             className={`p-10 border border-stone-100 group hover:border-muted-burgundy-rose transition-colors duration-500
//             ${s.size === "lg" ? "md:col-span-8 bg-[#F9F7F5]" : "md:col-span-4"}`}
//           >
//             <h3 className="text-2xl font-serif text-deep-midnight-navy mb-4">
//               {s.title}
//             </h3>
//             <p className="text-stone-500 leading-relaxed">{s.desc}</p>
//             {s.size === "lg" && (
//               <div className="mt-8 h-px w-20 bg-muted-burgundy-rose group-hover:w-full transition-all duration-700" />
//             )}
//           </div>
//         ))}

//         <div className="md:col-span-12 bg-deep-midnight-navy p-12 rounded-sm flex flex-col md:flex-row justify-between items-center text-white">
//           <div>
//             <span className="text-muted-burgundy-rose text-[10px] font-bold tracking-widest uppercase">
//               {banner.eyebrow}
//             </span>
//             <h3 className="text-2xl font-serif mt-2">{banner.title}</h3>
//           </div>
//           <p className="text-white/60 max-w-sm mt-4 md:mt-0 italic">
//             {banner.paragraph}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServiceGrid;

"use client";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ServicesContent } from "@/components/admin/services-editor/types";
import { INITIAL_SERVICES_CONTENT } from "@/components/admin/services-editor/constants";

type ServiceCarouselProps = {
  data?: ServicesContent["grid"];
};

const compactCopy = (text: string, maxWords = 14) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();
  return `${words.slice(0, maxWords).join(" ")}.`;
};

const ServiceGrid = ({ data }: ServiceCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start", 
    containScroll: "trimSnaps",
    dragFree: true 
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const grid = data ?? INITIAL_SERVICES_CONTENT.grid;
  const services = grid.cards;

  return (
    <section className="md:py-16 py-10 bg-[#FCFBFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header & Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between md:mb-12 mb-6 gap-6">
          <div className="max-w-xl">
            <span className="text-muted-burgundy-rose text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
              A bespoke approach to <br />
              <span className="italic font-light text-stone-500">connection.</span>
            </h2>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all group"
            >
              <ChevronLeft size={20} className="group-active:scale-90 transition-transform" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all group"
            >
              <ChevronRight size={20} className="group-active:scale-90 transition-transform" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-6">
            {services.map((s, i) => (
              <div 
                key={i} 
                className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_32%] min-w-0"
              >
                <div className="group relative h-full border border-stone-100 bg-white p-7 md:p-10 lg:p-12 transition-all duration-500 hover:shadow-xl hover:shadow-stone-200/50">
                  {/* Background Number */}
                  <span className="absolute top-6 right-8 text-6xl font-serif text-stone-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    0{i + 1}
                  </span>

                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="mb-4 text-xl font-serif tracking-normal text-stone-800 md:mb-6 md:text-2xl md:tracking-tight">
                      {s.title}
                    </h3>
                    
                    <div className="mb-4 h-[1px] w-8 bg-muted-burgundy-rose transition-all duration-500 group-hover:w-16 md:mb-6" />
                    
                    <p className="mb-7 text-sm font-light leading-relaxed text-stone-500 md:mb-10 md:text-base">
                      {compactCopy(s.desc, 14)}
                    </p>

                    <button className="mt-auto text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 group-hover:text-muted-burgundy-rose transition-colors flex items-center gap-2">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;