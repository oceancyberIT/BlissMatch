"use client";
import React from "react";
import Image from "next/image";

const FinalSections = () => {
  return (
    <section className="relative pb-32 md:pb-18 pt-18 bg-warm-linen overflow-hidden">
      <div className="absolute top-1/2 -right-16 pointer-events-none select-none opacity-[0.02]">
        <h2 className="text-[20vw] font-serif font-bold text-deep-midnight-navy leading-none">
          Circle
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-2 items-stretch">
        <div className="relative p-16 rounded-sm overflow-hidden group">
          <div className="absolute inset-0 z-0 scale-105 group-hover:scale-100 transition-transform duration-[2s]">
            <Image
              src="/image copy 6.png" // A calm, atmospheric scene
              alt="Community Connection Visual"
              fill
              className="object-cover brightness-[0.7]"
            />

            <div className="absolute inset-6 opacity-30">
              <svg className="w-full h-full">
                <rect
                  width="100%"
                  height="100%"
                  fill="none"
                  stroke="#8d2d5d"
                  strokeWidth="1"
                  strokeDasharray="100 1200"
                  className="animate-border-trace"
                />
              </svg>
            </div>
          </div>

          <div className="relative z-10 space-y-8">
            <span className="text-white text-[10px] font-bold tracking-[0.4em] uppercase opacity-60">
              Social Impact
            </span>
            <h2 className="text-4xl font-serif text-white leading-tight">
              Love as a <br />{" "}
              <span className="italic text-muted-burgundy-rose">
                Force for Good
              </span>
            </h2>
            <div className="space-y-6 max-w-sm">
              <p className="text-stone-200 text-lg leading-relaxed font-light">
                A portion of our annual proceeds supports mental health
                initiatives for young adults navigating digital isolation.
              </p>
              <p className="text-white font-serif italic text-xl border-l-2 border-muted-burgundy-rose pl-6 py-1">
                "Helping the world feel less alone."
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-100 p-16 rounded-sm flex flex-col justify-between group">
          <div>
            <span className="text-muted-burgundy-rose text-[10px] font-bold tracking-widest uppercase">
              Launching 2026
            </span>
            <h2 className="text-3xl font-serif text-deep-midnight-navy mt-2 mb-4">
              The Bliss Circle
            </h2>
            <p className="text-stone-500 text-sm max-w-sm">
              An invitation-only network for returning clients. Curated
              gatherings and private retreats built on sincerity.
            </p>
          </div>

          <div className="mt-12 mb-0 relative h-90 w-full overflow-hidden border-t-2 border-muted-burgundy-rose">
            <Image
              src="/image copy 7.png" // Symbolizing curated experiences (handshake or elegant setting)
              alt="The Bliss Circle Experience"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>

          <div className="mt-8">
            <div className="inline-block px-8 py-3 bg-deep-midnight-navy text-white text-[10px] font-bold uppercase tracking-widest hover:bg-muted-burgundy-rose transition-colors cursor-pointer">
              Register Interest
            </div>
          </div>
        </div>
      </div>

      <div className="mt-32 md:mt-18 w-full flex justify-center">
        <div className="flex items-center gap-8 opacity-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.6em]">
            London
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-muted-burgundy-rose" />
          <span className="text-[10px] font-bold uppercase tracking-[0.6em]">
            Accra
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-muted-burgundy-rose" />
          <span className="text-[10px] font-bold uppercase tracking-[0.6em]">
            Paris
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes border-trace {
          from {
            stroke-dashoffset: 1350;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-border-trace {
          animation: border-trace 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default FinalSections;
