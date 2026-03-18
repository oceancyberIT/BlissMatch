"use client";
import React from "react";
import Image from "next/image";
import { images } from "@/app/data/constant";

const LoveConnectionSection = () => {
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
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-deep-midnight-navy mb-4">
            Discover Lasting Love & Connection
          </h2>
          <p className="text-stone-500 text-sm md:text-base leading-relaxed font-medium">
            Investing in learning about relationships is the key to unlocking
            enduring love and meaningful connections.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {images.map((img, index) => (
              <div
                key={index}
                className={`relative aspect-4/5 overflow-hidden shadow-xl
                  ${index === 1 ? "rounded-t-full" : "rounded-t-full"} 
                  ${index === 1 ? "md:mb-12" : "mb-0"}
                `}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
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
