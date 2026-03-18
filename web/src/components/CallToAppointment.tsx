import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CallToAppointment = () => {
  const couples = [
    { src: "/image copy 2.png", alt: "Authentic couple sharing a laugh" },
    {
      src: "/image copy 4.png",
      alt: "A sophisticated couple in a close embrace",
    },
    {
      src: "/image copy 3.png",
      alt: "Couple walking hand-in-hand in a garden",
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 max-w-xl">
            <span className="text-muted-burgundy-rose text-xs font-bold uppercase tracking-[0.4em] mb-6 block">
              Connection Begins with a Conversation
            </span>

            <h2 className="text-4xl md:text-5xl font-serif text-deep-midnight-navy leading-tight mb-8">
              Are you ready for a <br />
              <span className="italic text-muted-burgundy-rose">
                meaningful
              </span>{" "}
              introduction?
            </h2>

            <div className="space-y-6 text-stone-600 text-lg md:text-xl leading-relaxed font-light">
              <p>
                The journey to a purposeful relationship is not found in an
                algorithm. It is curated with intention, discretion, and a deep
                understanding of who you are.
              </p>
            </div>

            <div className="pt-5">
              <Link
                href="/appointment"
                className="inline-flex items-center gap-4 px-10 py-5 bg-deep-midnight-navy text-white text-xs font-bold uppercase tracking-widest shadow-xl hover:bg-muted-burgundy-rose transition-all duration-500"
              >
                Book a Private Consultation
                <span className="text-white/80">
                  <ArrowRight size={16} className="" />
                </span>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-[#F9F7F5] rounded-full blur-3xl -z-10 opacity-60" />

            <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:items-center justify-center gap-4">
              {couples.map((couple, index) => (
                <div
                  key={index}
                  className={`relative w-full md:w-48 aspect-2/3 transition-all duration-700 hover:scale-105
                    ${index === 1 ? "md:w-64 md:z-20 scale-110 shadow-2xl" : "md:opacity-80 md:z-10"}
                  `}
                  style={{
                    borderRadius:
                      index % 2 === 0
                        ? "100px 0px 100px 100px"
                        : "0px 100px 100px 100px",
                  }}
                >
                  <div
                    className="relative w-full h-full overflow-hidden"
                    style={{ borderRadius: "inherit" }}
                  >
                    <Image
                      src={couple.src}
                      alt={couple.alt}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div
                    className="absolute -inset-2 border border-stone-100 -z-10 pointer-events-none"
                    style={{
                      borderRadius:
                        index % 2 === 0
                          ? "110px 10px 110px 110px"
                          : "10px 110px 110px 110px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 lg:mt-10 w-full flex justify-center">
        <div className="flex items-center gap-8 opacity-70">
          <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-stone-800">
            London
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-muted-burgundy-rose" />
          <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-stone-800">
            Accra
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-muted-burgundy-rose" />
          <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-stone-800">
            Paris
          </span>
        </div>
      </div>
    </section>
  );
};

export default CallToAppointment;
