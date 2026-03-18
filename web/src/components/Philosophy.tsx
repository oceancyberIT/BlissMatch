import Image from "next/image";
import { ShieldCheck, Sparkles } from "lucide-react";

const Philosophy = () => {
  return (
    <section className="bg-white py-20 lg:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center mb-8">
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-muted-burgundy-rose text-xs font-bold uppercase tracking-[0.4em] mb-6 block">
                Our Philosophy
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-deep-midnight-navy leading-tight">
                We believe that <br />
                <span className="italic text-muted-burgundy-rose">
                  love is deliberate.
                </span>
              </h2>
            </div>

            <div className="border-l-2 border-muted-burgundy-rose/20 pl-8 space-y-5">
              <p className="text-xl text-stone-600 leading-relaxed font-light italic">
                "It starts with self-awareness, deepens through shared values,
                and endures through emotional intelligence."
              </p>
              <p className="text-stone-500 leading-relaxed max-w-md">
                We combine psychological insight with refined matchmaking
                practice to help clients connect on every level — intellectual,
                emotional, and spiritual.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center gap-4 h-100 md:h-100">
            <div className="relative w-1/3 h-[60%] rounded-t-full overflow-hidden shadow-2xl self-start">
              <Image
                src="/image.png"
                alt="Perspective"
                fill
                className="object-cover"
              />
            </div>

            <div
              className="relative w-1/2 h-[80%] shadow-2xl z-10"
              style={{ borderRadius: "120px 0px 120px 120px" }}
            >
              <div
                className="relative w-full h-full overflow-hidden"
                style={{ borderRadius: "inherit" }}
              >
                <Image
                  src="/image copy 4.png"
                  alt="Connection"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative w-1/4 h-[50%] rounded-sm overflow-hidden shadow-xl self-center border-l-4 border-muted-burgundy-rose">
              <Image
                src="/image copy 3.png"
                alt="Detail"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group p-10 lg:px-12 bg-[#F9F7F5] transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2 border border-black hover:border-stone-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 opacity-[0.03] -mr-10 -mt-10">
              <Sparkles size={100} />
            </div>
            <Sparkles
              className="text-muted-burgundy-rose mb-5 relative z-10"
              size={30}
            />
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-deep-midnight-navy mb-5 relative z-10">
              Our Promise
            </h3>
            <p className="text-xl md:text-2xl font-serif text-deep-midnight-navy leading-snug mb-5 relative z-10">
              We don’t introduce many. <br />
              <span className="italic">We introduce meaningfully.</span>
            </p>
            <div className="w-12 h-px bg-muted-burgundy-rose group-hover:w-full transition-all duration-700 opacity-30 relative z-10" />
          </div>

          <div className="group p-10 lg:p-16 bg-deep-midnight-navy transition-all duration-500 hover:-translate-y-2 shadow-xl relative overflow-hidden">
            <div className="absolute inset-4 opacity-10 pointer-events-none">
              <svg className="w-full h-full">
                <rect
                  width="100%"
                  height="100%"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  strokeDasharray="60 600"
                />
              </svg>
            </div>

            <ShieldCheck
              className="text-muted-burgundy-rose mb-8 relative z-10"
              size={32}
            />
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-6 relative z-10">
              Discretion & Trust
            </h3>
            <p className="text-stone-300 text-lg leading-relaxed mb-6 relative z-10">
              Every client engagement is strictly confidential. We operate
              quietly, respectfully, and by appointment only.
            </p>
            <p className="text-white font-serif italic text-lg relative z-10">
              Ensuring professionalism, privacy, and care at every stage.
            </p>
          </div>
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {/* Card 1: Our Promise */}
          <div className="group p-8 lg:p-10 bg-[#F9F7F5] transition-all duration-500 hover:bg-white hover:shadow-xl hover:-translate-y-1 border border-black/10 hover:border-stone-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.03] -mr-8 -mt-8">
              <Sparkles size={80} />
            </div>
            <Sparkles
              className="text-muted-burgundy-rose mb-3 relative z-10"
              size={24}
            />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-midnight-navy mb-3 relative z-10">
              Our Promise
            </h3>
            <p className="text-lg md:text-xl font-serif text-deep-midnight-navy leading-tight mb-4 relative z-10">
              We don’t introduce many. <br />
              <span className="italic">We introduce meaningfully.</span>
            </p>
            <div className="w-10 h-px bg-muted-burgundy-rose group-hover:w-full transition-all duration-700 opacity-30 relative z-10" />
          </div>

          {/* Card 2: Discretion & Trust */}
          <div className="group p-8 lg:p-10 bg-deep-midnight-navy transition-all duration-500 hover:-translate-y-1 shadow-lg relative overflow-hidden">
            <div className="absolute inset-2 opacity-5 pointer-events-none">
              <svg className="w-full h-full">
                <rect
                  width="100%"
                  height="100%"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  strokeDasharray="40 400"
                />
              </svg>
            </div>

            <ShieldCheck
              className="text-muted-burgundy-rose mb-4 relative z-10"
              size={24}
            />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-3 relative z-10">
              Discretion & Trust
            </h3>
            <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-4 relative z-10">
              Every client engagement is strictly confidential. We operate
              quietly, respectfully, and by appointment only.
            </p>
            <p className="text-white font-serif italic text-base relative z-10 opacity-90">
              Ensuring professionalism, privacy, and care.
            </p>
          </div>
        </div>

        <div className="mt-20 lg:mt-8 text-center">
          <div className="inline-flex items-center gap-4 text-stone-800 uppercase text-[10px] tracking-[0.5em] font-bold">
            <div className="w-12 h-px bg-stone-200" />
            Private Consultancy
            <div className="w-12 h-px bg-stone-200" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
