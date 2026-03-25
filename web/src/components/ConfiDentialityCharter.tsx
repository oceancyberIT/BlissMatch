"use client";
import Image from "next/image";
import { ServicesContent } from "@/components/admin/services-editor/types";
import { INITIAL_SERVICES_CONTENT } from "@/components/admin/services-editor/constants";

type ConfidentialityCharterProps = {
  data?: ServicesContent["confidentiality"];
};

const ConfidentialityCharter = ({ data }: ConfidentialityCharterProps) => {
  const c = data ?? INITIAL_SERVICES_CONTENT.confidentiality;
  const img = (src: string) => ({
    src: src || "/image.png",
    unoptimized: src.startsWith("data:"),
  });

  const topL = img(c.imageTopLeft);
  const topR = img(c.imageTopRight);
  const botR = img(c.imageBottomRight);
  const botL = img(c.imageBottomLeft);

  return (
    <section className="relative bg-deep-midnight-navy py-10 lg:py-20 overflow-hidden group">
      <div
        className="absolute -top-20 -left-12 w-60 h-96 overflow-hidden shadow-2xl border-t-2 border-muted-burgundy-rose
                      transition-transform duration-[2s] ease-out group-hover:-translate-y-8"
      >
        <Image
          src={topL.src}
          alt="Confidence and Trust"
          fill
          unoptimized={topL.unoptimized}
          className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-deep-midnight-navy to-transparent opacity-60" />
      </div>
      <div
        className="absolute -top-20 -right-12 w-60 h-96 overflow-hidden shadow-2xl border-t-2 border-muted-burgundy-rose
                      transition-transform duration-[2s] ease-out group-hover:-translate-y-6"
      >
        <Image
          src={topR.src}
          alt="Confidence and Trust"
          fill
          unoptimized={topR.unoptimized}
          className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-deep-midnight-navy to-transparent opacity-60" />
      </div>
      <div
        className="absolute -bottom-20 -right-12 w-60 h-96 overflow-hidden rounded-t-full shadow-2xl
                      transition-transform duration-[2s] ease-out group-hover:translate-y-8"
      >
        <Image
          src={botR.src}
          alt="Discretion and Privacy"
          fill
          unoptimized={botR.unoptimized}
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
          src={botL.src}
          alt="Discretion and Privacy"
          fill
          unoptimized={botL.unoptimized}
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
        <h2 className="text-white font-serif text-3xl md:text-4xl mb-6">
          {c.title}
        </h2>
        <p className="text-white font-bold tracking-[0.1em] uppercase text-xs mb-20">
          {c.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 text-left bg-white/5 p-12 backdrop-blur-sm border border-white/10 rounded-sm">
          {c.bullets.map((text, i) => (
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
