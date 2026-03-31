'use client';

import Image from "next/image";
import Link from "next/link";
import { useHeroConfig } from "@/hooks/use-hero-config";
import { withCmsImageVersion } from "@/lib/cms-image";

const Hero = () => {
  const { config } = useHeroConfig("/admin/home");
  const heroTagline = config?.subtitle || "Where Love Meets Intention";
  const heroBody =
    config?.body ||
    "Expert relationship consultancy designed to help you navigate the complexities of love, connection, and lasting partnership.";
  const heroImage = config?.imageUrl || "/hero.jpg";
  const heroTitle = config?.title || "Building great relationships leads to an amazing life!";

  return (
    <section className="relative mt-[var(--site-header-offset)] min-h-[calc(100svh-var(--site-header-offset))] flex items-center overflow-hidden py-12 md:py-16 lg:py-20">
      <div className="absolute inset-0 z-0">
        <Image
          src={withCmsImageVersion(heroImage)}
          alt="Polished couple sharing a joyful moment"
          fill
          className="object-cover object-[68%_center] md:object-center"
          priority
        />

        {/* <div className="absolute inset-0 bg-linear-to-r from-deep-midnight-navy/80 via-deep-midnight-navy/40 to-transparent" /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-900/40 to-stone-900/20 md:from-stone-950/90 md:via-stone-900/30" />
      </div>

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="max-w-2xl text-white">
          <span className="inline-block  text-white text-sm border border-muted-burgundy-rose p-2 font-medium tracking-widest uppercase mb-4 opacity-90">
            {heroTagline}
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-6 drop-shadow-sm">
            {heroTitle}
          </h1>

          <p className="text-lg md:text-xl text-stone-100 mb-10 max-w-lg leading-relaxed">
            {heroBody}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/appointment"
              className="bg-white text-sm uppercase text-deep-midnight-navy px-8 py-4 font-semibold text-center hover:bg-muted-burgundy-rose hover:text-white transition-all duration-300 shadow-lg"
            >
              Book a Private Consultation
            </Link>
            <Link
              href="/services"
              className="bg-transparent text-sm uppercase border border-white/40 backdrop-blur-sm text-white px-8 py-4 font-semibold text-center hover:bg-white/10 transition-all duration-300"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
