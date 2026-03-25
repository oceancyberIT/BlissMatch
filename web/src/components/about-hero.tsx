"use client";
import Image from "next/image";
import { useHeroConfig } from "@/hooks/use-hero-config";
import { AboutContent } from "@/components/admin/about-editor/types";

type AboutHeroProps = {
  data?: AboutContent["hero"];
};

const AboutHero = ({ data }: AboutHeroProps) => {
  const config = useHeroConfig("/admin/about");
  const title = data?.title || config?.title || "Our Story";
  const subtitle = data?.subtitle || config?.subtitle || "Established in Connection";
  const body =
    data?.body ||
    config?.body ||
    "BlissMatch was founded by two best friends—one from a background in Human Behaviour Studies, the other in Business and Law—united by a vision to restore authenticity to modern relationships.";
  const imageUrl = data?.sideImageUrl || config?.imageUrl || "/image.png";
  const backgroundImage = data?.backgroundImageUrl || "/image copy 2.png";
  const sideNote =
    data?.sideNote ||
    "In a fast, digital world, real connection had become rare. We built BlissMatch as a sanctuary for meaningful love—a private consultancy rooted in discretion and human understanding.";
  const quote = data?.quote || "Restoring the art of human connection.";

  return (
    <section className="relative min-h-[95vh] flex items-center pt-38 pb-20 lg:pt-42 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="BlissMatch Sanctuary"
          fill
          className="object-cover brightness-[0.4] scale-105"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-deep-midnight-navy/80 via-deep-midnight-navy/40 to-transparent" />
      </div>

      <div className="absolute inset-8 pointer-events-none z-10 opacity-20">
        <svg className="w-full h-full">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            strokeDasharray="150 1200"
            className="animate-border-trace"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            {/* Tag now clearly visible below the header */}
            <span className="text-white border border-muted-burgundy-rose px-3 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 inline-block">
              {subtitle}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif text-white leading-[1.1] mb-6 tracking-tighter">
              {title}
            </h1>

            <div className="space-y-6 text-stone-200 text-lg md:text-xl leading-relaxed">
              <p>{body}</p>
              <p className="text-base text-stone-300 font-light max-w-lg italic border-l border-muted-burgundy-rose/30 pl-6">
                {sideNote}
              </p>
            </div>
          </div>

          <div className="relative">
            {/* Arched image container */}
            <div className="relative aspect-4/4 md:aspect-3/4 w-full max-w-sm mx-auto lg:ml-auto overflow-hidden shadow-2xl rounded-t-full border-[12px] border-white/10 backdrop-blur-sm">
              <Image
                src={imageUrl}
                alt="BlissMatch Founders"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>

            {/* Desktop Quote Box */}
            <div className="absolute -bottom-6 -left-6 bg-white p-8 shadow-2xl max-w-[240px] hidden md:block border-t-4 border-muted-burgundy-rose">
              <p className="font-serif italic text-deep-midnight-navy text-lg leading-snug">
                "{quote}"
              </p>
            </div>
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

export default AboutHero;
