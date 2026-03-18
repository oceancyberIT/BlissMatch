import Image from "next/image";
import { ShieldCheck, MapPin, Users } from "lucide-react";

const BlissCircle = () => {
  return (
    <section className="relative py-24 lg:py-16 bg-warm-linen overflow-hidden">
      <div className="absolute -bottom-10 -right-20 pointer-events-none select-none opacity-[0.02]">
        <h2 className="text-[25vw] font-serif font-bold text-deep-midnight-navy leading-none">
          Circle
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch border border-stone-100">
          <div className="lg:col-span-7 bg-white p-12 lg:p-16 flex flex-col justify-center">
            <span className="text-muted-burgundy-rose text-[10px] font-bold tracking-[0.5em] uppercase mb-5 block">
              Launching 2026
            </span>

            <h2 className="text-4xl md:text-5xl font-serif text-deep-midnight-navy leading-tight mb-5">
              The <span className="italic">Bliss Circle</span>
            </h2>

            <div className="space-y-6 max-w-lg mb-6">
              <p className="text-stone-600 text-lg font-light leading-relaxed">
                An invitation-only network for returning clients and selected
                individuals who value meaningful connections, private retreats,
                and curated gatherings.
              </p>
              <p className="text-stone-500 text-sm leading-relaxed border-l border-muted-burgundy-rose pl-4">
                A global community built around sincerity, trust, and emotional
                growth.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-7 border-t border-stone-100">
              <div className="text-center md:text-left">
                <ShieldCheck
                  size={18}
                  className="text-muted-burgundy-rose mb-3 mx-auto md:mx-0"
                />
                <span className="text-[9px] font-bold uppercase tracking-widest text-deep-midnight-navy">
                  Trust
                </span>
              </div>
              <div className="text-center md:text-left">
                <MapPin
                  size={18}
                  className="text-muted-burgundy-rose mb-3 mx-auto md:mx-0"
                />
                <span className="text-[9px] font-bold uppercase tracking-widest text-deep-midnight-navy">
                  Retreats
                </span>
              </div>
              <div className="text-center md:text-left">
                <Users
                  size={18}
                  className="text-muted-burgundy-rose mb-3 mx-auto md:mx-0"
                />
                <span className="text-[9px] font-bold uppercase tracking-widest text-deep-midnight-navy">
                  Network
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-100 lg:min-h-full bg-deep-midnight-navy overflow-hidden group">
            <Image
              src="/image copy 7.png"
              alt="Exclusive Gathering"
              fill
              className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s]"
            />

            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="w-full border border-white/20 p-10 backdrop-blur-sm bg-deep-midnight-navy/40 flex flex-col items-center text-center">
                <h4 className="text-white font-serif italic text-2xl mb-6">
                  Coming Soon
                </h4>
                <div className="h-px w-12 bg-muted-burgundy-rose mb-8" />
                <button className="px-8 py-4 bg-white text-deep-midnight-navy text-[10px] font-bold uppercase tracking-widest hover:bg-muted-burgundy-rose hover:text-white transition-all duration-500">
                  Register Interest
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlissCircle;
