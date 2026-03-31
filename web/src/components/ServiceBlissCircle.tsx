"use client";
import React from "react";
import Image from "next/image";
import { useHeroConfig } from "@/hooks/use-hero-config";

const BlissCircleHero = () => {
  const { config, loading } = useHeroConfig("/admin/services");
  
  // New Content Integration
  const title = "The Bliss Circle";
  const subtitle = "Coming Soon";
  const body = "Our upcoming Bliss Circle will offer an invitation-only network for returning clients and selected individuals who value meaningful connections, private retreats, and curated gatherings.";
  const subtext = "A global community built around sincerity, trust, and emotional growth. Launching in 2026.";
  const imageUrl = config?.imageUrl || "/image.png";

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-white pt-24 pb-10 md:min-h-[90vh] md:items-center md:pt-0 md:pb-0">
      
      {/* Left Side: Image with the Large Organic Concave Curve */}
      <div className="absolute inset-y-0 left-0 z-10 w-full lg:w-[62%]">
        <div className="relative h-full w-full">
          {!loading ? (
            <Image
              src={imageUrl}
              alt="The Bliss Circle Exclusive Gathering"
              fill
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full min-h-[50vh] w-full bg-stone-900" aria-hidden="true" />
          )}
          {/* Subtle overlay to blend into the curve */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/35 lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent hidden lg:block" />
        </div>
      </div>

      {/* Right Side: Content Area (The Reveal) */}
      <div className="relative z-20 mx-auto grid w-full max-w-7xl grid-cols-1 px-5 sm:px-6 lg:grid-cols-12 lg:px-12">
        <div className="flex flex-col justify-end py-6 sm:py-8 lg:col-span-6 lg:col-start-7 lg:justify-center lg:py-0 lg:pl-20">
          
          <div className="relative rounded-sm border border-white/20 bg-black/35 p-5 backdrop-blur-[2px] sm:p-6 lg:border-transparent lg:bg-transparent lg:p-0 lg:backdrop-blur-0">
            {/* Minimalist Floating Element (Symbolizing Community) */}
            <div className="absolute -top-16 right-10 opacity-10 hidden md:block">
               <div className="w-24 h-24 border border-muted-burgundy-rose rounded-full" />
            </div>

            <span className="mb-3 block text-[9px] font-black uppercase tracking-[0.34em] text-muted-burgundy-rose sm:text-[10px] sm:tracking-[0.45em] lg:mb-4 animate-pulse">
              {subtitle}
            </span>
            
            <h1 className="mb-4 text-3xl font-serif font-bold leading-[1.05] text-white sm:text-4xl md:text-5xl lg:mb-8 lg:text-deep-midnight-navy">
              {title}
            </h1>
            <div className="space-y-4 lg:space-y-6">
              <p className="max-w-md text-[15px] font-light leading-relaxed text-stone-100 sm:text-base md:text-lg lg:text-xl lg:text-stone-600">
                {body}
              </p>
              
              <p className="max-w-sm border-l border-white/30 pl-4 text-xs italic leading-relaxed text-stone-300 sm:text-sm md:text-base lg:border-stone-200 lg:pl-6 lg:text-stone-400">
                {subtext}
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Background Floral/Texture Overlay (Subtle watermark style) */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-[0.03] pointer-events-none grayscale">
         <div className="w-full h-full bg-[url('/floral-pattern.png')] bg-no-repeat bg-right-bottom bg-contain" />
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          /* Creates the massive curved mask on the left image */
          .lg\:w-\[62\%\] {
            clip-path: ellipse(95% 140% at 5% 50%);
          }
          
          section {
            background: linear-gradient(to right, #fdfdfd 50%, #ffffff 50%);
          }
        }
      `}</style>
    </section>
  );
};

export default BlissCircleHero;