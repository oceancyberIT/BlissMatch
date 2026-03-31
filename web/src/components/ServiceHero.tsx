"use client";

import React from "react";
import Image from "next/image";
import { useHeroConfig } from "@/hooks/use-hero-config";
import { motion } from "framer-motion";
import { ServicesContent } from "@/components/admin/services-editor/types";
import {
  INITIAL_SERVICES_CONTENT,
  mergeHeroGallery,
} from "@/components/admin/services-editor/constants";

type ServiceHeroProps = {
  hero?: ServicesContent["hero"];
};

const ServicesHero = ({ hero }: ServiceHeroProps) => {
  const { config: heroConfig } = useHeroConfig("/admin/services");

  const title = heroConfig?.title || "Our Services";
  const subtitle = heroConfig?.subtitle || "The BlissMatch Suite";
  const body =
    heroConfig?.body ||
    "A bespoke collection of consultancy services designed for the discerning individual seeking depth, discretion, and a crafted path to love.";
  const imageUrl = heroConfig?.imageUrl || "/service.jpg";

  const gallery = mergeHeroGallery(
    INITIAL_SERVICES_CONTENT.hero.gallery,
    hero?.gallery,
  );
  const footerLabel =
    hero?.footerLabel ?? INITIAL_SERVICES_CONTENT.hero.footerLabel;

  return (
    <section className="relative mt-[var(--site-header-offset)] min-h-[calc(100svh-var(--site-header-offset))] items-start overflow-hidden pt-28 pb-24 md:min-h-[90vh] md:items-center md:pt-0 md:pb-0">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes="100vw"
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-900/40 to-stone-900/20 md:from-stone-950/90 md:via-stone-900/30" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 px-5 sm:px-6 md:gap-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-12">
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mt-6 max-w-xl border border-white/20 bg-transparent p-6 shadow-[20px_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:p-7 md:mt-0 md:p-10"
          >
            <div className="absolute top-0 left-0 h-24 w-1 bg-muted-burgundy-rose" />

            <span className="mb-4 block text-[9px] font-black uppercase tracking-[0.32em] text-white sm:text-[10px] sm:tracking-[0.38em]">
              {subtitle}
            </span>

            <h1 className="mb-5 text-3xl font-serif leading-[1.06] text-white sm:text-4xl md:mb-8 md:text-5xl">
              {title.split(" ").map((word, i) => (
                <span
                  key={`w-${i}`}
                  className={i === 1 ? "block font-light text-white italic" : ""}
                >
                  {word}{" "}
                </span>
              ))}
            </h1>

            <p className="mb-2 max-w-md text-[15px] font-light leading-relaxed text-stone-200 sm:text-base md:mb-4 md:text-[16px]">
              {body}
            </p>
          </motion.div>
        </div>

        <div className="relative flex h-[235px] items-start justify-center sm:h-[280px] md:h-[420px] lg:col-span-6 lg:h-[600px] lg:items-center lg:justify-end">
          <div className="flex items-end gap-3 sm:gap-4 md:gap-6">
            {gallery.slice(0, 3).map((item, index) => (
              <motion.div
                key={`${item.url}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className="group relative h-[170px] w-[29vw] max-w-[110px] overflow-hidden border-4 border-white/20 shadow-2xl backdrop-blur-sm sm:h-[205px] sm:max-w-[125px] md:h-[320px] md:w-40 md:max-w-none md:border-[6px] lg:h-80 lg:w-44"
                style={{
                  marginBottom:
                    index === 1 ? "clamp(18px, 4vw, 40px)" : "0px",
                }}
              >
                <Image
                  src={item.url}
                  alt={item.alt || "Service detail"}
                  fill
                  sizes="(max-width: 768px) 30vw, 200px"
                  className="object-cover transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-60" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 z-20 hidden items-center gap-4 lg:flex">
        <div className="h-px w-12 bg-white/30" />
        <span className="text-[9px] font-bold tracking-[0.5em] text-white/40 uppercase">
          {footerLabel}
        </span>
      </div>
    </section>
  );
};

export default ServicesHero;
