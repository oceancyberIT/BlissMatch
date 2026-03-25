"use client";
import React from "react";
import Image from "next/image";
import { images } from "@/app/data/constant";
import { HomeContent } from "@/components/admin/home-editor/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

type LoveConnectionSectionProps = {
  data?: HomeContent["loveConnection"];
};

const LoveConnectionSection = ({ data }: LoveConnectionSectionProps) => {
  const mobileGalleryRef = React.useRef<HTMLDivElement | null>(null);
  const heading = data?.heading || "Discover Lasting Love & Connection";
  const subtext =
    data?.subtext ||
    "Investing in learning about relationships is the key to unlocking enduring love and meaningful connections.";
  const imageItems = data?.images?.length
    ? data.images.map((img) => ({ src: img.url, alt: img.alt }))
    : images;
  const scrollGallery = (direction: "left" | "right") => {
    const el = mobileGalleryRef.current;
    if (!el) return;
    const amount = 180;
    el.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative bg-white py-20 lg:py-16 px-6 overflow-hidden">
      <div className="absolute inset-4 pointer-events-none z-0">
        <svg className="w-full h-full">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="#f1f1f1"
            strokeWidth="1"
          />

          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="#8d2d5d"
            strokeWidth="2"
            strokeDasharray="200 1000"
            className="animate-border-trace"
          />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-deep-midnight-navy mb-4 md:mb-6 md:text-center">
            {heading}
          </h2>
          <p className="text-stone-500 text-sm md:text-base leading-relaxed font-medium md:text-center">
            {subtext}
          </p>

          {/* Extra emphasis on mobile so the section feels informative */}
          <div className="mt-6 md:hidden">
            <ul className="space-y-2 text-stone-700 text-sm font-semibold">
              <li>Values-led, human introductions</li>
              <li>Discreet conversations, at your pace</li>
              <li>Ongoing support beyond the first meeting</li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Mobile: horizontal gallery (better use of small screens) */}
          <div className="md:hidden mb-6">
            <div
              ref={mobileGalleryRef}
              className="flex gap-4 overflow-x-auto pb-3 -mx-6 px-6 snap-x snap-mandatory"
            >
            {imageItems.map((img, index) => (
              <div
                key={index}
                className="relative flex-none w-[200px] h-[280px] overflow-hidden shadow-xl rounded-t-full snap-start"
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </div>
            ))}
            </div>
            <div className="mt-3 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => scrollGallery("left")}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500"
                aria-label="Scroll images left"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollGallery("right")}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500"
                aria-label="Scroll images right"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Desktop: 3-column layout */}
          <div className="hidden md:grid grid-cols-3 gap-6 items-end">
            {imageItems.map((img, index) => (
              <div
                key={index}
                className={`relative aspect-4/4 overflow-hidden shadow-xl rounded-t-full ${
                  index === 1 ? "md:mb-12" : "mb-0"
                }`}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes border-trace {
          from {
            stroke-dashoffset: 1100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-border-trace {
          animation: border-trace 6s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default LoveConnectionSection;
