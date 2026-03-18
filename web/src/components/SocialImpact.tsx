import Image from "next/image";
import { Heart } from "lucide-react";

const SocialImpact = () => {
  return (
    <section className="relative py-16 lg:py-12 bg-warm-linen overflow-hidden">
      {/* Background Watermark - Reduced scale */}
      <div className="absolute top-1/2 left-[-2%] -translate-y-1/2 select-none pointer-events-none opacity-[0.03]">
        <h2 className="text-[12vw] font-serif font-bold text-deep-midnight-navy leading-none">
          Purpose
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch bg-white border border-stone-100 shadow-sm">
          {/* Image Container - Reduced height */}
          <div className="lg:col-span-5 relative h-80 lg:h-auto overflow-hidden group">
            <Image
              src="/image.png"
              alt="Community and Connection"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s] scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-deep-midnight-navy/10 group-hover:bg-transparent transition-colors duration-700" />
            <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/10 backdrop-blur-md border border-white/10">
              <p className="text-white font-serif italic text-lg leading-tight">
                "Helping the world <br /> feel less alone."
              </p>
            </div>
          </div>

          {/* Text Content - Condensed padding and text sizes */}
          <div className="lg:col-span-7 p-8 lg:p-14 flex flex-col justify-center">
            <span className="text-muted-burgundy-rose text-[9px] font-black tracking-[0.4em] uppercase mb-4 block">
              Social Impact
            </span>

            <h2 className="text-3xl md:text-4xl font-serif text-deep-midnight-navy leading-tight mb-6">
              Love as a <br />{" "}
              <span className="italic text-muted-burgundy-rose">
                Force for Good
              </span>
            </h2>

            <div className="space-y-4 text-stone-600 text-[15px] leading-relaxed max-w-lg">
              <p>
                At Bliss Match, we believe connection enriches not only lives
                but communities.
              </p>
              <p>
                A portion of our annual proceeds supports mental health and
                wellbeing initiatives for young adults navigating digital
                isolation.
              </p>
            </div>

            {/* Footer Commitment - Tightened layout */}
            <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-4">
              <div className="bg-muted-burgundy-rose/5 p-3 rounded-full shrink-0">
                <Heart className="text-muted-burgundy-rose" size={18} />
              </div>
              <div>
                <h4 className="text-deep-midnight-navy font-black text-[10px] uppercase tracking-widest mb-0.5">
                  Our Commitment
                </h4>
                <p className="text-stone-400 text-xs">
                  Every match made contributes to global emotional resilience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialImpact;
