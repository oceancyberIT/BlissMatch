"use client";
import Image from "next/image";

const ConfidentialityCharter = () => {
  return (
    <section className="relative bg-deep-midnight-navy py-18 lg:py-20 overflow-hidden group">
      xw
      <div
        className="absolute -top-20 -left-12 w-60 h-96 overflow-hidden shadow-2xl border-t-2 border-muted-burgundy-rose
                      transition-transform duration-[2s] ease-out group-hover:-translate-y-8"
      >
        <Image
          src="/image copy.png" // Suggestion: A refined, slow-motion detail of a professional handshake
          alt="Confidence and Trust"
          fill
          className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-deep-midnight-navy to-transparent opacity-60" />
      </div>
      <div
        className="absolute -top-20 -right-12 w-60 h-96 overflow-hidden shadow-2xl border-t-2 border-muted-burgundy-rose
                      transition-transform duration-[2s] ease-out group-hover:-translate-y-6"
      >
        <Image
          src="/image copy.png" // Suggestion: A refined, slow-motion detail of a professional handshake
          alt="Confidence and Trust"
          fill
          className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-deep-midnight-navy to-transparent opacity-60" />
      </div>
      <div
        className="absolute -bottom-20 -right-12 w-60 h-96 overflow-hidden rounded-t-full shadow-2xl
                      transition-transform duration-[2s] ease-out group-hover:translate-y-8"
      >
        <Image
          src="/image.png" // Suggestion: A high-end portrait (maybe a silhouette or out of focus detail)
          alt="Discretion and Privacy"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-deep-midnight-navy opacity-50" />
      </div>
      <div className="absolute inset-10 opacity-10 pointer-events-none">
        <svg className="w-full h-full">
          <rect
            width="100%"
            height="100%"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="100 1200"
            className="animate-border-trace"
          />
        </svg>
      </div>
      <div
        className="absolute -bottom-20 border -left-12 w-60 h-96 overflow-hidden rounded-t-full shadow-2xl
                      transition-transform duration-[2s] ease-out group-hover:translate-y-8"
      >
        <Image
          src="/image.png" // Suggestion: A high-end portrait (maybe a silhouette or out of focus detail)
          alt="Discretion and Privacy"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-deep-midnight-navy opacity-50" />
      </div>
      <div className="absolute inset-10 opacity-10 pointer-events-none">
        <svg className="w-full h-full">
          <rect
            width="100%"
            height="100%"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="100 1200"
            className="animate-border-trace"
          />
        </svg>
      </div>
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-white font-serif text-4xl md:text-5xl mb-6">
          Confidentiality Charter
        </h2>
        <p className="text-muted-burgundy-rose font-bold tracking-[0.3em] uppercase text-xs mb-20">
          Discretion is not a courtesy — it is our code
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 text-left bg-white/5 p-12 backdrop-blur-sm border border-white/10 rounded-sm">
          {[
            "Strict Non-Disclosure Agreements for all data.",
            "Zero client disclosure without explicit consent.",
            "Binding commitments from all partners.",
            "Private, appointment-only consultations.",
            "Highest ethical standards in image safeguarding.",
          ].map((text, i) => (
            <div
              key={i}
              className="flex gap-4 items-start border-b border-white/5 pb-4 transition-colors hover:border-muted-burgundy-rose/40 group/item"
            >
              <span className="text-muted-burgundy-rose font-serif text-lg group-hover/item:scale-110 transition-transform">
                {i + 1}.
              </span>
              <p className="text-stone-300 text-sm leading-relaxed font-light">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConfidentialityCharter;
