"use client";
import React from "react";
import Image from "next/image";
import { useHeroConfig } from "@/hooks/use-hero-config";

const ServicesHero = () => {
  const config = useHeroConfig("/admin/services");
  const title = config?.title || "Our Services";
  const subtitle = config?.subtitle || "The BlissMatch Suite";
  const body =
    config?.body ||
    "A bespoke collection of consultancy services designed for the discerning individual seeking depth, discretion, and a crafted path to love.";
  const imageUrl = config?.imageUrl || "/image.png";

  return (
    <section className="relative min-h-[90vh] flex items-center justify-start overflow-hidden pt-32 md:pt-48">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt="BlissMatch Service Sanctuary"
          fill
          className="object-cover brightness-[0.4] scale-105"
          priority
        />

        <div className="absolute inset-0 bg-linear-to-r from-deep-midnight-navy/90 via-deep-midnight-navy/40 to-transparent" />
      </div>

      <div className="absolute inset-10 pointer-events-none z-10 opacity-20">
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

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-2xl bg-white/5 backdrop-blur-md p-8 mt-8 md:mt-0 mb-4 md:mb-0 md:p-12 border border-white/10 rounded-sm">
            <span className="text-white text-xs border border-muted-burgundy-rose p-2 font-bold uppercase tracking-[0.2em] mb-6 inline-block">
              {subtitle}
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-white leading-[0.9] mb-8">
              {title}
            </h1>
            <p className="text-stone-300 text-lg md:text-xl font-light leading-relaxed max-w-md">
              {body}
            </p>
          </div>

          <div className="flex gap-4 h-87.5 md:h-125 items-end">
            {[2, 3, 4].map((i) => (
              <div
                key={i}
                className={`relative w-16 md:w-28 h-full overflow-hidden shadow-2xl transition-all duration-1000 ease-in-out hover:w-56 border-x border-white/10
                  ${i === 2 ? "rounded-t-full h-[80%]" : ""}
                  ${i === 3 ? "rounded-full h-full mb-5" : ""}
                  ${i === 4 ? "rounded-b-full h-[90%] mb-10 lg:mt-16 border" : ""}
                `}
              >
                <Image
                  src={`/image copy ${i}.png`}
                  alt="Service detail"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-deep-midnight-navy/20 hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>
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
          animation: border-trace 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ServicesHero;
